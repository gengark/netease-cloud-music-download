import clipboard from 'clipboardy';

async function getClipboardContent(): Promise<[undefined, string] | [string]> {
    try {
        const clipboardContent = await clipboard.read();
        return [undefined, clipboardContent];
    } catch {
        return ['剪贴板非文字内容'];
    }
}

export default getClipboardContent;
