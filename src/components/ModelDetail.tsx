import { IonButton } from "@ionic/react";
import { useEffect, useState } from "react";
import { IModel, ModelProvider, Relationship } from "../orm/Model";

// TODO - this is annoying
import * as AllProviders from '../providers';
console.warn('the keenan says...', AllProviders);

export function useProvider(providerMethod: () => Promise<any>, empty: any = []): IModel {
    const [data, setData] = useState();
    useEffect(() => { 
        providerMethod().then(data => {
            setData(data)
        })
    }, [])
    return data as any as IModel;
}

export const ModelDetail = (props: { provider: ModelProvider<any>, id: number, editURL: string }) => {
    const { id, provider } = props
    const model = useProvider(() => provider.getById(id))

    return !model ? <></> : <>
        {provider.config.properties.map(prop => <p key={prop.name}>{prop.name}: {model[prop.name]}</p>)}
        {provider.config.relationships.map(rel => <p key={rel.name}>{rel.name}: {rel.type === Relationship.HasMany ? model[rel.name].map((m: IModel) => m[rel.display]) : model[rel.name][rel.display]}</p>)}
        <IonButton href={props.editURL}>Edit</IonButton>
    </>
}
