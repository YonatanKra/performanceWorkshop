class Boom {
    constructor(id) {
        this.id = id;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setTime(t, cb) {
        if (this.interval) {
            return;
        }
        this.time = t;
        this.interval = setInterval(() => {
            this.time -= .5;
            if (this.time < 0) {
                this.boom();
                cb();
            }
        }, 500);
    }

    boom() {
        clearInterval(this.interval);
        // kaaBoooom!!!
    }
}