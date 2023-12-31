import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { supabase } from '../../utils/supabase';

// import NoItems from '../../Misc/NoItems/NoItems';
// import ItemOrder from './ItemOrder';
import Order from '../../components/TablePage/Order';
import PaidOrder from '../../components/TablePage/PaidOrder';
import CancelledOrder from '../../components/TablePage/CancelledOrder';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import useStore from '../../hooks/useStore';
import { twMerge } from 'tailwind-merge';

const Table = () => {
  const { setRefresher: setGlobalRefresher } = useStore();

  const router = useRouter();
  const pathname = useGlobalSearchParams();
  const id = JSON.parse(pathname.id as string);
  const tableId = id;

  const [tableData, setTableData] = useState<any>({});
  const [orders, setOrders] = useState<any>();
  const [paidOrder, setPaidOrder] = useState<any>();
  const [cancelledOrder, setCancelledOrder] = useState<any>();
  const [refresher, setRefresher] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const get_table = async () => {
    const { data, error } = await supabase.from('tables').select().match({ id: tableId });

    if (error) {
      Alert.alert('Error Getting Table', JSON.stringify(error));

      return;
    }

    setTableData(data![0]);
    setOrders(data![0].order);
    setPaidOrder(data![0].paid_order);
    setCancelledOrder(data![0].cancelled);
  };

  const complete = async () => {
    const { error } = await supabase
      .from('tables')
      .update({ completed: true })
      .match({ id: tableId });

    if (error) {
      Alert.alert('Error Completing Table', JSON.stringify(error));

      return;
    }

    setGlobalRefresher(new Date());

    Alert.alert('Table Completed', 'Table has been paid successfully!', [
      { text: 'OK', onPress: () => router.push('/') },
    ]);
  };

  useEffect(() => {
    (async () => {
      await get_table();

      setLoading(false);
    })();
  }, [refresher]);

  if (loading) return <View className="flex-1 bg-white"></View>;

  return (
    <View className="flex-1 bg-white pt-16">
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

      <View
        className={twMerge(
          'absolute left-0 right-0 bottom-0 top-0 z-[999]',
          tableData.completed ? 'block' : 'hidden'
        )}></View>

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

      {tableData.completed ? (
        <TouchableOpacity
          disabled={true}
          className="flex-row items-center justify-center py-2 rounded-lg m-2.5 mt-5 bg-[#24e059] opacity-50">
          <FontAwesomeIcon icon={faCheck} color={'#ffffff'} size={16} />

          <Text className="ml-2 text-sm font-[Bold] text-white">Table Completed</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={complete}
          className="flex-row items-center justify-center py-2 rounded-lg m-2.5 mt-5 bg-[#e02424]">
          <FontAwesomeIcon icon={faCheck} color={'#ffffff'} size={16} />

          <Text className="ml-2 text-sm font-[Bold] text-white">Complete Table</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Table;
