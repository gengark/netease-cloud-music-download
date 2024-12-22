import { constants, accessSync, statSync } from 'node:fs';
import { dirname } from 'node:path';

function accessWrite(filepath: string) {
    const dirPath = dirname(filepath);
    const stats = statSync(dirname(dirPath));
    if (!stats.isDirectory()) return '目录不存在';

    try {
        accessSync(dirPath, constants.W_OK);
    } catch {
        return '无可写权限';
    }
}

export default accessWrite;
