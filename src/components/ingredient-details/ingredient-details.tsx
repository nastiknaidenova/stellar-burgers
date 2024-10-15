import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { selectIngredientsState } from '../../services/slices/ingredients';

export const IngredientDetails: FC = () => {
  const { ingredients } = useSelector(selectIngredientsState);
  const { id } = useParams<{ id: string }>();

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  return ingredientData ? (
    <IngredientDetailsUI ingredientData={ingredientData} />
  ) : (
    <Preloader />
  );
};
