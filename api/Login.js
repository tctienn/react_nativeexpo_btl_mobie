import AsyncStorage from '@react-native-async-storage/async-storage';

const user = {
    id: 1,
    name: "user",
    password: "1",
    gmail: "ay@gmail.com"
}
// Hàm lưu biến user
const saveUser = async (user) => {
    try {
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        console.log('User saved successfully');
    } catch (error) {
        console.error('Failed to save the user session', error);
    }
};
saveUser(user)

// Hàm lấy biến user
export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem('@user');
        if (user !== null) {
            return JSON.parse(user);
        }
        console.log('No user found');
        return null;
    } catch (error) {
        console.error('Failed to fetch the user session', error);
        return null;
    }
};


// Hàm hủy bỏ biến user
const removeUser = async () => {
    try {
        await AsyncStorage.removeItem('@user');
        console.log('User removed successfully');
    } catch (error) {
        console.error('Failed to remove the user session', error);
    }
};
