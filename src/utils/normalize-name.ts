function normalizeName(value?: string) {
    if (!value) return '';

    return value.replace(/[<>:"/\\|?*]/g, '').trim();
}

export default normalizeName;
