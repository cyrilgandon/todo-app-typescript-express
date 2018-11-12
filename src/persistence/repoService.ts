export default interface RepoService<TData> {
    load(): TData[];
    save(todos: TData[]): void;
}
