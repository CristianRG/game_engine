import { Component } from "../core/models/Component";

export class ObjectInfo<T> extends Component {
    private info: T;
    constructor(info: T) {
        super();
        this.info = info;
    }

    public getInfo(): T {
        return this.info;
    }
}