function shapesOverloading() {
    function multiShapes(x, y, z) {
        a = {};
        if (x) {
            a.x = x;
        }
        if (y) {
            a.y = y;
        }
        if (z) {
            a.z = z;
        }
        a.stam = 1;
        a.stomp = 2;
        return a;
    }

    function oneShape(x, y, z) {
        a = {};

        a.x = x ? x : undefined;
        a.y = y ? y : undefined;
        a.z = z ? z : undefined;
        a.stam = 1;
        a.stomp = 2;
        return a;
    }

    console.log('Start');

    const n = 1000000;
    for (let i = 0; i < n; i++) {
        multiShapes(i % 2, i % 3, i % 4);
    }

    setTimeout(() => {
        for (let i = 0; i < n; i++) {
            oneShape(i % 2, i % 3, i % 4);
        }
    }, 5000);


    console.log('Done');
}