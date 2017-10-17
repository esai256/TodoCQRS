module.exports = class Aggregate {
    constructor(events) {
        this.Events = [events];

        Object.freeze(this);
    }
};
