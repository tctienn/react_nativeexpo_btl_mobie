import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const HomeScreen = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://66870f8683c983911b0472c4.mockapi.io/ds');
            const result = await response.json();
            setData(result[0].theaters);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>đang tải...</Text>
            </View>
        );
    }

    const onClickThreater = (idThreater) => {
        navigation.navigate('TheaterDetailScreen', { theater: idThreater });
    }
    const onClickDetailMovie = (movieId, theaterId) => {
        navigation.navigate('MovieDetailScreen', { movieId: movieId, theaterId: theaterId });
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Tìm Kiếm</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm phim, rạp..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Tìm</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.header}>Phim Đang Chiếu</Text>
            {data.map((theater, index) => (
                <View key={index}>
                    <Text style={styles.theaterName}>{theater.name}</Text>
                    <ScrollView horizontal style={styles.moviesContainer}>
                        {theater.movies.map((movie, movieIndex) => (
                            <View key={movieIndex} style={styles.movieItem}>
                                <Image source={{ uri: movie.poster }} style={styles.moviePoster} />
                                <Text onPress={() => onClickDetailMovie(movie.id, theater.id)} style={styles.movieTitle}>{movie.title}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            ))}

            <Text style={styles.header}>Rạp Gần Bạn</Text>
            {data.map((theater, index) => (
                <View key={index} style={styles.cinemaItem} >
                    <Image source={{ uri: theater.image }} style={styles.cinemaImage} />
                    <View style={styles.cinemaTextContainer}>
                        <Text style={styles.cinemaName} onPress={() => onClickThreater(theater)}>{theater.name}</Text>
                        <Text style={styles.cinemaHours} onPress={() => onClickThreater(theater)}>{theater.address}</Text>

                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    searchButtonText: {
        color: 'white',
        fontSize: 18,
    },
    moviesContainer: {
        flexDirection: 'row',
    },
    movieItem: {
        marginRight: 10,
        alignItems: 'center',
    },
    moviePoster: {
        width: 100,
        height: 150,
        borderRadius: 10,
    },
    movieTitle: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: '500',
    },
    cinemaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    cinemaImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    cinemaTextContainer: {
        flex: 1,
    },
    cinemaName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cinemaHours: {
        fontSize: 16,
        color: 'gray',
    },
    theaterName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
});

export default HomeScreen;
