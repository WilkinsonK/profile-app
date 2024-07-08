const LS_PREFERRED_THEME_KEY: string = "vlb.preferredTheme";
const PREFERRED_THEME_DARK:   string = "icon/mun-solid.svg";
const PREFERRED_THEME_LIGHT:  string = "icon/sol-solid.svg";

enum PreferredTheme {
    Dark,
    Light
}

export function displayPreferredTheme(): string {
    switch (getPreferredTheme()) {
        case PreferredTheme.Dark:
            return "dark"
        case PreferredTheme.Light:
            return "light"
    }
}

export function getPreferredTheme(): PreferredTheme {
    let theme = localStorage.getItem(LS_PREFERRED_THEME_KEY);
    switch (theme) {
        case "0":
            return PreferredTheme.Dark;
        case "1":
            return PreferredTheme.Light;
        default:
            return PreferredTheme.Dark;
    }
}

export function getPreferredThemeIcon(): string {
    switch (getPreferredTheme()) {
        case PreferredTheme.Dark:
            return PREFERRED_THEME_DARK;
        case PreferredTheme.Light:
            return PREFERRED_THEME_LIGHT;
    }
}

export function setPreferredTheme(theme: PreferredTheme) {
    let item: string;
    switch (theme) {
        case PreferredTheme.Dark:
            item = "0";
            break;
        case PreferredTheme.Light:
            item = "1";
            break;
    }
    localStorage.setItem(LS_PREFERRED_THEME_KEY, item)
}

export function togglePreferredTheme() {
    setPreferredTheme(Number(!getPreferredTheme()))
    window.location.reload();
}
