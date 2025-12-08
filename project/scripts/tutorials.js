// scripts/tutorials.js
import { getTutorials } from './api.js';
import { renderCards, bindCardInteractions, setupNavToggle } from './dom.js';
import { setupModal } from './modal.js';
import { toggleFavorite, getFavorites } from './storage.js';


setupNavToggle();

(async () => {
    const tutorials = await getTutorials();
    const modal = setupModal();
    const langSelect = document.getElementById('filter-lang');
    const diffSelect = document.getElementById('filter-diff');

    function applyFilters() {
        const lang = langSelect.value;
        const diff = diffSelect.value;
        const filtered = tutorials.filter(t =>
            (lang === 'all' || t.language === lang) &&
            (diff === 'all' || t.difficulty === diff)
        );
        renderCards(filtered, '#tutorials-grid');
        const favs = new Set(getFavorites());
        document.querySelectorAll('.fav-btn').forEach(btn => {
            const id = btn.dataset.id;
            btn.textContent = favs.has(id) ? 'Saved' : 'Save';
        });
        bindCardInteractions(filtered, {
            onDetails: (item) => modal.open(item),
            onFav: (id, btn) => {
                const favsNow = toggleFavorite(id);
                btn.textContent = favsNow.includes(id) ? 'Saved' : 'Save';
            }
        });
    }

    langSelect.addEventListener('change', applyFilters);
    diffSelect.addEventListener('change', applyFilters);
    applyFilters();
})();
