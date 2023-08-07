
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Travels {
    id: string;
    createdAt: string;
    name: string;
    parentId: string;
    cost: number;
}

export class Costs {
    id: string;
    createdAt: string;
    name: string;
    cost?: Nullable<number>;
    parentId: string;
    children?: Nullable<Nullable<Travels>[]>;
}

export abstract class IQuery {
    abstract costsData(): Nullable<Nullable<Costs>[]> | Promise<Nullable<Nullable<Costs>[]>>;
}

type Nullable<T> = T | null;
