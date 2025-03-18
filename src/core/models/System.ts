import { ISystem } from "../interfaces/ISystem";

export abstract class System implements ISystem {
    private static _id: number;
    id: number = System._id++;

    abstract execute(): void;
}