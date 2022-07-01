import { IModel, Model, PropertyType, Relationship } from "../orm/Model";

export interface IStaff extends IModel { first_name: string }

const Staff = Model<IStaff>({
    type: 'staff',
    relationships: [
        { name: 'strands', type: Relationship.HasMany, model: 'strand', display: 'name' }
    ],
    properties: [
        { name: 'first_name', type: PropertyType.string },
        { name: 'last_name', type: PropertyType.string },
    ]
});

export default Staff;
