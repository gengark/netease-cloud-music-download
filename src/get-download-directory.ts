import { homedir } from 'node:os';
import { join } from 'node:path';
import accessWrite from './access-write';
import isExist from './is-exist';

const HOME_DIR = homedir();
const DL_DIR = join(HOME_DIR, 'Downloads');

function getDownloadDirectory(
    filename: string,
    directory?: string,
    rewrite = false,
) {
    const dest = join(directory || DL_DIR, filename);
    if (!rewrite && isExist(dest)) return ['文件已存在'];

    const err = accessWrite(dest);
    if (err) return [`${err}: ${dest}`];

    return [undefined, dest];
}

export default getDownloadDirectory;
