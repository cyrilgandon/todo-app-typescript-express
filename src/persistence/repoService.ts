export default interface RepoService<TData> {
    load(): TData[];
    save(data: TData[]): void;
}
