import './search-bar/search-bar.component';
import './data-table/data-table.component';
import './loading-bar';

const searchBar = document.createElement('search-bar');
const dataTable = document.createElement('data-table');
const progressBar = document.createElement('progress-bar');

progressBar.style.position = 'fixed';
progressBar.style.top = '200px';

const queryServer = 'api/search';
searchBar.setAttribute('data-url', queryServer);
searchBar.addEventListener('query-response', e => {
    document.body.appendChild(progressBar);
    dataTable.refreshData(e.detail);
});

dataTable.addEventListener('data-table-updated', () => {
    document.body.removeChild(progressBar);
});

document.body.appendChild(searchBar);
document.body.appendChild(dataTable);

