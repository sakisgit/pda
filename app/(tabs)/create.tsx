import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';
import { twMerge } from 'tailwind-merge';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowUpRightFromSquare,
  faChampagneGlasses,
  faMotorcycle,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import useStore from '../../hooks/useStore';
import { supabase } from '../../utils/supabase';

import InputField from '../../components/InputField';
import Header from '../../components/Header';
import OrderItem from '../../components/CreatePage/OrderItem';
import { Session } from '@supabase/supabase-js';

const CreatePage = () => {
  const router = useRouter();
  const { order, setOrder, setRefresher, jwt_token } = useStore();

  const [name, setName] = useState('');
  const [customersNumber, setCustomersNumber] = useState('1');
  const [selectedWindow, setSelectedWindow] = useState(0);
  const [session, setSession] = useState<Session | null>(null);

  const send_to_db = async () => {
    setRefresher(new Date());

    let total_price_temp = 0,
      order_temp = order;

    order.map((order) => (total_price_temp += Number(order.price)));

    await supabase.from('tables').insert({
      name: name,
      order: order_temp,
      customers_number: Number(customersNumber),
      total_price: total_price_temp,
      service_id: session?.user.email,
      type: selectedWindow == 0 ? 'tables' : 'takeaway',
    });

    setOrder([]);

    router.push('/');
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={{ paddingTop: 64, paddingBottom: 100 }}>
      <Header text="Create Order" />

      <View className="flex-row items-center justify-evenly bg-[#f7f8fa] mx-2.5 p-1 rounded-xl">
        <TouchableOpacity
          className={twMerge(
            'flex-row items-center justify-center p-2.5 rounded-lg w-1/2 opacity-60',
            selectedWindow == 0 && 'bg-white opacity-100'
          )}
          onPress={() => setSelectedWindow(0)}>
          <FontAwesomeIcon icon={faChampagneGlasses} size={14} />
          <Text className="font-[Medium] text-sm ml-1.5">Tables</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={twMerge(
            'flex-row items-center justify-center p-2.5 rounded-lg w-1/2 opacity-60',
            selectedWindow == 1 && 'bg-white opacity-100'
          )}
          onPress={() => setSelectedWindow(1)}>
          <FontAwesomeIcon icon={faMotorcycle} size={14} />
          <Text className="font-[Medium] text-sm ml-1.5">Takeaway</Text>
        </TouchableOpacity>
      </View>

      {selectedWindow == 0 ? (
        <>
          <InputField header="Name" value={name} setValue={setName} placeholder="Name" />

          <InputField
            header="Customers Number"
            value={customersNumber}
            setValue={setCustomersNumber}
            placeholder="1"
            style="pb-0"
          />
        </>
      ) : null}

      <Text className="text-xs font-[Medium] m-2.5 mb-0">Order</Text>

      {order?.map((order, index) => <OrderItem order={order} key={index} />)}

      <TouchableOpacity
        className="flex-row items-center justify-center bg-[#f7f8fa] my-1.5 py-3 px-2.5 m-2.5 rounded"
        onPress={() => router.push('/menu')}>
        <Text className="font-[Medium] mr-1.5">Pick Products</Text>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} color={'#000000'} size={11} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => send_to_db()}
        className="flex-row items-center justify-center py-2 rounded-lg m-2.5 mt-5 bg-[#e02424]">
        <FontAwesomeIcon icon={faPaperPlane} color={'#ffffff'} size={16} />

        <Text className="ml-2 text-sm font-[Bold] text-white">Send</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreatePage;
