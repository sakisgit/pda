import { TextInput, View, Text } from 'react-native';

import { twMerge } from 'tailwind-merge';

const InputField = ({
  header,
  value,
  setValue,
  placeholder,
  style,
}: {
  header: string;
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  style?: string;
}) => {
  return (
    <View className={twMerge('p-2.5', style)}>
      <Text className="text-sm font-[Medium]">{header}</Text>

      <View className="bg-[#f7f8fa] my-1.5 p-2.5 rounded">
        <TextInput
          className="font-[Regular]"
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};

export default InputField;
