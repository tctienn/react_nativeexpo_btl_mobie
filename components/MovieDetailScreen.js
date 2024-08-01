import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { get_ds_rap, get_movie } from '@/api/dataApi'
import TabReturn from '@/components/TabReturn'
import Loader from '@/components/LoadDer'
import { useNavigation } from '@react-navigation/native';
import VideoComponent from './VideoComponent'

const CinemaDetailScreen = ({ route }) => {
    const { movieId, theater } = route.params;
    let [check, setCheck] = useState(false)
    const [movie, Setmovie] = useState({})
    const [showTime, setShowTime] = useState([])
    const getData = async () => {
        // const restpont = await get_ds_rap()
        // restpont = restpont.json()
        const response = await get_movie(movieId, theater.id)
        setShowTime(response.data.showTime.split(',').map(time => time.trim().replace(/"/g, '')))


        // console.log("___________________", response.data)
        Setmovie(response.data)
        setCheck(true)


        // Setmovie(data.movies?.filter(e => e.id == movieId))
    }
    useEffect(() => {
        getData()
    }, []);

    const navigation = useNavigation()
    const onBooked = (idMovie, idThreaster) => {
        console.log('movie t', idMovie, idThreaster)
        navigation.navigate('booking', { idMovie: idMovie, idThreater: idThreaster });
    }

    if (check == false) {
        return (
            <Loader />
        )
    }
    else {
        return (

            <ScrollView style={styles.container}>
                {/* <TabReturn /> */}

                <Text style={styles.cinemaName}>Rạp: {theater.name}</Text>
                <Text style={styles.cinemaAddress}>Địa chỉ: {theater.coordinateEntity.address}</Text>
                <View style={styles.movieDetailContainer}>
                    <Image source={{ uri: movie.poster }} style={styles.moviePoster} />
                    <VideoComponent movie={movie.movie} />
                </View>
                <View style={styles.movieDetailContainer}>
                    <Text style={styles.movieTitle}>{movie.title}</Text>
                    <Text style={styles.movieGenre}>Thể loại: {movie.genre}</Text>
                    <Text style={styles.movieDuration}>Thời lượng: {movie.duration} mins</Text>
                    <Text style={styles.showtimeTitle}>Giá vé:{movie.price}</Text>
                    <Text style={styles.showtimeTitle}>thời gian chiếu:</Text>
                    {showTime?.map((item, i) => (
                        <TouchableOpacity key={i} style={styles.searchButton} onPress={() => onBooked(movie.id, theater.id)}>

                            <Text style={styles.showtime}> <Text style={styles.check}> Đặt vé : </Text>  {item}</Text>
                        </TouchableOpacity>))}

                </View>
                <Text></Text>
            </ScrollView>

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
        paddingLeft: 0,
        borderRadius: 10,
        backgroundColor: 'rgb(177, 178, 179)',
        overflow: 'hidden',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    moviePoster: {
        width: "100%",
        height: 250,
        borderRadius: 10,
    },
    check: {
        color: 'white',
        backgroundColor: 'rgb(121, 156, 186)',
        overflow: 'hidden',

    }

});

export default CinemaDetailScreen;
