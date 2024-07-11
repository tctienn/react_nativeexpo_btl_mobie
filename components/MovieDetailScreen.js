import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { get_ds_rap } from '@/api/dataApi'
import TabReturn from '@/components/TabReturn'
import Loader from '@/components/LoadDer'

const CinemaDetailScreen = ({ route }) => {
    const { movieId, theaterId } = route.params;
    let [check, setCheck] = useState(false)
    const [movie, Setmovie] = useState({})
    const [data, setData] = useState({})
    const getData = async () => {
        // const restpont = await get_ds_rap()
        // restpont = restpont.json()
        const response = await fetch('https://66870f8683c983911b0472c4.mockapi.io/ds');
        const result = await response.json();


        var array = await result[0].theaters.filter((e) => e.id == theaterId);
        setData(array[0]);

        // console.log("___________________", array)
        var array2 = array[0].movies.filter(e => e.id == movieId)
        Setmovie(array2[0])
        setCheck(true)


        // Setmovie(data.movies?.filter(e => e.id == movieId))
    }
    useEffect(() => {
        getData()
    }, []);


    if (check == false) {
        return (
            <Loader />
        )
    }
    else {
        return (
            <View style={styles.container}>
                <TabReturn />

                <Text style={styles.cinemaName}>{data.name}</Text>
                <Text style={styles.cinemaAddress}>{data.address}</Text>

                <View style={styles.movieDetailContainer}>
                    <Text style={styles.movieTitle}>{movie.title}</Text>
                    <Text style={styles.movieGenre}>{movie.genre}</Text>
                    <Text style={styles.movieDuration}>Duration: {movie.duration} mins</Text>

                    <Text style={styles.showtimeTitle}>Showtimes:</Text>
                    <FlatList
                        data={movie.showtimes}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => <Text style={styles.showtime}>{item}</Text>}
                    />
                </View>
            </View>

        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    cinemaName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2c3e50',
    },
    cinemaAddress: {
        fontSize: 16,
        marginBottom: 20,
        color: '#7f8c8d',
    },
    movieDetailContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    movieTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#34495e',
    },
    movieGenre: {
        fontSize: 16,
        marginBottom: 10,
        color: '#95a5a6',
    },
    movieDuration: {
        fontSize: 16,
        marginBottom: 20,
        color: '#95a5a6',
    },
    showtimeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2c3e50',
    },
    showtime: {
        fontSize: 16,
        color: '#34495e',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CinemaDetailScreen;
