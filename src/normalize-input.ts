import { HTTPS_HOST_PATH } from './constants';
import getClipboardContent from './get-clipboard-content';

async function normalizeInput(
    input?: string,
): Promise<[undefined, string] | [string]> {
    let result = input;
    if (!result) {
        const [err, content] = await getClipboardContent();
        if (err) return [err];
        if (!content) return ['剪贴板内容为空'];
        result = content;
    }

    const numericInput = Number(result);
    if (!Number.isNaN(numericInput) && !!numericInput)
        return [undefined, `${numericInput}`];

    result = result?.replace(/\/#\//, '/');
    if (!result.startsWith(HTTPS_HOST_PATH))
        return [`无效的单曲ID/分享链接: ${JSON.stringify(result)}`];

    const url = new URL(result);
    const id = url.searchParams.get('id');
    if (!id) return [`链接缺少ID: "${url}"`];

    return [undefined, id];
}

export default normalizeInput;
