import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  RefreshControl,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons/faMotorcycle';
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons/faChampagneGlasses';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { twMerge } from 'tailwind-merge';
import { Redirect, useRouter } from 'expo-router';

import { supabase } from '../../utils/supabase';

import Table from '../../components/Table';
import Header from '../../components/Header';
import useStore from '../../hooks/useStore';
import { Session } from '@supabase/supabase-js';

const HomePage = () => {
  const router = useRouter();
  const { refresher, setRefresher } = useStore();

  const [session, setSession] = useState<Session | null>(null);
  const [tables, setTables] = useState<any>([]);
  const [selectedWindow, setSelectedWindow] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const get_tables_number = async () => {
    const { data } = await supabase
      .from('tables')
      .select()
      .match({ closed: false, service_id: session?.user.email });

    setTables(data);
  };

  const complete = () => {
    let total = 0;
    let takeaway = 0;

    tables
      .filter((table: any) => table.type == 'tables')
      .forEach((tab: any) => (total += Number(tab.total_price)));
    tables
      .filter((table: any) => table.type == 'takeaway')
      .forEach((tab: any) => (takeaway += Number(tab.total_price)));

    Alert.alert(
      'Shift Completed',
      `Total: ${total.toFixed(2)}€ - Takeaway: ${takeaway.toFixed(2)}€           Good Rest!`,
      [
        {
          text: 'OK',
          onPress: async () => {
            for (let i = 0; i < tables.length; i++) {
              const { error } = await supabase
                .from('tables')
                .update({
                  closed: true,
                })
                .match({ id: tables[i].id });
            }

            setRefresher(new Date());

            supabase.auth.signOut();

            router.replace('/login');
          },
        },
      ]
    );
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (!session) {
        return;
      }

      await get_tables_number();
    })();
  }, [session, refresher, refreshing]);

  if (!session)
    return (
      <View className="items-center justify-center flex-1">
        <TouchableOpacity
          onPress={() => router.push('/login')}
          className="bg-[#348ceb] w-[90%] h-10 items-center justify-center rounded mt-1.5">
          <Text className="font-[Medium] text-white">Please Login</Text>
        </TouchableOpacity>
      </View>
    );
  else
    return (
      <View className="pt-14">
        <View className="flex-row items-center justify-between mb-2">
          <Header text="PDA" style="pb-0" />
          {/* <Text className="ml-2 text-sm font-[Bold] text-white">
            {JSON.stringify(session, null, 2)}
          </Text> */}

          <TouchableOpacity
            onPress={complete}
            className="flex-row items-center justify-center py-2 px-3 mr-2 rounded-lg bg-[#e02424]">
            <FontAwesomeIcon icon={faCheckCircle} color={'#ffffff'} size={16} />

            <Text className="ml-2 text-sm font-[Bold] text-white">Complete</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-evenly bg-[#f7f8fa] mx-2.5 p-1 rounded-xl">
          <TouchableOpacity
            className={twMerge(
              'flex-row items-center justify-center p-2.5 rounded-lg w-1/2 opacity-70',
              selectedWindow == 0 && 'bg-white opacity-100'
            )}
            onPress={() => setSelectedWindow(0)}>
            <FontAwesomeIcon icon={faChampagneGlasses} size={14} />
            <Text className="font-[Medium] text-sm ml-1">Tables</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={twMerge(
              'flex-row items-center justify-center p-2.5 rounded-lg w-1/2 opacity-70',
              selectedWindow == 1 && 'bg-white opacity-100'
            )}
            onPress={() => setSelectedWindow(1)}>
            <FontAwesomeIcon icon={faMotorcycle} size={14} />
            <Text className="font-[Medium] text-sm ml-1">Takeaway</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ height: '100%' }}
          contentContainerStyle={{ paddingBottom: 240 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {selectedWindow == 0
            ? tables
                // @ts-ignore
                ?.filter((table) => table.type == 'tables')
                // @ts-ignore
                ?.filter((table) => table.completed == false).length == 0 && (
                <Text className="m-2 text-black/50">No tables.</Text>
              )
            : tables
                // @ts-ignore
                ?.filter((table) => table.type == 'takeaway')
                // @ts-ignore
                ?.filter((table) => table.completed == false).length == 0 && (
                <Text className="m-2 text-black/50">No takeaways.</Text>
              )}

          {selectedWindow == 0
            ? tables
                // @ts-ignore
                ?.filter((table) => table.type == 'tables')
                // @ts-ignore
                ?.filter((table) => table.completed == false)
                .reverse()
                // @ts-ignore
                .map((table, index) => <Table table={table} key={index} />)
            : tables
                // @ts-ignore
                ?.filter((table) => table.type == 'takeaway')
                // @ts-ignore
                ?.filter((table) => table.completed == false)
                .reverse()
                // @ts-ignore
                .map((table, index) => <Table table={table} key={index} />)}

          <Text className="font-[Medium] text-base p-2">Completed Table</Text>

          {selectedWindow == 0
            ? tables
                // @ts-ignore
                ?.filter((table) => table.type == 'tables')
                // @ts-ignore
                ?.filter((table) => table.completed == true).length == 0 && (
                <Text className="m-2 text-black/50">No completed tables.</Text>
              )
            : tables
                // @ts-ignore
                ?.filter((table) => table.type == 'takeaway')
                // @ts-ignore
                ?.filter((table) => table.completed == true).length == 0 && (
                <Text className="m-2 text-black/50">No completed takeaways.</Text>
              )}

          {selectedWindow == 0
            ? tables
                // @ts-ignore
                ?.filter((table) => table.type == 'tables')
                // @ts-ignore
                ?.filter((table) => table.completed == true)
                .reverse()
                // @ts-ignore
                .map((table, index) => <Table table={table} key={index} />)
            : tables
                // @ts-ignore
                ?.filter((table) => table.type == 'takeaway')
                .reverse()
                // @ts-ignore
                ?.filter((table) => table.completed == true)
                // @ts-ignore
                .map((table, index) => <Table table={table} key={index} />)}
        </ScrollView>
      </View>
    );
};

export default HomePage;
