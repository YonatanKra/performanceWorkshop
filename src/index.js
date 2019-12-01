import './search-bar/search-bar.component';
import './data-table/data-table.component';
import './scroll-indicator/scroll-indicator.component';
import {setSortingButtons} from "./sorting_buttons";

const searchBar = document.createElement('search-bar');
const dataTable = document.createElement('data-table');
const scrollIndicator = document.createElement('scroll-indicator');

document.body.appendChild(searchBar);
document.body.appendChild(scrollIndicator);
document.body.appendChild(dataTable);

const queryServer = 'api/search';
searchBar.setAttribute('data-url', queryServer);
searchBar.addEventListener('query-response', e => {
    dataTable.refreshData(e.detail);
});

setSortingButtons(dataTable);

dataTable.addEventListener('data-table-updated', e => {
    scrollIndicator.updateScroll(e.detail.tableHeight, e.detail.scrollHeight);
});

dataTable.addEventListener('table-scroll', e => {
    scrollIndicator.updateScroll(e.detail.tableHeight, e.detail.scrollHeight);
});

console.log('Object Pool');

