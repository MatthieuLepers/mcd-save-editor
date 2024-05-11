import {
  ModelStatic,
  ModelAttributeColumnOptions,
  Model,
  Attributes,
} from 'sequelize';

export function getPrimaryKeyAttributes(model: ModelStatic<any>): ModelAttributeColumnOptions[] {
  return Object.values(model.rawAttributes).filter((attribute) => attribute.primaryKey);
}

export function getAttributeMetadata<M extends Model>(model: ModelStatic<M>, attributeName: keyof Attributes<M>): ModelAttributeColumnOptions {
  const attribute = model.rawAttributes[attributeName.toString()];
  if (!attribute) {
    throw new Error(`Attribute ${attributeName.toString()} does not exist on model ${model.name}`);
  }

  return attribute;
}
