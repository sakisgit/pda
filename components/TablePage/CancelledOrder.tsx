import { View, Text } from 'react-native';

import ItemOrder from './ItemOrder';
import NoItems from '../NoItems';

import { supabase } from '../../utils/supabase';

const CancelledOrder = ({ orders, paidOrders, cancelledOrders, tableId, setRefresher }: any) => {
  const add_order = async (order: any) => {
    const orders_temp = [...orders, order];
    const cancelled_temp = cancelledOrders.filter((ord: any) => ord.id != order.id);

    let order_price_temp = 0;
    orders_temp.map((item) => {
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
        total_paid: paid_price_temp,
      })
      .match({ id: tableId });

    setRefresher(new Date());
  };

  const add_paid = async (order: any) => {
    const paid_orders_temp = [...paidOrders, order];
    const cancelled_temp = cancelledOrders.filter((ord: any) => ord.id != order.id);

    let paid_price_temp = 0;
    paid_orders_temp.map((item) => {
      paid_price_temp += Number(item.price);
    });

    let order_price_temp = 0;
    orders.map((item: any) => {
      order_price_temp += Number(item.price);
    });

    await supabase
      .from('tables')
      .update({
        paid_order: paid_orders_temp,
        cancelled: cancelled_temp,
        total_paid: paid_price_temp,
        total_price: order_price_temp + paid_price_temp,
      })
      .match({ id: tableId });

    // TODO: send e-mail when cancelled

    setRefresher(new Date());
  };

  return (
    <View className="mb-2.5">
      <Text className="font-[Medium] text-black/50 px-2.5">Cancelled</Text>

      {cancelledOrders?.map((order: any, index: any) => (
        <ItemOrder
          order={order}
          onLeft={() => add_paid(order)}
          onRight={() => add_order(order)}
          onLeftText={'Pay'}
          onRightText={'Order'}
          onLeftColor={'#348ceb'}
          onRightColor={'#eb4034'}
          key={index}
        />
      ))}

      {cancelledOrders?.length == 0 ? <NoItems text={'0 cancelled orders.'} /> : null}
    </View>
  );
};

export default CancelledOrder;
