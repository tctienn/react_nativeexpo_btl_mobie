import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';
import { get_threater } from '@/api/dataApi';
import { useRoute } from '@react-navigation/native';

const initialRegion = {
    latitude: 21.053604448535907,
    longitude: 105.78336286326798,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

export default function MapDemo() {
    const route = useRoute();
    const { coordinateEntity, idThreater } = route.params;

    const Endpoint = coordinateEntity;

    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0,
        longitude: 11,
    });
    const [load, setLoad] = useState(true)
    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            alert('Có vấn đề khi lấy địa chỉ hiện tại');
            return null;
        }


        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
        setLoad(false)
    };

    useEffect(() => {
        console.log("map s", coordinateEntity);
        getLocation();
    }, []);

    const getRoute = async () => {
        setLoad(true)
        get_threater(idThreater);
        try {
            const location = currentLocation;
            if (!location) {
                console.error("Failed to get current location");
                return;
            }

            const response = await axios.get(
                `http://router.project-osrm.org/route/v1/driving/${location.longitude},${location.latitude};${Endpoint.longitude},${Endpoint.latitude}?overview=full&geometries=geojson`
            );

            const coordinates = response.data.routes[0].geometry.coordinates.map((coord) => ({
                latitude: coord[1],
                longitude: coord[0],
            }));
            console.log('Route fetched');
            setRouteCoordinates(coordinates);
        } catch (error) {
            alert("Lỗi: " + error);
            console.error(error);
        }
        setLoad(false)
    };

    return (
        <View style={styles.container}>

            <MapView
                style={styles.map}
                initialRegion={initialRegion}
            >
                <Pressable style={styles.button} onPress={() => getRoute()}>
                    <Text style={styles.buttonText}>Chỉ đường</Text>
                </Pressable>


                {currentLocation && <Marker coordinate={currentLocation} title="Your Location" />}
                <Marker coordinate={Endpoint} title="Destination" />
                {routeCoordinates.length > 0 && (
                    <Polyline coordinates={routeCoordinates} strokeColor="#000" strokeWidth={3} />
                )}
            </MapView>
            {load && (
                <View style={styles.overlay}>
                    <Text style={styles.loadText}>Đang xử lý...</Text>
                </View>
            )}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền trong suốt nhạt
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadText: {
        color: 'white',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#007BFF', // Màu nền nút
        paddingVertical: 10, // Khoảng cách đứng của nút
        paddingHorizontal: 20, // Khoảng cách ngang của nút
        borderRadius: 5, // Bo tròn góc của nút
        marginBottom: 20, // Khoảng cách dưới cùng của nút
    },
    buttonText: {
        color: 'white', // Màu chữ của nút
        fontSize: 16, // Kích thước chữ của nút
        textAlign: 'center', // Canh giữa chữ
    },

});
