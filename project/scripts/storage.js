const FAV_KEY = 'cs-favorites';
const DONE_KEY = 'cs-completed';

export function getFavorites() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY)) ?? []; } catch { return []; }
}
export function toggleFavorite(id) {
    const set = new Set(getFavorites());
    set.has(id) ? set.delete(id) : set.add(id);
    localStorage.setItem(FAV_KEY, JSON.stringify([...set]));
    return [...set];
}

export function getCompleted() {
    try { return JSON.parse(localStorage.getItem(DONE_KEY)) ?? []; } catch { return []; }
}
export function toggleCompleted(id) {
    const set = new Set(getCompleted());
    set.has(id) ? set.delete(id) : set.add(id);
    localStorage.setItem(DONE_KEY, JSON.stringify([...set]));
    return [...set];
}
