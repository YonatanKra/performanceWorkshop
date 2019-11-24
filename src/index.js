import './search-bar/search-bar.component';
import './data-table/data-table.component';
import {setSortingButtons} from "./sorting_buttons";

const searchBar = document.createElement('search-bar');
const dataTable = document.createElement('data-table');

document.body.appendChild(searchBar);
document.body.appendChild(dataTable);

const queryServer = 'api/search';
searchBar.setAttribute('data-url', queryServer);
searchBar.addEventListener('query-response', e => {
    dataTable.refreshData(e.detail);
});

setSortingButtons(dataTable);


