export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function debounce(fn: () => void, ms: number) {
    let timer: ReturnType<typeof setTimeout>;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, ms);
    };
}
