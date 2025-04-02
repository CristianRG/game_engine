import { Component } from "../../core/models/Component";
/**
 * Renderable component
 * This component is used to render the entity or gameObject with a solid color.
 */
export declare class Renderable extends Component {
    color: string;
    constructor(color?: string);
}
