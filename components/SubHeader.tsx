import { Text } from 'react-native';

import { twMerge } from 'tailwind-merge';

const SubHeader = ({ text, style }: { text: string; style: string }) => {
  return <Text className={twMerge('text-sm font-[Medium] mx-2.5', style)}>{text}</Text>;
};

export default SubHeader;
