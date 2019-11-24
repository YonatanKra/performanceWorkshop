function swap(items, leftIndex, rightIndex){
    const temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(items, left, right, prop) {
    let pivot = items[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (value(items[i], prop) < value(pivot, prop)) {
            i++;
        }
        while (value(items[j], prop) > value(pivot, prop)) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function value(item, prop) {
    if (prop !== undefined) {
        return item[prop];
    }
    return item;
}
export function quickSort(items, left, right, prop) {
    let index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, left, index - 1, prop);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, index, right, prop);
        }
    }
    return items;
}
