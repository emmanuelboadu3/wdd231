// dom.js

export function renderCards(items, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = items.map(item => `
        <article class="card" data-id="${item.id}">
          <img src="${item.thumbnail}" alt="${item.title}" loading="lazy" width="320" height="180">
          <h3>${item.title}</h3>
          <p><strong>Language:</strong> ${item.language}</p>
          <p><strong>Difficulty:</strong> ${item.difficulty}</p>
          <p><strong>Duration:</strong> ${item.duration}</p>
          <button class="details-btn" data-id="${item.id}">Details</button>
          <button class="fav-btn" data-id="${item.id}">Save</button>
        </article>
    `).join('');
}

// Bind Details and Save buttons
export function bindCardInteractions(items, { onDetails, onFav }) {
  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.onclick = () => {
      const item = items.find(i => i.id === btn.dataset.id);
      if (item && onDetails) onDetails(item);
    };
  });
  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.onclick = () => {
      if (onFav) onFav(btn.dataset.id, btn);
    };
  });
}


export function setupNavToggle() {
  const toggle = document.getElementById('menu-btn'); // make sure the id matches
  const menu = document.getElementById('primary-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    menu.dataset.state = expanded ? 'closed' : 'open';
    toggle.classList.toggle('show', !expanded); // toggle show class for CSS X
  });

  // Close menu when a link is clicked
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.dataset.state = 'closed';
      toggle.setAttribute('aria-expanded', false);
      toggle.classList.remove('show'); // revert X to hamburger
    });
  });
}
