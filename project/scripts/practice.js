import { getTutorials } from './api.js';
import { renderCards, bindCardInteractions, setupNavToggle } from './dom.js';
import { setupModal } from './modal.js';
import { toggleCompleted, getCompleted } from './storage.js';

setupNavToggle();

(async () => {
    const tutorials = await getTutorials();
    const modal = setupModal();
    const langSelect = document.getElementById('filter-lang');
    const diffSelect = document.getElementById('filter-diff');

    function toChallenge(item) {
        return {
            ...item,
            title: `${item.title} — Challenge`,
            description: item.practice
        };
    }

    function applyFilters() {
        const lang = langSelect.value;
        const diff = diffSelect.value;
        const filtered = tutorials.filter(t =>
            (lang === 'all' || t.language === lang) &&
            (diff === 'all' || t.difficulty === diff)
        ).map(toChallenge);

        renderCards(filtered, '#practice-grid', { enableFav: false });

        document.querySelectorAll('#practice-grid .card').forEach(card => {
            const id = card.dataset.id;
            const btn = document.createElement('button');
            btn.className = 'done-btn';
            btn.dataset.id = id;
            const doneSet = new Set(getCompleted());
            btn.textContent = doneSet.has(id) ? 'Completed' : 'Mark completed';
            card.appendChild(btn); // safer than .actions
        });

        bindCardInteractions(filtered, {
            onDetails: (item) => modal.open(item)
        });
    }

    // Persistent listener for all clicks
    document.addEventListener('click', (e) => {
        const doneBtn = e.target.closest('.done-btn');
        if (!doneBtn) return;
        const id = doneBtn.dataset.id;
        const done = toggleCompleted(id);
        doneBtn.textContent = done.includes(id) ? 'Completed' : 'Mark completed';
    });

    langSelect.addEventListener('change', applyFilters);
    diffSelect.addEventListener('change', applyFilters);
    applyFilters();
})();
