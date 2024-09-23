import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  resetConstructor,
  constructorSelector
} from '../../services/slices/constructor';
import {
  createOrder,
  selectOrderData,
  selectIsLoading,
  resetOrderState
} from '../../services/slices/newOrder';
import { selectIsAuthChecked } from '../../services/slices/user';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthChecked);
  const constructorItems = useSelector(
    constructorSelector.selectConstructorState
  );
  const orderRequest = useSelector(selectIsLoading);
  const orderModalData = useSelector(selectOrderData);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) {
      return;
    }
    const { bun, ingredients } = constructorItems;
    const orderData = [bun._id, ...ingredients.map(({ _id }) => _id)];
    dispatch(createOrder(orderData));
  };

  const closeOrderModal = () => {
    dispatch(resetOrderState());
    dispatch(resetConstructor());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
