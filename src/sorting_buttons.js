import quickSort from '@charlesstover/quicksort';

function bubbleSort(sortInput) {
    const sortedArray = JSON.parse(JSON.stringify(sortInput.data));
    const prop = sortInput.sortBy;
    for (let i = 0; i < sortedArray.length; i++) {
        for (let j = i + 1; j < sortedArray.length - 1; j++) {
            if (sortedArray[i][prop] > sortedArray[j][prop]) {
                const tmp = sortedArray[i];
                sortedArray[i] = sortedArray[j];
                sortedArray[j] = tmp;
            }
        }
    }
    return sortedArray;
}

function fasterSort(sortInput) {
    const sortedArray = JSON.parse(JSON.stringify(sortInput.data));
    const prop = sortInput.sortBy;

    return sortedArray.sort((a,b) => {
        const valA = a[prop];
        const valB = b[prop];
        return valA > valB ? 1 : valA < valB ? -1 : 0;
    });
}

function quickSorter(sortInput) {
    const comparator = (a, b) => {
        if (a[prop] < b[prop]) {
            return -1;
        }
        if (a[prop] > b[prop]) {
            return 1;
        }
        return 0;
    };
    const sortedArray = JSON.parse(JSON.stringify(sortInput.data));
    const prop = sortInput.sortBy;

    return quickSort(sortedArray, comparator);
}
export function setSortingButtons(dataTable) {
    const sortButton = document.createElement('button');
    sortButton.innerText = 'Sort by Name';
    sortButton.addEventListener('click', e => {
        dataTable.sortByName(bubbleSort);
        switchButtonsTexts();
    });

    const fastSortButton = document.createElement('button');
    fastSortButton.innerText = 'Fast Sort by Name';
    fastSortButton.addEventListener('click', e => {
        dataTable.sortByName(fasterSort);
        switchButtonsTexts();
    });

    const quickSortButton = document.createElement('button');
    quickSortButton.innerText = 'Quick Sort by Name';
    quickSortButton.addEventListener('click', e => {
        dataTable.sortByName(quickSorter);
        switchButtonsTexts();
    });

    document.body.insertBefore(sortButton, dataTable);
    document.body.insertBefore(fastSortButton, dataTable);
    document.body.insertBefore(quickSortButton, dataTable);

    function switchButtonsTexts() {
        quickSortButton.innerText = 'Quick Sort by ' + (dataTable.sorted ? 'ID' : 'Name');
        sortButton.innerText = 'Sort by ' + (dataTable.sorted ? 'ID' : 'Name');
        fastSortButton.innerText = 'Fast Sort by ' + (dataTable.sorted ? 'ID' : 'Name');
    }
}
