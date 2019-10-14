import './search-bar/search-bar.component';
import './data-table/data-table.component';
const searchBar = document.createElement('search-bar');
const dataTable = document.createElement('data-table');

const queryServer = 'api/search';
searchBar.setAttribute('data-url', queryServer);
searchBar.addEventListener('query-response', e => {
    dataTable.refreshData(e.detail);
});
document.body.appendChild(searchBar);
document.body.appendChild(dataTable);

