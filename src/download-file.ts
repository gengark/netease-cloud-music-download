import fs from 'node:fs';
import http from 'node:http';
import cliProgress from 'cli-progress';
import type { Ora } from 'ora';

async function downloadFile(url: string, output: string, spinner: Ora) {
    const parsedUrl = new URL(url);

    try {
        http.get(parsedUrl, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                const redirectUrl = response.headers.location;
                if (!redirectUrl) {
                    spinner.fail('所请求的资源位置已更改，无法正确重定向');
                } else {
                    downloadFile(redirectUrl, output, spinner);
                }
            } else if (response.statusCode === 200) {
                const fileStream = fs.createWriteStream(output);

                const contentLength = response.headers['content-length'];
                const totalSize = Number.parseInt(contentLength || '0', 10);
                const progressBar = new cliProgress.SingleBar(
                    {
                        format: '下载进度 [{bar}] {percentage}% | {value}/{total} KB',
                        hideCursor: true,
                    },
                    cliProgress.Presets.legacy,
                );

                progressBar.start(totalSize, 0);

                let downloaded = 0;

                response.on('data', (chunk) => {
                    downloaded += chunk.length;
                    progressBar.update(downloaded);
                });

                response.pipe(fileStream);

                fileStream.on('finish', () => {
                    progressBar.stop();
                    spinner.succeed(`下载完成: ${output}`);
                });

                fileStream.on('error', (err) => {
                    progressBar.stop();
                    spinner.fail(`下载失败: ${err}`);
                });
            } else {
                spinner.fail(`请求失败，状态码: ${response.statusCode}`);
            }
        }).on('error', (err) => {
            spinner.fail(`请求错误: ${err}`);
        });
    } catch {
        spinner.fail('该单曲为会员单曲/付费单曲/没有版权')
    }
}

export default downloadFile;
