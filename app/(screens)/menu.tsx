import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { supabase } from '../../utils/supabase';

import Header from '../../components/Header';
import { useRouter } from 'expo-router';

const MenuPage = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<any>();

  const get_categories = async () => {
    const { data } = await supabase.from('menu_categories').select();

    setCategories(data);
  };

  useEffect(() => {
    (async () => {
      await get_categories();
    })();
  }, []);

  return (
    <View className="bg-white flex-1 pt-16">
      <Header text="Categories" />

      <View className="flex-row flex-wrap items-start">
        {categories?.map((category: any, index: number) => (
          <TouchableOpacity
            onPress={() =>
              router.push({ pathname: '/menuitem', params: { name: category.name.toLowerCase() } })
            }
            className="flex-row items-center justify-center w-[44%] h-[100px] m-2.5 bg-[#f7f8fa] rounded-md"
            key={index}>
            <Text className="font-[Medium]">{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MenuPage;
