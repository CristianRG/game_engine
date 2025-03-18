import { Component } from "../core/Component.js";
export class Transform extends Component {
    x;
    y;
    constructor(x = 0, y = 0) {
        super();
        this.x = x;
        this.y = y;
    }
}
