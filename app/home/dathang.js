import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const movieData = [
    {
        id: 1,
        title: 'Avengers: Endgame',
        time: '18:00',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        title: 'Spider-Man: Far From Home',
        time: '20:30',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 3,
        title: 'Black Panther',
        time: '22:00',
        image: 'https://via.placeholder.com/150',
    },
];

const BookingScreen = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleSelectMovie = (movie) => {
        setSelectedMovie(movie);
    };

    const handleBookTicket = () => {
        if (selectedMovie) {
            // Thực hiện đặt vé ở đây, ví dụ như mở màn hình đặt vé
            alert(`Đã đặt vé cho phim: ${selectedMovie.title}`);
        } else {
            alert('Vui lòng chọn phim và suất chiếu trước khi đặt vé.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Chọn phim và suất chiếu:</Text>
            {movieData.map((movie) => (
                <TouchableOpacity
                    key={movie.id}
                    style={styles.movieItem}
                    onPress={() => handleSelectMovie(movie)}
                    activeOpacity={0.8}
                >
                    <Image source={{ uri: movie.image }} style={styles.movieImage} />
                    <View style={styles.movieInfo}>
                        <Text style={styles.movieTitle}>{movie.title}</Text>
                        <Text style={styles.movieTime}>{movie.time}</Text>
                    </View>
                </TouchableOpacity>
            ))}
            {selectedMovie && (
                <View style={styles.selectedMovie}>
                    <Text style={styles.selectedMovieText}>
                        Đã chọn: {selectedMovie.title} - Suất chiếu {selectedMovie.time}
                    </Text>
                    <TouchableOpacity style={styles.bookButton} onPress={handleBookTicket}>
                        <Text style={styles.bookButtonText}>Đặt vé</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    movieItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
    },
    movieImage: {
        width: 80,
        height: 120,
        borderRadius: 10,
        marginRight: 10,
    },
    movieInfo: {
        flex: 1,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    movieTime: {
        fontSize: 16,
        color: 'gray',
    },
    selectedMovie: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    selectedMovieText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bookButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BookingScreen;
