import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SeatSelectionScreen = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Giả sử thông tin về suất chiếu
    const movieInfo = {
        movieName: 'Avengers: Endgame',
        cinemaName: 'Cineplex',
        theaterRoom: 'Room 1',
        showtime: '2024-07-04T15:00:00', // Định dạng thời gian ISO
        movieImage: 'https://example.com/movie-poster.jpg', // Link hình ảnh của phim
    };

    // Giả sử danh sách ghế có sẵn, mở rộng số lượng ghế và bỏ thông tin giá vé
    const seats = [
        { id: 1, name: 'A1', reserved: false },
        { id: 2, name: 'A2', reserved: true },
        { id: 3, name: 'A3', reserved: false },
        { id: 4, name: 'A4', reserved: false },
        { id: 5, name: 'B1', reserved: false },
        { id: 6, name: 'B2', reserved: false },
        { id: 7, name: 'B3', reserved: false },
        { id: 8, name: 'B4', reserved: false },
        { id: 9, name: 'C1', reserved: false },
        { id: 10, name: 'C2', reserved: false },
        { id: 11, name: 'C3', reserved: false },
        { id: 12, name: 'C4', reserved: false },
        { id: 13, name: 'D1', reserved: false },
        { id: 14, name: 'D2', reserved: false },
        { id: 15, name: 'D3', reserved: false },
        { id: 16, name: 'D4', reserved: false },

        // Thêm các ghế khác tùy ý
    ];

    // Xử lý khi chọn ghế
    const handleSeatSelection = (seat) => {
        const isSelected = selectedSeats.find((selectedSeat) => selectedSeat.id === seat.id);
        if (isSelected) {
            setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat.id !== seat.id));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.movieInfo}>
                    <Image source={{ uri: movieInfo.movieImage }} style={styles.movieImage} />
                    <View style={styles.movieDetails}>
                        <Text style={styles.movieName}>{movieInfo.movieName}</Text>
                        <Text style={styles.cinemaDetails}>{movieInfo.cinemaName} - {movieInfo.theaterRoom}</Text>
                        <Text style={styles.showtime}>Thời gian chiếu: {movieInfo.showtime}</Text>
                    </View>
                </View>
                <Text style={styles.exitDescription}>
                    khu vực màn hình
                </Text>
                <View style={styles.seatMap}>
                    {seats.map((seat) => (
                        <TouchableOpacity
                            key={seat.id}
                            style={[
                                styles.seat,
                                seat.reserved ? styles.reservedSeat : selectedSeats.find((s) => s.id === seat.id) && styles.selectedSeat,
                            ]}
                            onPress={() => handleSeatSelection(seat)}
                            disabled={seat.reserved}
                        >
                            <Text style={styles.seatText}>{seat.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.exitDescription}>
                    khu vực lối ra
                </Text>
                <View style={styles.description}>
                    <Text style={styles.descriptionText}>Màu sắc ghế:</Text>
                    <View style={styles.colorLegend}>
                        <View style={[styles.legendBox, { backgroundColor: '#3498db' }]} />
                        <Text style={styles.legendText}>Ghế trống</Text>
                    </View>
                    <View style={styles.colorLegend}>
                        <View style={[styles.legendBox, { backgroundColor: '#ccc' }]} />
                        <Text style={styles.legendText}>Ghế đã đặt</Text>
                    </View>
                    <View style={styles.colorLegend}>
                        <View style={[styles.legendBox, { backgroundColor: '#e74c3c' }]} />
                        <Text style={styles.legendText}>Ghế đã chọn</Text>
                    </View>

                </View>
            </ScrollView>
            <View style={styles.bookingInfo}>
                <Text style={styles.bookingInfoText}>
                    Đã chọn: {selectedSeats.map((seat) => seat.name).join(', ')}
                </Text>
                <TouchableOpacity style={styles.bookButton} onPress={() => alert('Đặt vé')}>
                    <Text style={styles.bookButtonText}>Đặt vé</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    movieInfo: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    movieImage: {
        width: 100,
        height: 150,
        borderRadius: 5,
    },
    movieDetails: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    movieName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cinemaDetails: {
        fontSize: 16,
    },
    showtime: {
        fontSize: 16,
    },
    seatMap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    seat: {
        width: 35, // Kích thước ghế nhỏ gấp đôi
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3498db',
        margin: 3, // Khoảng cách giữa các ghế
        borderRadius: 3,
    },
    seatText: {
        color: '#fff',
        fontSize: 14,
    },
    reservedSeat: {
        backgroundColor: '#ccc',
    },
    selectedSeat: {
        backgroundColor: '#e74c3c',
    },
    bookingInfo: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 10,
        alignItems: 'center',
    },
    bookingInfoText: {
        fontSize: 18,
        marginBottom: 10,
    },
    bookButton: {
        backgroundColor: '#27ae60',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    descriptionText: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    colorLegend: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    legendBox: {
        width: 20,
        height: 20,
        borderRadius: 3,
        marginRight: 10,
    },
    legendText: {
        fontSize: 14,
    },
    exitDescription: {
        marginTop: 10,
        fontSize: 14,
        fontStyle: 'italic',
    },
});

export default SeatSelectionScreen;
