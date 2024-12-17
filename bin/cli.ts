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
        .scriptName('wyy')
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
        .example(yellow('wyy'), '使用剪贴板中的单曲ID / 链接')
        .example(yellow('wyy 25159744'), '指定单曲ID')
        .example(yellow('wyy "https://music.163.com/song?id=25159744"'), '指定单曲链接')
        .example(grey('-------'), '')
        .example(yellow('wyy'), '下载到当前用户默认的 Downloads 目录')
        .example(yellow('wyy -o .'), '下载到当前目录中')
        .example(grey('-------'), '')
        .example(yellow('wyy -r'), '同名文件存在时，覆盖现有文件')
        .alias({
            v: 'version',
            h: 'help',
        })
        .parseSync(),
).catch(console.error);
