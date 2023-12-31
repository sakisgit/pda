import { Tabs } from 'expo-router';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faHome} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarLabel: 'Create Table',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faPlus} color={color} />,
        }}
      />
    </Tabs>
  );
}
