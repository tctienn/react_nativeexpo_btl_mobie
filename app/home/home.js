import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
    const movies = [
        { title: 'Movie 1', poster: 'https://via.placeholder.com/100' },
        { title: 'Movie 2', poster: 'https://via.placeholder.com/100' },
        { title: 'Movie 3', poster: 'https://via.placeholder.com/100' },
    ];

    const cinemas = [
        { name: 'Cinema 1', image: 'https://via.placeholder.com/50', hours: '9:00 AM - 10:00 PM' },
        { name: 'Cinema 2', image: 'https://via.placeholder.com/50', hours: '10:00 AM - 11:00 PM' },
        { name: 'Cinema 3', image: 'https://via.placeholder.com/50', hours: '11:00 AM - 12:00 AM' },
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Tìm Kiếm</Text>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Tìm kiếm phim, rạp..." />
                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Tìm</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.header}>Phim Đang Chiếu</Text>
            <ScrollView horizontal style={styles.moviesContainer}>
                {movies.map((movie, index) => (
                    <View key={index} style={styles.movieItem}>
                        <Image source={{ uri: movie.poster }} style={styles.moviePoster} />
                        <Text style={styles.movieTitle}>{movie.title}</Text>
                    </View>
                ))}
            </ScrollView>

            <Text style={styles.header}>Rạp Gần Bạn</Text>
            {cinemas.map((cinema, index) => (
                <View key={index} style={styles.cinemaItem}>
                    <Image source={{ uri: cinema.image }} style={styles.cinemaImage} />
                    <View style={styles.cinemaTextContainer}>
                        <Text style={styles.cinemaName}>{cinema.name}</Text>
                        <Text style={styles.cinemaHours}>{cinema.hours}</Text>
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
});

export default HomeScreen;
