import open from 'open';
import ora from 'ora';
import { SOURCE_BASE_URL } from '../constants';
import { confirmBrowse, selectSong } from '../helpers';
import { downloadFile, getDownloadDirectory, normalizeName } from '../utils';
import type { CommandOptions } from './types';

export interface SearchCommandOptions extends CommandOptions {
    query?: string;
}

async function searchCommand({
    query,
    output,
    rewrite,
    browse,
}: SearchCommandOptions) {
    const spinner = ora({ color: 'cyan' });
    if (!query) {
        spinner.fail('请输入歌曲名称/作者名称');
        return;
    }

    const result = await selectSong(query);
    if (!result) return;

    const sourceUrl = `${atob(SOURCE_BASE_URL)}?id=${result.value}`;
    if (browse) {
        spinner.info(`资源地址: ${sourceUrl}`);
        const answer = await confirmBrowse();
        if (!answer) return;

        await open(sourceUrl);
        spinner.succeed('已在默认浏览器中打开，请切换到浏览器窗口中查看');
    } else {
        const [error, destPath] = getDownloadDirectory(
            normalizeName(result.name.replaceAll(' / ', ', ')),
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

export default searchCommand;
