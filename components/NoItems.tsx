import { Text } from 'react-native';

const NoItems = ({ text }: { text: string }) => {
  return <Text className="font-[Regular] text-center py-1.5">{text}</Text>;
};

export default NoItems;
