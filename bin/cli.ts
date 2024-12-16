#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import process from 'node:process';
import updateNotifier from 'update-notifier';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import main from '../src';

process.on('SIGINT', () => {
    process.exit(0);
});

const pkg = JSON.parse(
    readFileSync(new URL('../package.json', import.meta.url)).toString('utf8'),
);

updateNotifier({ pkg }).notify({ isGlobal: true });


const palette = (code: number) => (text: string) =>
    `\u001B[${code}m${text}\u001B[39m`;
const grey = palette(90);
const yellow = palette(33);

main(
    yargs(hideBin(process.argv))
        .scriptName('netease-dl')
        .usage('$0 [options] <url>')
        .options('output', {
            alias: 'o',
            type: 'string',
            desc: '输出路径 (目录/文件名.mp3)',
        })
        .options('rewrite', {
            alias: 'r',
            type: 'boolean',
            desc: '覆盖现有的同名文件 (若存在)',
        })
        .example(yellow('netease-dl'), '使用剪贴板中的单曲ID / 链接')
        .example(yellow('netease-dl 25159744'), '指定单曲ID')
        .example(yellow('netease-dl "https://music.163.com/song?id=25159744"'), '指定单曲链接')
        .example(grey('-------'), '')
        .example(yellow('netease-dl'), '下载到当前用户默认的 Downloads 目录')
        .example(yellow('netease-dl -o .'), '下载到当前目录中')
        .alias({
            v: 'version',
            h: 'help',
        })
        .parseSync(),
).catch(console.error);
