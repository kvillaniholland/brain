import { IModel, Model, PropertyType } from "../orm/Model"

export interface ILocation extends IModel {
    name: string
}

export default Model<ILocation>({
    type: 'location',
    properties: [
        { name: 'name', type: PropertyType.string }
    ],
    relationships: []
})
