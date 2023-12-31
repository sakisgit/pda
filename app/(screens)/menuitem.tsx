import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import useStore from '../../hooks/useStore';

import { supabase } from '../../utils/supabase';

import Header from '../../components/Header';
import NoItems from '../../components/NoItems';
import Item from '../../components/MenuItemPage/Item';
import OrderItem from '../../components/MenuItemPage/OrderItem';
import SubHeader from '../../components/SubHeader';
import { useGlobalSearchParams } from 'expo-router';

const MenuCategory = () => {
  const { order } = useStore((state) => ({ order: state.order }));

  const pathname = useGlobalSearchParams();
  const name = pathname.name as string;
  const path = name;

  const [items, setItems] = useState<any>([]);
  const [ingredients, setIngredient] = useState<any>([]);

  const get_category_items = async () => {
    const { data } = await supabase.from('menu').select().match({ category: path });

    setItems(data);
  };

  const get_extra_ingredients = async () => {
    const { data } = await supabase
      .from('menu_categories')
      .select()
      .match({ name: path.charAt(0).toUpperCase() + path.slice(1) });

    setIngredient(data![0].extra_ingredients);
  };

  useEffect(() => {
    (async () => {
      if (path) {
        await get_category_items();
        await get_extra_ingredients();
      }
    })();
  }, [path]);

  return (
    <ScrollView
      className="bg-white flex-1"
      contentContainerStyle={{ paddingTop: 64, paddingBottom: 100 }}>
      <Header text={path.charAt(0).toUpperCase() + path.slice(1)} />

      {items?.map((item: any, index: number) => (
        <Item item={item} ingredients={ingredients} key={index} />
      ))}

      <SubHeader text={'Current Orders'} style="mt-5" />

      {order
        ?.filter((order) => order.category == path)
        .map((order, index) => <OrderItem order={order} key={index} />)}

      {order?.filter((order) => order.category == path).length == 0 ? (
        <NoItems text={'No current orders.'} />
      ) : null}
    </ScrollView>
  );
};

export default MenuCategory;
