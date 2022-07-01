import Database from "./Database";
import { getEntityTableName, IModel, ModelConfig } from "./Model";

const setOneToOne = (_parent: ModelConfig, _child: ModelConfig) => async (
  parent: IModel,
  child: IModel
) => {
  const tableName = getEntityTableName(_parent);
  await Database.from(tableName)
    .update({ [`${_child.type}_id`]: child.id })
    .match({ id: parent.id });
};

export const HasOne = (parent: ModelConfig, child: any) => ({
  set: setOneToOne(parent, child),
});
