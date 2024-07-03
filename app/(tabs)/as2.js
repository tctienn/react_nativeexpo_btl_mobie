import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const SeatSelectionScreen = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Giả sử danh sách ghế có sẵn
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
                <View style={styles.seatMap}>
                    {seats.map((seat) => (
                        <TouchableOpacity
                            key={seat.id}
                            style={[
                                styles.seat,
                                seat.reserved ? styles.reservedSeat : selectedSeats.includes(seat) && styles.selectedSeat,
                            ]}
                            onPress={() => handleSeatSelection(seat)}
                            disabled={seat.reserved}
                        >
                            <Text style={styles.seatText}>{seat.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.bookingInfo}>
                <Text style={styles.bookingInfoText}>
                    Đã chọn as: {selectedSeats.map((seat) => seat.name).join(', ')}
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
    seatMap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    seat: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3498db',
        margin: 5,
        borderRadius: 5,
    },
    seatText: {
        color: '#fff',
        fontSize: 16,
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
});

export default SeatSelectionScreen;
