import Database from "./Database";
import { IModel, ModelConfig } from "./Model";

const extractIds = (entities: IModel[]) => entities.map(({ id }) => id);

const attachManyToMany = (thisSide: ModelConfig, thatSide: ModelConfig) => async (thisSideId: number, thatSideId: number) => {
    const tableName = getManyToManyTable(thisSide, thatSide);
    await Database.from(tableName).upsert({ [`${thatSide.type}_id`]: thatSideId, [`${thisSide.type}_id`]: thisSideId })
}

const removeManyToMany = (thisSide: ModelConfig, thatSide: ModelConfig) => async (thisSideId: number, thatSideId: number) => {
    const tableName = getManyToManyTable(thisSide, thatSide);
    await Database.from(tableName).delete().match({ [`${thisSide.type}_id`]: thisSideId, [`${thatSide.type}_id`]: thatSideId })
}

const getManyToManyIds = (thisSide: ModelConfig, thatSide: ModelConfig) => async (sideTwoId: number): Promise<number[]> => {
    const tableName = getManyToManyTable(thisSide, thatSide);
    const { data } = await Database.from(tableName).select(`${thatSide.type}_id`).eq(`${thisSide.type}_id`, sideTwoId);
    return data!.map((item: any) => item[`${thatSide.type}_id`]);
}

const getManyToManyTable = (thisSide: ModelConfig, thatSide: ModelConfig) => [thisSide.type, thatSide.type].sort().join('_');


const ManyToManyMethods = (thisSide: ModelConfig, thatSide: ModelConfig) => ({
    attach: attachManyToMany(thisSide, thatSide),
    remove: removeManyToMany(thisSide, thatSide),
    ids: getManyToManyIds(thisSide, thatSide)
})

export const HasMany = (thisSide: ModelConfig, thatSide: any) => ({
    set: setManyToMany(thisSide, thatSide),
    attach: attachManyToMany(thisSide, thatSide)
})


type getManyToManyIds = (parentId: number) => Promise<number[]>
type removeManyToMany = (childId: number, parentId: number) => void
type attachManyToMany = (childId: number, parentId: number) => void


const setManyToMany = (thisSide: ModelConfig, thatSide: ModelConfig) => async (parent: IModel, children: IModel[]) => {
    console.log('the keenan says...', parent, children);
    
    const { ids, attach, remove } = ManyToManyMethods(thisSide, thatSide);
    const currentChildIds = await ids(parent.id)
    const newChildIds = extractIds(children);
    await Promise.all(currentChildIds.map(id => !newChildIds.includes(id) ? remove(parent.id, id) : Promise.resolve()));
    await Promise.all(newChildIds.map(id => !currentChildIds.includes(id) ? attach(parent.id, id) : Promise.resolve()));
}
