import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { supabase } from '../../utils/supabase';

// import NoItems from '../../Misc/NoItems/NoItems';
// import ItemOrder from './ItemOrder';
import Order from './Order';
import PaidOrder from './PaidOrder';
import CancelledOrder from './CancelledOrder';

const Table = ({ route }: { route: any }) => {
  const { id: tableId } = route.params;

  const [tableData, setTableData] = useState<any>({});
  const [orders, setOrders] = useState<any>();
  const [paidOrder, setPaidOrder] = useState<any>();
  const [cancelledOrder, setCancelledOrder] = useState<any>();
  const [refresher, setRefresher] = useState<any>();

  const get_table = async () => {
    const { data } = await supabase.from('tables').select().match({ id: tableId });

    setTableData(data![0]);
    setOrders(data![0].order);
    setPaidOrder(data![0].paid_order);
    setCancelledOrder(data![0].cancelled);
  };

  useEffect(() => {
    (async () => {
      await get_table();
    })();
  }, [refresher]);

  return (
    <View className="flex-1">
      <View className="flex-row items-center justify-between p-5 mb-1.5">
        <View className="items-center">
          <Text className="font-[Medium] text-black/50">Total</Text>
          <Text className="font-[Medium] text-base mt-1">
            {Number(tableData.total_price).toFixed(2)}€
          </Text>
        </View>

        <View className="items-center">
          <Text className="font-[Medium] text-black/50">Paid</Text>
          <Text className="font-[Medium] text-base mt-1">
            {Number(tableData.total_paid).toFixed(2)}€
          </Text>
        </View>

        <View className="items-center">
          <Text className="font-[Medium] text-black/50">Remaining</Text>
          <Text className="font-[Medium] text-base mt-1">
            {(tableData.total_price - tableData.total_paid).toFixed(2)}€
          </Text>
        </View>
      </View>

      <Order
        orders={orders}
        paidOrders={paidOrder}
        cancelledOrders={cancelledOrder}
        tableId={tableId}
        setRefresher={setRefresher}
      />

      <PaidOrder
        orders={orders}
        paidOrders={paidOrder}
        cancelledOrders={cancelledOrder}
        tableId={tableId}
        setRefresher={setRefresher}
      />

      <CancelledOrder
        orders={orders}
        paidOrders={paidOrder}
        cancelledOrders={cancelledOrder}
        tableId={tableId}
        setRefresher={setRefresher}
      />
    </View>
  );
};

export default Table;
