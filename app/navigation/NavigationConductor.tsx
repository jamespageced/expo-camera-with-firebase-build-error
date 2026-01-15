import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { Home, Scan } from '@app/screens';
import { navRoutesToTitles, navScreens } from '@app/utils';
import type { NavigationStack, StackParamsList } from '@app/types';

const Stack: NavigationStack = createStackNavigator<StackParamsList>();

function getStackHeaderOptions(route: RouteProp<StackParamsList, string>): StackNavigationOptions {
  return {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#003069' },
    headerRightContainerStyle: { paddingRight: 20 },
    headerLeftContainerStyle: { paddingLeft: 20 },
    headerTitleStyle: {
      fontSize: 24,
      fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial',
      fontWeight: 'normal',
      color: 'hsla(0,0%,100%,.8)'
    },
    headerTintColor: 'hsla(0,0%,100%,.8)',
    headerTitle: navRoutesToTitles[route.name],
    headerRight: null as any,
    headerLeft: null as any
  };
}

export default function NavigationConductor() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={navScreens.home.route}
        screenOptions={({ route }) => getStackHeaderOptions(route)}
      >
        <Stack.Group>
          <Stack.Screen name={navScreens.home.route} component={Home} />
          <Stack.Screen name={navScreens.scan.route} component={Scan} options={{ headerShown: false }} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
