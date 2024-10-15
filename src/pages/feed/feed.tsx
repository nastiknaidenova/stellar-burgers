import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchAllFeeds, selectOrders } from '../../services/slices/feeds';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllFeeds());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(selectOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleRefreshFeeds = () => {
    dispatch(fetchAllFeeds());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleRefreshFeeds} />;
};
