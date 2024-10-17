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
import { TConstructorIngredient } from '@utils-types';

const removeId = (obj: TConstructorIngredient) =>
  (({ id, ...params }) => params)(obj);

const removeIdFromArray = (array: TConstructorIngredient[]) =>
  array.map((ingredient) => removeId(ingredient));

describe('Тестирование конструктора бургера - Constructor Slice', () => {
  describe('Селекторы', () => {
    test('Должен возвращать текущие ингредиенты конструктора через селектор constructorSelector', () => {
      const newState = {
        constructorIngredient: {
          bun: bunIngredientWithId,
          ingredients: allNonBunIngredientsWithId
        }
      };
      const receivedState =
        constructorSelector.selectConstructorState(newState);
      expect(receivedState).toEqual(newState.constructorIngredient);
    });
  });

  describe('Добавление ингредиентов', () => {
    test('Должен добавлять булку в состояние конструктора через action addIngredient', () => {
      const newState = constructorReducer(
        initialState,
        addIngredient(bunIngredientWithId)
      );
      const { ingredients, bun } = newState;
      let bunWithoutId = bun?.id ? removeId(bun) : null;
      expect(bunIngredientWithoutId).toEqual(bunWithoutId);
      expect(ingredients).toEqual([]);
    });

    test('Должен добавлять не булку в состояние конструктора через action addIngredient', () => {
      const newState = constructorReducer(
        initialState,
        addIngredient(nonBunIngredientWithId)
      );
      const { ingredients, bun } = newState;
      const ingredientsWithoutId = removeIdFromArray(ingredients);
      expect(bun).toBeNull();
      expect([nonBunIngredientWithoutId]).toEqual(ingredientsWithoutId);
    });
  });

  describe('Удаление ингредиентов', () => {
    test('Должен удалять выбранный ингредиент из состояния конструктора через action removeIngredient', () => {
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
  });

  describe('Сброс ингредиентов', () => {
    test('Должен очищать ингредиенты и булку в состоянии конструктора через action resetConstructor', () => {
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
      expect(bun).toBeNull();
    });
  });

  describe('Обновление списка ингредиентов', () => {
    test('Должен обновлять список ингредиентов конструктора без идентификаторов через action setIngredients', () => {
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
  });

  describe('Перемещение ингредиентов', () => {
    test('Должен перемещать ингредиент вверх в списке через action replaceIngredients', () => {
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
      expect(ingredientsWithoutId).toEqual(
        nonBunIngredientsWithoutIdReplace1To0
      );
    });

    test('Должен перемещать ингредиент вниз в списке через action replaceIngredients', () => {
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
      expect(ingredientsWithoutId).toEqual(
        nonBunIngredientsWithoutIdReplace1To2
      );
    });
  });
});
