import ora from 'ora';
import { formatDate, request, to } from '../utils';
import type { SearchResult, SongOptions } from './types';

const songsInfoVo = (option: SongOptions) => {
    const value = option.id;

    let name = option.name;
    if (option.tns?.length) name += ` (${option.tns.join(' / ')})`;
    if (option.ar?.length)
        name += ` - ${option.ar.map((author) => author.name).join(' / ')}`;

    let albumName = option.al.name;
    if (option.al?.tns?.length) albumName += ` (${option.al.tns.join(' / ')})`;
    let description = `专辑: ${albumName || '未知专辑'}`;
    if (option.alia?.length)
        description += `\n其他信息: ${option.alia.join(' / ')}`;
    if (option.publishTime)
        description += `\n发布日期: ${formatDate(new Date(option.publishTime))}`;

    const short = option.name;

    const isPaid = [1, 4].includes(option.fee);
    const isNoCopyright = Boolean(option.noCopyrightRcmd);
    const isSourceless = Boolean(
        option.privilege?.freeTrialPrivilege?.cannotListenReason,
    );
    const disabled = isPaid || isNoCopyright || isSourceless;

    return { value, name, description, short, disabled };
};

async function searchSongs(search: string, limit = 10, offset = 0) {
    const spinner = ora({ color: 'cyan' }).start('查询歌曲列表...');
    const [err, result] = await to(
        request<SearchResult>('/cloudsearch/pc', {
            s: search,
            type: 1,
            limit,
            offset,
            total: true,
        }),
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
    spinner.stop();

    return {
        data: data?.songs?.map(songsInfoVo) || [],
        count: data?.songCount || 0,
    };
}

export default searchSongs;
