import baseGetTag from './base-get-tag';

// biome-ignore lint/suspicious/noExplicitAny: Unexpected any.
type StringifyImpl = (value: any) => string;

const stringifyNil = () => '';
const stringifyArray = (value: string[]) => `[${value.join(',')}]`;
const stringifyObject = (value: Record<string, unknown>) =>
    JSON.stringify(value);
const stringifyDefault = (value: unknown) => `${value}`;

const stringifyStrategy: Record<string, StringifyImpl> = {
    undefined: stringifyNil,
    null: stringifyNil,
    array: stringifyArray,
    object: stringifyObject,
    default: stringifyDefault,
};

const stringifyFactory = (value: unknown) => {
    const tag = baseGetTag(value);
    const type = tag.slice(8, -1).toLowerCase();

    const factory = stringifyStrategy[type] ?? stringifyStrategy.default;
    return factory(value);
};

function stringifyParams(params: Record<string, unknown>) {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        const stringifyValue = stringifyFactory(value);
        if (!stringifyValue) continue;

        searchParams.has(key)
            ? searchParams.set(key, stringifyValue)
            : searchParams.append(key, stringifyValue);
    }

    return searchParams.toString();
}

export default stringifyParams;
