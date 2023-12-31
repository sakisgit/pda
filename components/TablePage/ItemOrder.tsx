import { TouchableOpacity, Text, View } from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';

const ItemOrder = ({
  order,
  onLeft,
  onLeftText,
  onLeftColor,
  onRight,
  onRightText,
  onRightColor,
}: any) => {
  return (
    <Swipeable
      overshootLeft={false}
      overshootRight={false}
      onSwipeableWillOpen={(e) => (e == 'left' ? onLeft() : onRight())}
      renderLeftActions={() => <Action text={onLeftText} backgroundColor={onLeftColor} />}
      renderRightActions={() => <Action text={onRightText} backgroundColor={onRightColor} />}>
      <TouchableOpacity className="flex-row items-center justify-between py-3 px-4 m-1 bg-[#f7f8fa] rounded-md">
        <Text className="font-[Medium]">{order.name}</Text>
        <Text className="font-[Medium]">{order.price}€</Text>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ItemOrder;

const Action = ({ text, backgroundColor }: any) => {
  return (
    <View
      className="items-center justify-center px-5 m-1 rounded-md"
      style={{ backgroundColor: backgroundColor }}>
      <Text className="text-white font-[Medium]">{text}</Text>
    </View>
  );
};
