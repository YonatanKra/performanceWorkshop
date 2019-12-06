
class PoolObject {
    constructor(data) {
        this.data = data;
        this.nextFree = null;
        this.previousFree = null;
    }
}

class Pool {
    constructor(objCreator, objReseter, initialSize = 5000) {
        this._pool = [];
        this.objCreator = objCreator;
        this.objReseter = objReseter;
        for (let i = 0; i < initialSize; i++) {
            this.addNewObject(this.newPoolObject());
        }
    }

    addNewObject(obj) {
        this._pool.push(obj);
        this.release(obj);
        return obj;
    }

    release(poolObject) {
        // flag as free
        poolObject.free = true;

        // set in the dequeue
        poolObject.nextFree = null;
        poolObject.previousFree = this.lastFree;

        // if we had a last free, set the last free's next as the new poolObject
        // otherwise, this is the first free!
        if (poolObject.previousFree) {
            this.lastFree.nextFree = poolObject;
        } else {
            this.nextFree = poolObject;
        }

        // set the new object as the last in the dequeue
        this.lastFree = poolObject;

        // reset the object if needed
        this.objReseter(poolObject);
    }

    getFree() {
        // if we have a free one, get it - otherwise create it
        const freeObject = this.nextFree ? this.nextFree : this.addNewObject(this.newPoolObject());

        // flag as used
        freeObject.free = false;

        // the next free is the object's next free
        this.nextFree = freeObject.nextFree;

        // if there's nothing afterwards, the lastFree is null as well
        if (!this.nextFree) this.lastFree = null;

        // return the now not free object
        return freeObject;
    }

    newPoolObject() {
        const data = this.objCreator();
        return new PoolObject(data, this.lastFree, this.nextFree);
    }

    releaseAll() {
        this._pool.forEach(item => this.release(item));
    }
}

function allocationProblems(firstWithPool, runOnce) {
    const bombs = 1000; // create 1000 bombs on every run
    const bulks = 1000; // create and destroy a 1000 times

    function noPool() {
        const booms = [];
        for (let i = 0; i < bulks; i++) {
            for (let boom = 0; boom < bombs; boom++) {
                const currBoom = booms[booms.push(new Boom()) - 1];
                currBoom.setPosition(Math.random(), Math.random());
            }
        }
    }

    function withPool() {
        const pool = new Pool(() => new Boom(),
            (item) => item.data.setPosition(undefined, undefined),
            bombs);

        for (let i = 0; i < bulks; i++) {
            for (let boom = 0; boom < bombs; boom++) {
                const currBoom = pool.getFree();
                currBoom.data.setPosition(Math.random(), Math.random());
            }
            // release all booms
            pool.releaseAll();
        }
    }

    function repeat(cb) {
        console.log('%c Started objectpool test', 'color: red');
        const start = performance.now();

        for (let i = 0; i < repeats; i++) {
            cb();
        }

        const end = performance.now();
        console.log('%c Finished objectpool test run in ', 'color: red', ((end - start) / 1000).toFixed(4), ' seconds');
        return end - start;

    }

    const repeats = 10;

    let first, second;
    if (firstWithPool) {
        console.log('With pool first');
        first = withPool;
        second = noPool;
    } else {
        console.log('Without pool first');
        first = noPool;
        second = withPool;
    }
    repeat(first);
    if (runOnce) return;
    setTimeout(() => {
        repeat(second)
    }, 2000);
}
