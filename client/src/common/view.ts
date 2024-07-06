const LS_CURRENT_VIEW_KEY: string = "vlb.currentView"

/**
 * Returns the current view from our frontend
 * application. By default, this function will
 * return the current window path if nothing
 * was previously set.
 */
export function getCurrentView(): string {
    let view = localStorage.getItem(LS_CURRENT_VIEW_KEY);
    if (view == null) {
        return window.location.pathname;
    }
    return view;
}

/**
 * Whether the current view matches the given
 * view path.
 */
export function hasCurrentView(view: string): boolean {
    return (getCurrentView() === view);
}

/**
 * Set the current view path.
 */
export function setCurrentView(view: string) {
    localStorage.setItem(LS_CURRENT_VIEW_KEY, view)
}
