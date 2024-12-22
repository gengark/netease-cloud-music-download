import confirm from '@inquirer/confirm';
import ora from 'ora';
import { to } from '../utils';

async function confirmBrowse() {
    const spinner = ora();
    const [err, result] = await to(
        confirm(
            {
                message: '浏览器访问资源会自动播放, 确认打开吗? (按回车键确认)',
                default: true,
            },
            {
                clearPromptOnDone: true,
            },
        ),
    );

    if (err) {
        spinner.fail('用户主动取消');
        return false;
    }

    spinner.clear();
    return result;
}

export default confirmBrowse;
