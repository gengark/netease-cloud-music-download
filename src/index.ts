import open from 'open';
import ora from 'ora';
import { HTTP_HOST_PATH, SOURCE_PATH } from './constants';
import downloadFile from './download-file';
import getConfirm from './get-confirm';
import getDownloadDirectory from './get-download-directory';
import getInfo from './get-info';
import normalizeInput from './normalize-input';

export interface Options {
    _?: (string | number)[];
    output?: string;
    rewrite?: boolean;
    browse?: boolean;
}

async function main({ _: input, output, rewrite, browse }: Options = {}) {
    const spinner = ora({ color: 'cyan' });

    const [err, id] = await normalizeInput(input?.[0]?.toString());
    if (err) {
        spinner.fail(err);
        return;
    }
    if (!id) {
        spinner.fail(`无效的单曲ID: ${id}`);
        return;
    }

    const sourceUrl = `${HTTP_HOST_PATH}/${SOURCE_PATH}?id=${id}`;
    if (browse) {
        spinner.succeed(`资源地址: ${sourceUrl}`);

        const [err, confirm] = await getConfirm(
            '浏览器访问资源会自动播放, 请注意使用场合, 确认使用浏览器打开吗? (按回车键确认)',
        );

        if (err) {
            spinner.fail(err);
            return;
        }

        confirm && (await open(sourceUrl));
        spinner.succeed('已在默认浏览器中打开，请切换到浏览器窗口中查看');
    } else {
        const info = await getInfo(id);

        const [error, destPath] = getDownloadDirectory(
            `${info.song} - ${info.artists}.mp3`,
            output,
            rewrite,
        );

        if (error) {
            spinner.fail(error);
            return;
        }

        if (!destPath) {
            spinner.fail(`无效的目录: ${destPath}`);
            return;
        }

        await downloadFile(sourceUrl, destPath, spinner);
    }
}

export default main;
