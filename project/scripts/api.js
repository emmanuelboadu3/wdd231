// scripts/api.js
export async function getTutorials() {
    try {
        const res = await fetch('data/tutorials.json');
        if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.error('Failed to load tutorials:', err);
        return [];
    }
}
