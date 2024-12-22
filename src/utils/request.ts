import baseGetTag from './_internal/base-get-tag';
import buildApiUrl from './_internal/build-api-url';
import to from './to';

const middleware = (requestOptions: Request) => {
    requestOptions.headers.set('Content-Type', 'application/json');
    return requestOptions;
};

const pipeline = <T extends object>(
    status?: number,
    statusText?: string,
    body?: Record<string, unknown>,
) => {
    const code = status || 200;
    const message = statusText || '请求成功';
    if (!body || baseGetTag(body) !== '[object Object]')
        return { code, message, data: undefined };

    const { code: unifyCode, ...restOptions } = body;
    const safeCode = (unifyCode as number) || code;
    const keys = Object.keys(restOptions);
    if (!keys.length) return { code: safeCode, message, data: undefined };

    const data = (keys.length > 1 ? restOptions : restOptions[keys[0]]) as T;
    if (safeCode !== 200)
        return {
            code: safeCode,
            message: (data as unknown as string) || message,
            data: undefined,
        };

    return { code: safeCode, message, data };
};

async function request<T extends object>(
    source: string,
    params: Record<string, unknown> = {},
    options: RequestInit = {},
) {
    const url = buildApiUrl(source, params);
    const req = middleware(new Request(url, options));

    const [fetchErr, resp] = await to(fetch(req));
    if (fetchErr)
        return {
            code: 500,
            message: `${fetchErr}` || '无法与服务器建立连接, 请检查网络',
            data: undefined,
        };

    const status = resp.status;
    const statusText = resp.statusText;
    if (!resp.ok)
        return {
            code: status || 500,
            message: statusText || '未知原因',
            data: undefined,
        };

    const [deserializeErr, result] = await to<T>(resp.json());
    if (deserializeErr)
        return {
            code: 415,
            message: `意外的资源类型: ${deserializeErr}`,
            data: undefined,
        };

    return pipeline<T>(status, statusText, result as Record<string, unknown>);
}

export default request;
