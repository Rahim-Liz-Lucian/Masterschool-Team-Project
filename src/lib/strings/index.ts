export const flatten = <T extends string | React.JSX.SignalLike<string | undefined> | undefined>(...classList: T[]) => {
    return classList.filter(Boolean).join(" ");
};
