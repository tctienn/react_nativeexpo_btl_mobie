import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const TheaterDetailScreen = ({ route }) => {
    const { theater } = route.params;
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.theaterName}>  </Text>
            <Text style={[styles.theaterName, styles.link]} onPress={() => navigation.navigate('home')}>{"<"} Home</Text>
            <Image source={{ uri: theater.image }} style={styles.theaterImage} />
            <Text style={styles.theaterName}>{theater.name}</Text>
            <Text style={styles.theaterAddress}>{theater.address}</Text>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: theater.coordinates.latitude,
                    longitude: theater.coordinates.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: theater.coordinates.latitude,
                        longitude: theater.coordinates.longitude,
                    }}
                    title={theater.name}
                    description={theater.address}
                />
            </MapView>

            <Text style={styles.sectionTitle}>Phim đang chiếu</Text>
            {theater.movies.map((movie, index) => (
                <View key={index} style={styles.movieItem}>
                    <Image source={{ uri: movie.poster }} style={styles.moviePoster} />
                    <View style={styles.movieDetails}>
                        <Text style={styles.movieTitle}>{movie.title}</Text>
                        <Text style={styles.movieInfo}>Thể loại: {movie.genre}</Text>
                        <Text style={styles.movieInfo}>Thời lượng: {movie.duration} phút</Text>
                        <Text style={styles.movieInfo}>Giờ chiếu: {movie.showtimes.join(', ')}</Text>
                    </View>
                </View>
            ))}

            <Text style={styles.sectionTitle}>Sơ đồ ghế ngồi</Text>
            <View style={styles.seatMap}>
                {theater.seatMap.map((seat, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.seat,
                            seat.booked ? styles.bookedSeat : styles.availableSeat,
                        ]}
                    >
                        <Text style={styles.seatText}>{seat.row}{seat.seatNumber}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    theaterImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    theaterName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    theaterAddress: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
    },
    map: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    movieItem: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    moviePoster: {
        width: 100,
        height: 150,
        borderRadius: 10,
    },
    movieDetails: {
        marginLeft: 10,
        flex: 1,
        justifyContent: 'center',
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    movieInfo: {
        fontSize: 16,
        color: 'gray',
    },
    seatMap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    seat: {
        width: 30,
        height: 30,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    bookedSeat: {
        backgroundColor: 'red',
    },
    availableSeat: {
        backgroundColor: 'green',
    },
    seatText: {
        color: 'white',
        fontWeight: 'bold',
    },
    link: {
        color: "rgb(57, 159, 255)"
    }
});

export default TheaterDetailScreen;
