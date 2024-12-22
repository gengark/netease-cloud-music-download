import { API_BASE_URL } from '../../constants';
import stringifyParams from './stringify-params';

const BASE_URL = atob(API_BASE_URL);

function buildApiUrl(source: string, params: Record<string, unknown>) {
    const url = new URL(`api/${source}`, BASE_URL);
    url.search = stringifyParams(params).toString();

    return url.toString();
}

export default buildApiUrl;
