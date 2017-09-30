export class StorePlugin
{
    constructor() {
        this.Data = [];
    }

    get()
    {
        return this.Data;
    }

    set(value)
    {
        this.Data = Array.from(value);
    }
}
