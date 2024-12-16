import ora from 'ora';
import { HTTP_HOST_PATH, SOURCE_PATH } from './constants';
import downloadFile from './download-file';
import getDownloadDirectory from './get-download-directory';
import getInfo from './get-info';
import normalizeInput from './normalize-input';

export interface Options {
    _?: (string | number)[];
    output?: string;
    rewrite?: boolean;
}

async function main({ _: input, output, rewrite }: Options = {}) {
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

    const sourceUrl = `${HTTP_HOST_PATH}/${SOURCE_PATH}?id=${id}`;
    await downloadFile(sourceUrl, destPath, spinner);
}

export default main;
