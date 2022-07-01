import { IModel, Model, ModelProvider, PropertyType, Relationship, RelationshipProvider } from '../orm/Model';
import { ILocation } from './Location';
import { IStaff } from './Staff';
import { IStudent } from './Student';
import { ITimeslot } from './Timeslot';

export interface IStrand extends IModel {
    name: string;
    period: ITimeslot,
    staff: IStaff[],
    students: IStudent[]
    location: ILocation
}

export default Model<IStrand>({
    type: 'strand',
    relationships: [
        { name: 'period', type: Relationship.HasOne, model: 'timeslot', display: 'name' },
        { name: 'staff', type: Relationship.HasMany, model: 'staff', display: 'first_name' },
        { name: 'students', type: Relationship.HasMany, model: 'student', display: 'first_name' },
        { name: 'location', type: Relationship.HasOne, model: 'location', display: 'name' }
    ],
    properties: [
        { name: 'name', type: PropertyType.string },
    ]
}) as any as ModelProvider<IStrand> & { 
    staff: RelationshipProvider<IStaff>,
    students: RelationshipProvider<IStudent>,
    period: RelationshipProvider<ITimeslot>,
    location: RelationshipProvider<ILocation>,
} 
// TODO: how to make this type hinting work automatically?
