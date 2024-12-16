import { constants, accessSync } from 'node:fs';

function isExist(filepath: string) {
    try {
        accessSync(filepath, constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

export default isExist;
