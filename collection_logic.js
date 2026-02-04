// Render Collections for Repo (in Modal)
function renderRepoCollections(repoId) {
    const repoCollections = collections.filter(c => c.repoIds.includes(String(repoId)));
    if (repoCollections.length === 0) return '<span style="color:#d1d5db; font-size:0.8rem;">No collections</span>';

    return repoCollections.map(c => `
                <span class="collection-badge" onclick="filterByCollection('${c.id}')">
                    📁 ${c.name}
                    <span class="remove-x" onclick="event.stopPropagation(); removeFromCollection('${c.id}', '${repoId}')">&times;</span>
                </span>
            `).join('');
}

// Add to Collection from Modal
window.addToCollectionFromModal = function (repoId) {
    const select = document.getElementById('collectionSelect');
    const collectionId = select.value;
    if (!collectionId) return;

    StorageManager.addRepoToCollection(collectionId, repoId);

    // Refresh
    document.getElementById('repoCollectionList').innerHTML = renderRepoCollections(repoId);
    select.value = ''; // Reset
};

// Remove from Collection
window.removeFromCollection = function (collectionId, repoId) {
    StorageManager.removeRepoFromCollection(collectionId, repoId);
    // Refresh if in modal
    const listEl = document.getElementById('repoCollectionList');
    if (listEl) {
        listEl.innerHTML = renderRepoCollections(repoId);
    }
};
