export function setupModal() {
    const modal = document.getElementById('item-modal');
    const title = document.getElementById('modal-title');
    const img = document.getElementById('modal-image');
    const desc = document.getElementById('modal-desc');
    const content = modal?.querySelector('.modal-content');
    let lastFocus = null;

    function open(item) {
        lastFocus = document.activeElement;
        title.textContent = item.title;
        if (item.image) {
            img.src = item.image;
            img.alt = item.title;
            img.style.display = '';
        } else {
            img.style.display = 'none';
        }
        desc.textContent = item.description;
        modal.setAttribute('aria-hidden', 'false');
        content.focus();
        document.addEventListener('keydown', trap);
    }
    function close() {
        modal.setAttribute('aria-hidden', 'true');
        document.removeEventListener('keydown', trap);
        lastFocus?.focus();
    }
    function trap(e) { if (e.key === 'Escape') close(); }
    modal.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) close(); });

    return { open, close };
}
