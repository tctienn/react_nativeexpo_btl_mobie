import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { get_ds_rap } from '@/api/dataApi';
const HomeScreen = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState("")
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await get_ds_rap()
            const result = response.data;
            setData(result);
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
        navigation.navigate('TheaterDetailScreen', { idTheater: idThreater });
    }
    const onClickDetailMovie = (movieId, theaterId) => {
        console.log('test', movieId, theaterId)
        navigation.navigate('MovieDetailScreen', { movieId: movieId, theater: theaterId });
    }


    const onPressSearch = () => {
        navigation.navigate('search', { searchText: searchText });
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Tìm Kiếm : {searchText}</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm phim, rạp..."
                    value={searchText}
                    onChangeText={e => setSearchText(e)}
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.searchButtonText} onPress={() => onPressSearch()}>Tìm</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.header}>Phim Sắp chiếu</Text>
            {data?.map((theater, index) => (
                <View key={index}>
                    <Text style={styles.theaterName}>{theater.name}</Text>
                    <ScrollView horizontal style={styles.moviesContainer}>
                        {theater.movies.map((movie, movieIndex) => (
                            <View key={movieIndex} style={styles.movieItem}>
                                <TouchableOpacity onPress={() => onClickDetailMovie(movie.id, theater)}>
                                    <Image source={{ uri: movie.poster }} style={styles.moviePoster} />
                                </TouchableOpacity>

                                <Text onPress={() => onClickDetailMovie(movie.id, theater)} style={styles.movieTitle}>{movie.title}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            ))}

            <Text style={styles.header}>Rạp Gần Bạn</Text>
            {data?.map((theater, index) => (
                <View key={index} style={styles.cinemaItem} >
                    <TouchableOpacity onPress={() => onClickThreater(theater.id)}>
                        <Image source={{ uri: theater.image }} style={styles.cinemaImage} />
                    </TouchableOpacity>

                    <View style={styles.cinemaTextContainer}>
                        <Text style={styles.cinemaName} onPress={() => onClickThreater(theater.id)}>{theater.name}</Text>

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
