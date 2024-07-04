
import { Link, useRouter } from 'expo-router';
// import { Text, View } from 'react-native';
import { ScrollView, Text, View, RefreshControl, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Ay({ route }) {
    const navigation = useNavigation();
    const { itemId, otherParam } = route.params;

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        as()
        // Thực hiện các hành động làm mới tab ở đây
        setTimeout(() => {

            setRefreshing(false);
        }, 2000);
    };

    const goToDetails = () => {
        navigation.navigate('home')
    };
    // const goToDetailss = () => {
    //     router.push('/ays');
    // };

    // const ays = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('@user_token');
    //         if (token !== null) {
    //             // alert(token)
    //             // Token tồn tại
    //             return token;
    //         }
    //         // Token không tồn tại
    //         return null;
    //     } catch (error) {
    //         console.error('Failed to fetch the user session', error);
    //         return null;
    //     }
    // }
    const as = () => {
        alert('s')
    }

    useEffect(() => {
        // as()
    }, []);
    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1
            }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }


        >
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1.4 }}>
                    <Text onPress={goToDetails}>
                        demo màn hình2 : {itemId}
                    </Text>
                    <Text onPress={goToDetails}>
                        demo màn hình2 : {itemId}
                    </Text>


                </View>
                <View style={{ flex: 8.6 }}>

                </View>


            </View>
        </ScrollView>


    );
}