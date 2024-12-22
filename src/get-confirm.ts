import confirm from '@inquirer/confirm';

async function getConfirm(
    message: string,
    defaultValue = true,
): Promise<[undefined, boolean] | [string]> {
    try {
        const result = await confirm({ message, default: defaultValue });
        return [undefined, result];
    } catch {
        return ['用户主动取消'];
    }
}

export default getConfirm;
