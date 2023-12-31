import { View, Text } from 'react-native';

import ItemOrder from './ItemOrder';
import NoItems from '../NoItems';

import { supabase } from '../../utils/supabase';

const Order = ({
  orders,
  paidOrders,
  cancelledOrders,
  tableId,
  setRefresher,
}: {
  orders: any;
  paidOrders: any;
  cancelledOrders: any;
  tableId: any;
  setRefresher: any;
}) => {
  const add_paid = async (order: any) => {
    const paid_temp = [...paidOrders, order];
    const orders_temp = orders.filter((ord: any) => ord.id != order.id);

    let paid_price_temp = 0;
    paid_temp.map((item) => {
      paid_price_temp += Number(item.price);
    });

    await supabase
      .from('tables')
      .update({ order: orders_temp, paid_order: paid_temp, total_paid: paid_price_temp })
      .match({ id: tableId });

    setRefresher(new Date());
  };

  const add_cancelled = async (order: any) => {
    const cancelled_temp = [...cancelledOrders, order];
    const orders_temp = orders.filter((ord: any) => ord.id != order.id);

    let order_price_temp = 0;
    orders_temp.map((item: any) => {
      order_price_temp += Number(item.price);
    });

    let paid_price_temp = 0;
    paidOrders.map((item: any) => {
      paid_price_temp += Number(item.price);
    });

    await supabase
      .from('tables')
      .update({
        order: orders_temp,
        cancelled: cancelled_temp,
        total_price: order_price_temp + paid_price_temp,
      })
      .match({ id: tableId });

    // TODO: send e-mail when cancelled

    setRefresher(new Date());
  };

  return (
    <View className="mb-2.5">
      <Text className="font-[Medium] text-black/50 px-2.5">Order</Text>

      {orders?.map((order: any, index: any) => (
        <ItemOrder
          order={order}
          onLeft={() => add_paid(order)}
          onRight={() => add_cancelled(order)}
          onLeftText={'Pay'}
          onRightText={'Cancel'}
          onLeftColor={'#348ceb'}
          onRightColor={'#eb4034'}
          key={index}
        />
      ))}

      {orders?.length == 0 ? <NoItems text={'0 orders.'} /> : null}
    </View>
  );
};

export default Order;
