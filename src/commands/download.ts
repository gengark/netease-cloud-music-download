import open from 'open';
import ora from 'ora';
import getSongsInfo from '../api/get-songs-info';
import { SOURCE_BASE_URL } from '../constants';
import { confirmBrowse } from '../helpers';
import {
    downloadFile,
    getDownloadDirectory,
    normalizeInput,
    normalizeName,
} from '../utils';
import type { CommandOptions } from './types';

export interface DownloadCommandOptions extends CommandOptions {
    source?: string;
}

async function downloadCommand({
    source,
    output,
    rewrite,
    browse,
}: DownloadCommandOptions) {
    const spinner = ora({ color: 'cyan' });

    const [err, id] = await normalizeInput(source?.toString());
    if (err) {
        spinner.fail(err);
        return;
    }
    if (!id) {
        spinner.fail(`无效的单曲ID: ${id}`);
        return;
    }

    const sourceUrl = `${atob(SOURCE_BASE_URL)}?id=${id}`;
    if (browse) {
        spinner.info(`资源地址: ${sourceUrl}`);
        const answer = await confirmBrowse();
        if (!answer) return;

        await open(sourceUrl);
        spinner.succeed('已在默认浏览器中打开，请切换到浏览器窗口中查看');
    } else {
        const result = await getSongsInfo([id]);
        if (!result) return;

        const [error, destPath] = getDownloadDirectory(
            normalizeName(result[0].name),
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

        spinner.clear();
        await downloadFile(sourceUrl, destPath, spinner);
    }
}

export default downloadCommand;
