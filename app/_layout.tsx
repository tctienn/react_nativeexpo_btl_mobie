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
import Profile from '@/components/Profile'
import ThreaterMap from '@/components/ThreaterMap'
import Search from "@/components/SearchForm"
import Booked from "@/components/Booked"

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

{/* /// cấu hình draw/// */ }
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
        name="Profile"
        options={{
          drawerLabel: 'ProFile',
          title: 'Thông tin tài khoản',
        }}
        component={Profile}
      />


      {/* <Drawer.Screen
        name="homemain"
        options={{
          drawerLabel: 'Home demo',
          title: 'Overview',
        }}
        component={Ay}
      /> */}

    </Drawer.Navigator>
  );
}
{/* /// cấu hình router/// */ }
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
        options={{ headerShown: true, title: "Thông tin rạp " }}
      />
      <Stack.Screen
        name="MovieDetailScreen"
        component={MovieDetailScreen}
        options={{ headerShown: true, title: "Thông tin phim " }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="threatermap"
        component={ThreaterMap}
        options={{ headerShown: true, title: "Thông tin vị trí rạp " }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{ headerShown: true, title: "Tìm kiếm" }}
      />
      <Stack.Screen
        name="booking"
        component={Booked}
        options={{ headerShown: true, title: "booking" }}
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
