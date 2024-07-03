import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './home/index'
const Drawer = createDrawerNavigator();

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer.Navigator>
        <Drawer.Screen
          name="(tabs)" // Tên trang và phải khớp với url từ gốc
          options={{
            drawerLabel: 'Home', // Nhãn hiển thị trong menu
            title: 'Overview', // Tiêu đề trang
          }}
          component={Home} // Thay HomeScreen bằng màn hình bạn muốn dẫn đến
        />


      </Drawer.Navigator>
    </GestureHandlerRootView>
  );
}
