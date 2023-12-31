import { Text } from 'react-native';

import { twMerge } from 'tailwind-merge';

const Header = ({ text, style }: { text: string; style?: string }) => {
  return (
    <Text className={twMerge('text-black font-[Bold] text-xl p-2.5 pb-5', style)}>{text}</Text>
  );
};

export default Header;
