import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs>
      
      <Tabs.Screen name="index" options={{href: null}}/>
      
      <Tabs.Screen
        name="sign-in"
        options={{
          title: 'Sign In',
          tabBarIcon: ({ color }) => <TabBarIcon name="sign-in" color={color} />,
          headerShown:false,
        }}
      />

      <Tabs.Screen
        name="sign-up"
        options={{
          title: 'Sign Up',
          tabBarIcon: ({ color }) => <TabBarIcon name="registered" color={color} />,
          headerShown:false,
        }}
      />

    </Tabs>
  );
}
