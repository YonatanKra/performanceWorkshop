function dataLocality() {
    const ROWS = 1000;
    const COLS = 1000;
    const repeats = 100;
    const arr = new Array(ROWS * COLS).fill(0).map((a, i) => new Boom(i));

    function localAccess() {
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                arr[i * ROWS + j].x = 0;
            }
        }
    }

    function farAccess(array) {
        let data = arr;
        if (array) {
            data = array;
        }
        for (let i = 0; i < COLS; i++) {
            for (let j = 0; j < ROWS; j++) {
                data[j * ROWS + i].x = 0;
            }
        }
    }

    function repeat(cb, type) {
        console.log(`%c Started data ${type}`, 'color: red');
        const start = performance.now();

        for (let i = 0; i < repeats; i++) {
            cb();
        }

        const end = performance.now();
        console.log('Finished data locality test run in ', ((end - start) / 1000).toFixed(4), ' seconds');
        return end - start;

    }

    const diffArr = new Array(ROWS * COLS).fill(0);
    for (let col = 0; col < COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
            diffArr[row * ROWS + col] = arr[col * COLS + row];
        }
    }

    repeat(localAccess, 'Local');
    setTimeout(() => {
        repeat(farAccess, 'Non Local')
        setTimeout(() => {
            repeat(() => farAccess(diffArr), 'Non Local Sorted')
        }, 2000);
    }, 2000);
}