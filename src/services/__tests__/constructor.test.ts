import constructorReducer, {
  initialState,
  TConstructorState,
  addIngredient,
  removeIngredient,
  resetConstructor,
  setIngredients,
  replaceIngredients,
  constructorSelector
} from '../slices/constructor';
import {
  ingredientsWithDeleted,
  bunIngredientWithId,
  bunIngredientWithoutId,
  nonBunIngredientWithId,
  nonBunIngredientWithoutId,
  allNonBunIngredientsWithId,
  orderedIngredientsWithId,
  orderedIngredientsWithoutId,
  nonBunIngredientsWithoutIdReplace1To2,
  nonBunIngredientsWithoutIdReplace1To0
} from '../testData/constructor.testData';
import { TConstructorIngredient, TIngredient } from '@utils-types';

const removeId = (obj: TConstructorIngredient) =>
  (({ id, ...params }) => params)(obj);

const removeIdFromArray = (array: TConstructorIngredient[]) =>
  array.map((ingredient) => removeId(ingredient));

describe('Тестируем constructorSlice', () => {
  test('Тесты селектора', () => {
    const newState = {
      constructorIngredient: {
        bun: bunIngredientWithId,
        ingredients: allNonBunIngredientsWithId
      }
    };
    const receivedState = constructorSelector.selectConstructorState(newState);
    expect(receivedState).toEqual(newState.constructorIngredient);
  });

  test('Тесты добавления ингредиента (булка)', () => {
    const newState = constructorReducer(
      initialState,
      addIngredient(bunIngredientWithId)
    );
    const { ingredients, bun } = newState;
    let bunWithoutId = null;
    if (bun?.id) {
      bunWithoutId = removeId(bun);
    }
    expect(bunIngredientWithoutId).toEqual(bunWithoutId);
    expect(ingredients).toEqual([]);
  });

  test('Тесты добавления ингредиента (не булка)', () => {
    const newState = constructorReducer(
      initialState,
      addIngredient(nonBunIngredientWithId)
    );
    const { ingredients, bun } = newState;
    const ingredientsWithoutId = removeIdFromArray(ingredients);
    expect(null).toEqual(bun);
    expect([nonBunIngredientWithoutId]).toEqual(ingredientsWithoutId);
  });

  test('Тесты удаления ингредиента', () => {
    const initialStateFromConstants: TConstructorState = {
      bun: null,
      ingredients: allNonBunIngredientsWithId
    };
    const newState = constructorReducer(
      initialStateFromConstants,
      removeIngredient(nonBunIngredientWithId)
    );
    const { ingredients } = newState;
    const ingredientsWithoutId = removeIdFromArray(ingredients);
    expect(ingredientsWithDeleted).toEqual(ingredientsWithoutId);
  });

  test('Тесты очистки ингредиентов', () => {
    const initialStateFromConstants: TConstructorState = {
      bun: bunIngredientWithId,
      ingredients: allNonBunIngredientsWithId
    };
    const newState = constructorReducer(
      initialStateFromConstants,
      resetConstructor()
    );
    const { ingredients, bun } = newState;
    expect(ingredients).toEqual([]);
    expect(bun).toEqual(null);
  });

  test('Тесты обновления списка ингредиентов', () => {
    const initialStateFromConstants: TConstructorState = {
      bun: bunIngredientWithId,
      ingredients: allNonBunIngredientsWithId
    };
    const newState = constructorReducer(
      initialStateFromConstants,
      setIngredients(orderedIngredientsWithId)
    );
    const { ingredients } = newState;
    const ingredientsWithoutId = removeIdFromArray(ingredients);
    expect(ingredientsWithoutId).toEqual(orderedIngredientsWithoutId);
  });

  test('Тесты перемещения ингредиента вверх', () => {
    const initialStateFromConstants: TConstructorState = {
      bun: bunIngredientWithId,
      ingredients: allNonBunIngredientsWithId
    };
    const newState = constructorReducer(
      initialStateFromConstants,
      replaceIngredients({ index: 1, step: -1 })
    );
    const { ingredients } = newState;
    const ingredientsWithoutId = removeIdFromArray(ingredients);
    expect(ingredientsWithoutId).toEqual(nonBunIngredientsWithoutIdReplace1To0);
  });

  test('Тесты перемещения ингредиента вниз', () => {
    const initialStateFromConstants: TConstructorState = {
      bun: bunIngredientWithId,
      ingredients: allNonBunIngredientsWithId
    };
    const newState = constructorReducer(
      initialStateFromConstants,
      replaceIngredients({ index: 1, step: 1 })
    );
    const { ingredients } = newState;
    const ingredientsWithoutId = removeIdFromArray(ingredients);
    expect(ingredientsWithoutId).toEqual(nonBunIngredientsWithoutIdReplace1To2);
  });
});
