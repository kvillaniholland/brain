import { IModel, Model, PropertyType } from '../orm/Model';

export interface ITimeslot extends IModel {
    start: any;
    end: any;
    name: string;
}

export default Model<ITimeslot>({
    type: 'timeslot',
    properties: [
        { name: 'name', type: PropertyType.string }
    ],
    relationships: []
})
