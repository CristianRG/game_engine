import { Component } from "../../core/models/Component";

export class Renderable extends Component {
    constructor(public color: string = "black") {
        super();
    }
}