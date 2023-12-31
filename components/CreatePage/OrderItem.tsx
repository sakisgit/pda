import { Text, TouchableOpacity, View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import useStore from '../../hooks/useStore';

const OrderItem = ({ order }: any) => {
  const { stateOrder, setOrder } = useStore((state) => ({
    stateOrder: state.order,
    setOrder: state.setOrder,
  }));

  const delete_from_order = () => {
    setOrder(stateOrder.filter((stateOrderItem) => stateOrderItem != order));
  };

  return (
    <View className="bg-[#f7f8f' m-1 p-3 rounded-md">
      <View className="flex-row items-center justify-between">
        <Text className="font-[Medium]">{order.name}</Text>

        <TouchableOpacity onPress={() => delete_from_order()}>
          <FontAwesomeIcon icon={faTrashCan} size={12} color={'#e61e1e'} />
        </TouchableOpacity>
      </View>

      <View className="ml-2 mt-0.5">
        {order.ingredients?.map((ingred: any, index: number) => (
          <Text className="font-[Regular] opacity-50" key={index}>
            {ingred}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default OrderItem;
