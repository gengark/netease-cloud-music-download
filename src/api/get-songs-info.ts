import ora from 'ora';
import { request, to } from '../utils';
import type { DetailResult, LegacySongOptions } from './types';

const songsInfoVo = (option: LegacySongOptions) => {
    const value = option.id;

    let name = option.name || '未知歌曲';
    if (option.transName) name += ` (${option.transName})`;
    if (option.artists?.length)
        name += ` - ${option.artists.map((item) => item.name).join(', ')}`;

    return { value, name };
};

async function getSongsInfo(ids: string[]) {
    const spinner = ora({ color: 'cyan' }).start('查询歌曲信息...');
    const [err, result] = await to(
        request<DetailResult>('/song/detail', { ids }),
    );
    if (err) {
        spinner.fail(`程序错误: ${err}`);
        return;
    }

    const { code, message, data } = result;
    if (code !== 200) {
        spinner.fail(`HTTP Error ${code} - ${message}`);
        return;
    }

    if (!data?.songs?.length) {
        spinner.fail('未找到歌曲信息');
        return;
    }

    spinner.stop();

    return data.songs.map(songsInfoVo) || [];
}

export default getSongsInfo;
