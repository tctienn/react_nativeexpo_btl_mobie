
import { Link } from 'expo-router';
// import { Text, View } from 'react-native';
import { ScrollView, Text, View, RefreshControl, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import DemoMap from './map/DemoMap'
import { get_threater } from '@/api/dataApi';

export default function ThreatrtMap({ route }) {
    const { coordinateEntity, idThreater } = route.params

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);

        // Thực hiện các hành động làm mới tab ở đây
        setTimeout(() => {

            setRefreshing(false);
        }, 2000);
    };


    const [dataThreater, setDataThreater] = useState({})
    const getThreater = async () => {
        const response = await get_threater(idThreater)
        setDataThreater(response.data)
    }
    useEffect(() => {
        getThreater()
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
                    <Text>
                        Rap: {dataThreater.name}
                    </Text>
                    <Text>
                        Địa chỉ: {dataThreater.coordinateEntity?.address}
                    </Text>

                </View>
                <View style={{ flex: 8.6 }}>
                    <DemoMap />

                </View>


            </View>
        </ScrollView>


    );
}
