export interface Todo  {
    id: number;
    text: string;
    done: boolean;
}

export enum FilterOptions {
    ALL,
    COMPLETED,
    PENDING
}