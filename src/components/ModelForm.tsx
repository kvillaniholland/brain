import { IonButton, IonInput, IonSelect, IonSelectOption } from "@ionic/react";
import { useEffect, useState } from "react";
import {
  IModel,
  ModelProvider,
  Providers,
  Relationship,
  RelationshipConfig,
} from "../orm/Model";

// TODO - We need to bootstrap the models somewhere; this is a dumb janky way to do it for now.
import * as Models from "../models";

function useProviders(
  relationships: RelationshipConfig[]
): { [key: string]: IModel } {
  const empty = relationships.reduce(
    (acc, rel) => ({ ...acc, [rel.name]: [] }),
    {}
  );
  const [data, setData] = useState(empty);

  useEffect(() => {
    if (!relationships.length) return;
    const rel = relationships.shift();
    Providers[rel!.model]
      .getAll()
      .then((all) => setData({ ...data, [rel!.name]: all }));
  }, [data]);

  return data;
}

export const ModelForm = (props: {
  provider: ModelProvider<any>;
  relationships: RelationshipConfig[];
  model?: IModel;
}) => {
  const { model, provider } = props;
  const saveModel = async (model: IModel) => {
    const createdModel = await provider.save(model);
    provider.config.relationships.forEach((rel) =>
      provider[rel.name].set(createdModel, model[rel.name])
    );
  };
  const _model = model ?? provider.empty();

  const relations = useProviders(props.relationships);

  const setSingle = (e: any, rel: any) => {
    _model[rel.name] = relations[rel.name].find(
      (m: IModel) => m.id === e.detail.value
    );
  };

  const setMultiple = (e: any, rel: any) => {
    _model[rel.name] = e.detail.value.map?.((id: number) =>
      relations[rel.name].find((m: IModel) => m.id === id)
    );
  };

  const ready =
    _model &&
    Object.values(relations).reduce((acc, curr) => acc && !!curr.length, true);

  return !ready ? (
    <></>
  ) : (
    <>
      {provider.config.properties.map((prop) => (
        <p key={prop.name}>
          {prop.name}:{" "}
          <IonInput
            value={_model[prop.name]}
            onIonChange={(e) => (_model[prop.name] = e.detail.value)}
          />
        </p>
      ))}
      {provider.config.relationships.map((rel) => (
        <p key={rel.name}>
          {rel.name}:{" "}
          <IonSelect
            multiple={rel.type === Relationship.HasMany}
            value={
              Array.isArray(_model[rel.name])
                ? _model[rel.name].map((m: IModel) => m.id)
                : _model[rel.name].id
            }
            onIonChange={(e) =>
              rel.type === Relationship.HasMany
                ? setMultiple(e, rel)
                : setSingle(e, rel)
            }
          >
            {relations[rel.name].map((item: IModel) => (
              <IonSelectOption key={item.id} value={item.id}>
                {item[rel.display]}
              </IonSelectOption>
            ))}
          </IonSelect>
        </p>
      ))}
      <IonButton onClick={(e) => saveModel(_model as IModel)}>Save</IonButton>
    </>
  );
};
