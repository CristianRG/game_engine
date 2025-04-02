import { Component } from "../../core/models/Component";
/**
 * Renderable component
 * This component is used to render the entity or gameObject with a solid color.
 */
export class Renderable extends Component {
    constructor(public color: string = "black") {
        super();
    }
}