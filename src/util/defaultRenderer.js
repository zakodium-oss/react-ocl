const defaultRendererOptions = {
    width: 300,
    height: 150
};

export function applyDefaultRendererOptions(options) {
    return Object.assign({}, defaultRendererOptions, options);
}
