import { ISystem } from "../interfaces/ISystem";
export declare abstract class System implements ISystem {
    private static _id;
    id: number;
    abstract execute(): void;
}
