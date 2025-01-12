#!/usr/bin/env node
import process from 'node:process';
import yargs, { type Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';
import type { DownloadCommandOptions, SearchCommandOptions } from '../src';
import { downloadCommand, searchCommand } from '../src';

const palette = (code: number) => (text: string) =>
    `\u001B[${code}m${text}\u001B[39m`;
const grey = palette(90);
const yellow = palette(33);

yargs(hideBin(process.argv))
    .scriptName('wyy')
    .usage('$0 [options] <query>')
    .options('output', {
        alias: 'o',
        type: 'string',
        desc: '输出路径 (目录)',
    })
    .options('rewrite', {
        alias: 'r',
        type: 'boolean',
        desc: '覆盖现有的同名文件 (若存在)',
    })
    .options('browse', {
        alias: 'b',
        type: 'boolean',
        desc: '使用默认浏览器访问',
    })
    .command(
        ['search [query..]', '$0'],
        '查询单曲并下载',
        (yargs: Argv<SearchCommandOptions>) => {
            return yargs
                .example(
                    yellow('wyy Makka Pakka'),
                    '查询玛卡巴卡, 并下载选中单曲',
                )
                .example(yellow('wyy Makka Pakka -o .'), '下载到当前目录中')
                .example(grey('-------'), '')
                .example(
                    yellow('wyy Makka Pakka -r'),
                    '同名文件存在时，覆盖现有文件',
                )
                .example(
                    yellow('wyy Makka Pakka -b'),
                    '使用默认浏览器访问，而非下载文件',
                );
        },
        searchCommand,
    )
    .command(
        ['download [source]', 'dl'],
        '通过分享链接/ID下载单曲',
        (yargs: Argv<DownloadCommandOptions>) => {
            return yargs
                .example(yellow('wyy dl'), '使用剪贴板中的单曲ID / 链接')
                .example(yellow('wyy dl 25159744'), '指定单曲ID')
                .example(
                    yellow('wyy dl "https://music.163.com/song?id=25159744"'),
                    '指定单曲链接',
                )
                .example(grey('-------'), '')
                .example(
                    yellow('wyy dl'),
                    '下载到当前用户默认的 Downloads 目录',
                )
                .example(yellow('wyy dl -o .'), '下载到当前目录中')
                .example(grey('-------'), '');
        },
        downloadCommand,
    )
    .alias({
        v: 'version',
        h: 'help',
    })
    .parse();
