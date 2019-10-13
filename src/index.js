import './data-table/data-table.component';
const app = document.createElement('data-table');
document.body.appendChild(app);
app.refreshData([
    {
        name: 'Johnny'
    },
    {
        name: 'Lissa'
    }
]);
