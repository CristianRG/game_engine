export interface IGlobalState<T> {
    get<U>(model: U, id: number): T | null;
    getMany<U>(model: U): T[];
    add<U>(model: U, object: T): void;
    update<U>(model: U, id: number, object: T): void;
    remove<U>(model: U, id: number): void;
}
