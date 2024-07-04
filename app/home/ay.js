import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Ay() {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        // Thực hiện các hành động làm mới tab ở đây
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const goToDetails = () => {
        navigation.navigate('demo/router1', {
            itemId: 86,
            otherParam: 'Data sent from Ay.js',
        });
    };

    useEffect(() => {
        // Effect khi được render
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
                        Go to demo/router1 with data
                    </Text>
                </View>
                <View style={{ flex: 8.6 }}>
                    {/* Nội dung chính của màn hình */}
                </View>
            </View>
        </ScrollView>
    );
}
