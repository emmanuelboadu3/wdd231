// tutorials.js (ES module)
import { fetchTutorials } from './modules/fetchdata.js';
import { openModal, closeModal } from './modules/modal.js';
import { getFavorites, toggleFavorite, saveFavorites } from './modules/storage.js';

const tutorialsGrid = document.getElementById('tutorials-grid');
const featuredGrid = document.getElementById('featured-grid'); // on index
const filterSelect = document.getElementById('filter-select');
const searchInput = document.getElementById('search-input');
const clearBtn = document.getElementById('clear-filters');

let tutorialsList = [];

function createCard(item) {
    // display at least 4 properties: title, category, difficulty, length
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('data-id', item.id);

    const img = document.createElement('img');
    // use placeholder if image missing; lazy load
    img.src = item.image || 'images/tutorials/placeholder.png';
    img.alt = item.title + " thumbnail";
    img.loading = 'lazy';
    img.width = 320;
    img.height = 180;
    img.style.width = '100%';
    img.style.height = 'auto';

    const h3 = document.createElement('h3');
    h3.textContent = item.title;

    const p = document.createElement('p');
    p.textContent = item.description;

    const meta = document.createElement('p');
    meta.innerHTML = `<strong>Category:</strong> ${item.category} • <strong>Level:</strong> ${item.difficulty} • <strong>Time:</strong> ${item.length}`;

    const controls = document.createElement('div');
    controls.style.marginTop = '.5rem';
    const viewBtn = document.createElement('button');
    viewBtn.className = 'btn';
    viewBtn.textContent = 'View';
    viewBtn.addEventListener('click', () => {
        openModal(renderModalContent(item));
    });

    const favBtn = document.createElement('button');
    favBtn.className = 'btn';
    favBtn.style.marginLeft = '0.5rem';
    favBtn.textContent = isFav(item.id) ? '★ Favorite' : '☆ Favorite';
    favBtn.addEventListener('click', () => {
        toggleFavorite(item.id);
        favBtn.textContent = isFav(item.id) ? '★ Favorite' : '☆ Favorite';
        saveFavorites();
        // keep aria-live updated if needed
    });

    controls.appendChild(viewBtn);
    controls.appendChild(favBtn);

    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(meta);
    card.appendChild(controls);

    return card;
}

function renderModalContent(item) {
    const container = document.createElement('div');
    const title = document.createElement('h2');
    title.id = 'modal-title';
    title.textContent = item.title;

    const desc = document.createElement('p');
    desc.textContent = item.description;

    const list = document.createElement('ul');
    list.innerHTML = `<li><strong>Category:</strong> ${item.category}</li>
                    <li><strong>Level:</strong> ${item.difficulty}</li>
                    <li><strong>Time:</strong> ${item.length}</li>
                    <li><strong>ID:</strong> ${item.id}</li>`;

    // small inline code example using template literal
    const codeBlock = document.createElement('pre');
    codeBlock.textContent = `<h1>${item.title}</h1>\n<p>${item.description}</p>`;

    container.appendChild(title);
    container.appendChild(desc);
    container.appendChild(list);
    container.appendChild(codeBlock);

    return container;
}

function isFav(id) {
    const favs = getFavorites();
    return favs.includes(Number(id));
}

function renderList(list, targetEl) {
    targetEl.innerHTML = '';
    if (!list.length) {
        targetEl.innerHTML = '<p class="muted">No tutorials found.</p>';
        return;
    }
    list.forEach(item => {
        const card = createCard(item);
        targetEl.appendChild(card);
    });
}

// filter and search helpers
function applyFilters() {
    const cat = filterSelect ? filterSelect.value : 'all';
    const q = searchInput ? searchInput.value.trim().toLowerCase() : '';

    const filtered = tutorialsList.filter(t => {
        const matchesCat = cat === 'all' || t.category === cat;
        const matchesQ = !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
        return matchesCat && matchesQ;
    });

    renderList(filtered, tutorialsGrid);
}

// initial boot
async function init() {
    try {
        tutorialsList = await fetchTutorials('./data/tutorials.json');
        // ensure we have at least 15 items
        if (!Array.isArray(tutorialsList) || tutorialsList.length < 15) {
            console.warn('Tutorials data contains fewer than 15 items.');
        }

        // show all on page load
        if (tutorialsGrid) renderList(tutorialsList, tutorialsGrid);

        // index featured (first 3) if present
        if (featuredGrid) {
            renderList(tutorialsList.slice(0, 3), featuredGrid);
        }

        // events
        if (filterSelect) filterSelect.addEventListener('change', applyFilters);
        if (searchInput) searchInput.addEventListener('input', () => {
            // debounce simple
            clearTimeout(searchInput._t);
            searchInput._t = setTimeout(applyFilters, 250);
        });
        if (clearBtn) clearBtn.addEventListener('click', () => {
            if (filterSelect) filterSelect.value = 'all';
            if (searchInput) searchInput.value = '';
            applyFilters();
        });

    } catch (err) {
        console.error('Error initializing tutorials page', err);
        if (tutorialsGrid) tutorialsGrid.innerHTML = '<p>Sorry — failed to load tutorials.</p>';
    }
}

// run only on pages that include tutorialsGrid or featuredGrid
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
