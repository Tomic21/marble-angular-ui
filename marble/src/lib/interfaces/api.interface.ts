export interface RequestPath {
    path: string;
    value?: string | number;
}
export interface RequestQuery {
    query: string;
    value: string | boolean | number | any;
}
