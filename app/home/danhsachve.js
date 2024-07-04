import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const BookingHistoryScreen = () => {
    const bookings = [
        {
            id: 1,
            movie: 'Movie 1',
            cinema: 'Cinema 1',
            showtime: '6:00 PM',
            bookingTime: '2024-07-01 4:00 PM',
        },
        {
            id: 2,
            movie: 'Movie 2',
            cinema: 'Cinema 2',
            showtime: '8:00 PM',
            bookingTime: '2024-07-02 5:00 PM',
        },
        {
            id: 3,
            movie: 'Movie 3',
            cinema: 'Cinema 3',
            showtime: '10:00 PM',
            bookingTime: '2024-07-03 6:00 PM',
        },
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Danh Sách Vé Đã Đặt</Text>
            {bookings.map((booking) => (
                <View key={booking.id} style={styles.bookingItem}>
                    <Text style={styles.movieTitle}>{booking.movie}</Text>
                    <Text style={styles.cinemaName}>{booking.cinema}</Text>
                    <Text style={styles.showtime}>Suất chiếu: {booking.showtime}</Text>
                    <Text style={styles.bookingTime}>Đặt lúc: {booking.bookingTime}</Text>
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
    bookingItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginVertical: 5,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cinemaName: {
        fontSize: 16,
        color: 'gray',
    },
    showtime: {
        fontSize: 16,
    },
    bookingTime: {
        fontSize: 16,
        color: 'gray',
    },
});

export default BookingHistoryScreen;
