import { Component } from "../../core/models/Component";
import { Physics as BasePhysics } from "../../core/models/Physics";
export declare class Physics extends Component {
    physics: BasePhysics[];
    constructor(physics?: BasePhysics[]);
    applyPhysics(): void;
}
