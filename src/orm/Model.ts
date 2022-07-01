import Database from "./Database";
import { HasMany } from "./HasMany";
import { HasOne } from "./HasOne";

export enum Relationship {
    HasMany,
    HasOne
}

export enum PropertyType {
    string = 'string',
    number = 'number'
}

export interface PropertyConfig { type: PropertyType, name: string }

export interface RelationshipConfig {
    type: Relationship,
    name: string,
    model: any,
    display: string
}

export interface ModelConfig {
    type: string,
    properties: PropertyConfig[],
    relationships: RelationshipConfig[]
}

export interface IModel {
    id: number;
    [key: string]: any;
}

export type ModelProvider<Model> = {
    [key: string]: any,
    config: ModelConfig,
    getById: (id: number) => Promise<Model>,
    getAll: () => Promise<Model[]>,
    save: (entity: IModel) => Promise<IModel>,
    empty: () => Model
}

export interface RelationshipProvider<T> {
    set: (parent: IModel, child: IModel | IModel[]) => void;
}

////////////////////////

export const Providers: { [key: string]: ModelProvider<IModel> } = {}

export const Model = <T>(config: ModelConfig) => {
    const provider: any = {
        ...EntityProvider(config),
        config,
        empty: () => Empty(config)
    }
    config.relationships.forEach(rel => {
        provider[rel.name] = rel.type === Relationship.HasMany ? HasMany(config, { type: rel.model }) : HasOne(config, { type: rel.model })
    });
    Providers[config.type] = provider;
    return provider as ModelProvider<T> & { [key: string]: RelationshipProvider<any> };
}
 
const saveEntity = (model: ModelConfig, properties: string[]) => async (entity: IModel) => {
    const tableName = getEntityTableName(model);
    const { data } = await Database.from(tableName).upsert(only(entity, [...properties, 'id'])).single();
    return data as IModel;
}

const getEntityById = (model: ModelConfig) => async (id: number) => {
    const query = getQuery(model, true);
    const tableName = getEntityTableName(model);
    const { data } = await Database.from(tableName).select(query).eq('id', id).single();
    return data
}

const getAllEntity = (model: ModelConfig) => async () => {
    const tableName = getEntityTableName(model);
    const query = getQuery(model, true);
    const { data } = await Database.from(tableName).select(query);
    return data;
}

export const getEntityTableName = (config: ModelConfig) => `${config.type}s`;

const getQuery = (config: ModelConfig, eager = false): string => {
    const propsQ = config.properties.reduce((acc: string, curr: PropertyConfig) => {
        return `${acc},${curr.name}`
    }, 'id');

    return config.relationships.reduce((acc: string, curr: RelationshipConfig) => {
        return `${acc},${curr.name}:${curr.model}s(${eager ? getQuery(Providers[curr.model].config) : 'id'})`
    }, propsQ)
}

export const Empty = (config: ModelConfig) => {
    const props = config.properties.reduce((acc, curr) => {
        if (Array.isArray(curr.type)) {
            return { ...acc, [curr.name]: [] }
        }
        if (curr.type === 'string') {
            return { ...acc, [curr.name]: '' }
        }
        if (curr.type === 'number') {
            return { ...acc, [curr.name]: 0 }
        }
        return { ...acc, [curr.name]: {} };
    }, {} as any)

    return config.relationships.reduce((acc, curr) => {
        if (curr.type === Relationship.HasMany) {
            return {...acc, [curr.name]: []}
        }
        if (curr.type === Relationship.HasOne) {
            return {...acc, [curr.name]: {}}
        }
    }, props)

}

export const EntityProvider = <T>(config: ModelConfig) => {
    const { properties } = config;
    const saveProperties = properties.filter(p => typeof p.type === 'string').map(p => p.name)

    return {
        getById: getEntityById(config),
        getAll: getAllEntity(config),
        save: saveEntity(config, saveProperties),
    } as ModelProvider<T>
}


// UTILS
const only = (obj: any, keys: string[]) => Object.keys(obj).filter(key => keys.includes(key)).reduce((acc: any, curr: string) => ({ ...acc, [curr]: obj[curr] }), {})
