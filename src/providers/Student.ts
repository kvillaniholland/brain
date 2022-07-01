import { IModel, Model, PropertyType } from "../orm/Model";
import { IStrand } from "./Strand";

export interface IStudent extends IModel {
    first_name: string;
    last_name: string;
    strands: IStrand[];
}

export default Model<IStudent>({
    type: 'student',
    properties: [
        {name: 'first_name', type: PropertyType.string},
        {name: 'last_name', type: PropertyType.string},
    ],
    relationships: []
})
