export enum Mode {
    ACTIVE = "ACTIVE",
    SHORT_BREAK = "SHORT_BREAK",
    LONG_BREAK = "LONG_BREAK",
}

export function getTheme(mode: Mode): string | undefined {
    switch (mode) {
        case Mode.LONG_BREAK:
            return "long-break";
        case Mode.SHORT_BREAK:
            return "short-break";
    }
}