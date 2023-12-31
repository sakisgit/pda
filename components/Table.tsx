import { View, Text, TouchableOpacity } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faScroll, faUsers } from '@fortawesome/free-solid-svg-icons';

import { useRouter } from 'expo-router';

const Table = ({ table }: { table: any }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="bg-[#f7f8fa] rounded-md m-2.5 mb-0 pt-2.5 pb-5 px-2.5"
      onPress={() => router.push({ pathname: '/table', params: { id: table.id } })}>
      <View className="pb-3.5">
        <Text className="font-[Medium] text-lg">{table.name}</Text>

        <View className="flex-row items-center mt-1.5">
          <View className="flex-row items-center mr-3.5">
            <FontAwesomeIcon icon={faUsers} size={14} color={'#a8b3cfa3'} />
            <Text className="font-[Medium] ml-1.5 text-sm">{table.customers_number}</Text>
          </View>

          <View className="flex-row items-center mr-3.5">
            <FontAwesomeIcon icon={faScroll} size={14} color={'#a8b3cfa3'} />
            <Text className="font-[Medium] ml-1.5 text-sm">{table.order.length}</Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center">
        <View className="flex-row items-center mr-2">
          <Text className="font-[Medium] text-sm mr-1 opacity-50">Total:</Text>
          <Text className="font-[Bold] text-sm">{table.total_price}€</Text>
        </View>

        <View className="flex-row items-center mr-2">
          <Text className="font-[Medium] text-sm mr-1 opacity-50">Paid:</Text>
          <Text className="font-[Bold] text-sm">{table.total_paid}€</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Table;
