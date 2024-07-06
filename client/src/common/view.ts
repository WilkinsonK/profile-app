/**
 * Returns the current view from our frontend
 * application. By default, this function will
 * return the current window path if nothing
 * was previously set.
 */
export function getCurrentView(): string {
    return window.location.pathname;
}

/**
 * Whether the current view matches the given
 * view path.
 */
export function hasCurrentView(view: string): boolean {
    return (getCurrentView() === view);
}
