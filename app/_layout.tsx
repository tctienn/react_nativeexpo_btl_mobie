import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Ay from './home/tab';
import HiddenScreen from './demo/router1';


/////////
import Tabs from './homemain/tab';
import DetailTheater from '../components/DetailTheater'
import MovieDetailScreen from '../components/MovieDetailScreen'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: 'Home',
          title: '',
        }}
        component={Tabs}
      />
      <Drawer.Screen
        name="homemain"
        options={{
          drawerLabel: 'Home demo',
          title: 'Overview',
        }}
        component={Ay}
      />

    </Drawer.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="demo/router1"
        component={HiddenScreen}
        options={{ headerShown: false }}
      />



      {/* ////// */}
      <Stack.Screen
        name="TheaterDetailScreen"
        component={DetailTheater}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetailScreen"
        component={MovieDetailScreen}
        options={{ headerShown: false }}
      />

      {/* Thêm các màn hình khác vào đây nếu cần */}
    </Stack.Navigator>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer independent={true}>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
