import './search-bar/search-bar.component';
import './data-table/data-table.component';
const searchBar = document.createElement('search-bar');
const dataTable = document.createElement('data-table');
const sortButton = document.createElement('button');
sortButton.innerText = 'Sort by Name';
sortButton.addEventListener('click', e => {
    dataTable.sortByName();
    sortButton.innerText = 'Sort by ' + (dataTable.sorted ? 'ID' : 'Name');
    fastSortButton.innerText = 'Fast Sort by ' + (dataTable.sorted ? 'ID' : 'Name');
});

const fastSortButton = document.createElement('button');
fastSortButton.innerText = 'Fast Sort by Name';
fastSortButton.addEventListener('click', e => {
    dataTable.sortByName(true);
    fastSortButton.innerText = 'Fast Sort by ' + (dataTable.sorted ? 'ID' : 'Name');
    sortButton.innerText = 'Sort by ' + (dataTable.sorted ? 'ID' : 'Name');
});

const queryServer = 'api/search';
searchBar.setAttribute('data-url', queryServer);
searchBar.addEventListener('query-response', e => {
    dataTable.refreshData(e.detail);
});
document.body.appendChild(searchBar);
document.body.appendChild(sortButton);
document.body.appendChild(fastSortButton);
document.body.appendChild(dataTable);

