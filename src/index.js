import './search-bar/search-bar.component';
import './data-table/data-table.component';
const searchBar = document.createElement('search-bar');
const dataTable = document.createElement('data-table');

const queryServer = 'http://localhost:3002';
searchBar.setAttribute('data-url', queryServer);

document.body.appendChild(searchBar);
document.body.appendChild(dataTable);
dataTable.refreshData([
    {
        name: 'Johnny'
    },
    {
        name: 'Lissa'
    }
]);
