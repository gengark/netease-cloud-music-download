import process from 'node:process';
import select, { Separator } from '@inquirer/select';
import ora from 'ora';
import { searchSongs } from '../api';
import { to } from '../utils';

async function selectSong(query: string, limit = 10, offset = 0) {
    const spinner = ora();
    const [err, result] = await to(searchSongs(query, limit, offset));
    if (err) {
        spinner.fail(`程序错误: ${err}`);
        return;
    }

    if (!result) {
        spinner.fail('意外的响应数据');
        return;
    }

    const { data, count } = result;
    if (!data.length || !count) {
        spinner.fail('查询结果为空');
        return;
    }

    const [cancelErr, id] = await to(
        select(
            {
                message: '选择一首单曲',
                choices: [
                    ...data,
                    new Separator(),
                    { name: '下一页', value: -1 },
                ],
                pageSize: 13,
            },
            {
                clearPromptOnDone: true,
            },
        ),
    );

    if (cancelErr) {
        spinner.fail('用户主动取消');
        if (process.platform === 'win32') process.emit('SIGINT');
        return;
    }

    spinner.clear();
    if (id === -1) return await selectSong(query, limit, offset + limit);

    return data.find((item) => item.value === id);
}

export default selectSong;
