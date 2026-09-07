import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#208AEF',
        tabBarInactiveTintColor: '#8A8A8A',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home' }}
      />

      <Tabs.Screen
        name="categories"
        options={{ title: 'Categories' }}
      />

      <Tabs.Screen
        name="cart"
        options={{ title: 'Cart' }}
      />

      <Tabs.Screen
        name="orders"
        options={{ title: 'Orders' }}
      />

      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile' }}
      />
    </Tabs>
  );
}