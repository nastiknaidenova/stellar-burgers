import { FC, memo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  constructorSelector,
  removeIngredient,
  setIngredients
} from '../../services/slices/constructor';
import { TConstructorIngredient } from '@utils-types';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const itemsInConstructor = useSelector(
      constructorSelector.selectConstructorState
    );

    const rearrangeIngredients = (
      ingredients: TConstructorIngredient[],
      currentIndex: number,
      direction: number
    ) => {
      const updatedIngredients = [...ingredients];
      const targetIndex = currentIndex + direction;

      if (targetIndex < 0 || targetIndex >= updatedIngredients.length) {
        return updatedIngredients;
      }

      [updatedIngredients[currentIndex], updatedIngredients[targetIndex]] = [
        updatedIngredients[targetIndex],
        updatedIngredients[currentIndex]
      ];

      return updatedIngredients;
    };

    const handleMoveDown = () => {
      dispatch(
        setIngredients(
          rearrangeIngredients(itemsInConstructor.ingredients, index, 1)
        )
      );
    };

    const handleMoveUp = () => {
      dispatch(
        setIngredients(
          rearrangeIngredients(itemsInConstructor.ingredients, index, -1)
        )
      );
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
