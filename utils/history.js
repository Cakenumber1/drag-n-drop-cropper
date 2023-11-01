export class History {
    constructor() {
        this.initState = null;
        this.currentState = null;
        this.history = [];
        this.step = null;
    }

    get enabledForwards() {
        return this.history.length - 1 > this.step;
    }

    get enabledBackwards() {
        return this.history.length - 1 > 0 && this.step > 0;
    }

    get enabledReset() {
        return this.history.length - 1 > 0;
    }

    get current() {
        return this.currentState;
    }

    update(image) {
        if(this.initState) {
            this.step += 1;

        } else {
            this.initState = image;
        }
        this.currentState = image;
        this.history.push(image);
    }

    moveForwards() {
        this.step += 1;
        this.currentState = this.history[this.step];

    }

    moveBackwards() {
        this.step -=1;
        this.currentState = this.history[this.step];
    }

    reset() {
        this.history = [this.initState];
        this.step = 0;
        this.currentState = this.initState;
    }

    clear() {
        this.history = [];
        this.step = null;
        this.currentState = null;
        this.initState = null;
    }
}
