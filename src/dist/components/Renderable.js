import { Component } from "../core/Component.js";
export class Renderable extends Component {
    color;
    width;
    height;
    constructor(color = "black", width = 50, height = 50) {
        super();
        this.color = color;
        this.width = width;
        this.height = height;
    }
}
