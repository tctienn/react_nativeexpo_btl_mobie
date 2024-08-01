import { get_movie, get_seatMapBooked, get_seatMaps, get_threater, post_booking } from '@/api/dataApi';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getUser } from '@/api/Login'
const SeatSelectionScreen = ({ route }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);


    const [dataMovie, setDataMovie] = useState({})
    // Giả sử danh sách ghế có sẵn, mở rộng số lượng ghế và bỏ thông tin giá vé
    // const seats = [
    //     { id: 1, name: 'A1s', booked: false },
    //     { id: 2, name: 'A2', booked: true },
    //     { id: 3, name: 'A3', booked: false },
    //     { id: 4, name: 'A4', booked: false },
    //     { id: 5, name: 'B1', booked: false },
    //     { id: 6, name: 'B2', booked: false },
    //     { id: 7, name: 'B3', booked: false },
    //     { id: 8, name: 'B4', booked: false },
    //     { id: 9, name: 'C1', booked: false },
    //     { id: 10, name: 'C2', booked: false },
    //     { id: 11, name: 'C3', booked: false },
    //     { id: 12, name: 'C4', booked: false },
    //     { id: 13, name: 'D1', booked: false },
    //     { id: 14, name: 'D2', booked: false },
    //     { id: 15, name: 'D3', booked: false },
    //     { id: 16, name: 'D4', booked: false },

    //     // Thêm các ghế khác tùy ý
    // ];

    const [seatMap, setSeatMap] = useState([])
    const { idMovie, idThreater } = route.params
    const [user, setUser] = useState({})
    const [dataThreates, setDataThreates] = useState({})
    const getSeatMap = async () => {
        const usesesion = await getUser()

        setUser(usesesion)
        const resstpont = await get_seatMaps(idThreater);
        const resstpont2 = await get_seatMapBooked(idMovie, idThreater)
        console.log('idmovie id threater', resstpont2.data)
        const seat = resstpont.data.map(e => resstpont2.data.find(e2 => e.id === e2.seat.id) ? { ...e, row: (resstpont2.data.find(de => de.user.id == usesesion.id && e.id == de.seat.id)?.user.name), booked: true } : { ...e, booked: false })
        setSeatMap(seat)
        const restpontMovie = await get_movie(idMovie, idThreater)
        setDataMovie(restpontMovie.data)
        const restpontThreater = await get_threater(idThreater)
        setDataThreates(restpontThreater.data)



    }

    useEffect(() => {
        getSeatMap()
    }, [])





    // Xử lý khi chọn ghế
    const handleSeatSelection = (seat) => {
        const isSelected = selectedSeats.find((selectedSeat) => selectedSeat.id === seat.id);
        if (isSelected) {
            setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat.id !== seat.id));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const onPressBooking = async () => {
        try {

            // Tạo một mảng các Promise từ post_booking
            const bookingPromises = selectedSeats.map(e =>
                post_booking(user.id, idThreater, e.id, idMovie)
            );

            // Chờ tất cả các Promise hoàn thành
            await Promise.all(bookingPromises);

            // Sau khi tất cả các đặt chỗ đã được hoàn thành, gọi getSeatMap
            await getSeatMap();
            alert("Đặt vé thành công")
        } catch (error) {
            console.error("Error during booking:", error);
            // Xử lý lỗi nếu có (có thể thông báo cho người dùng)
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.movieInfo}>
                    <Image source={{ uri: dataMovie.poster }} style={styles.movieImage} />
                    <View style={styles.movieDetails}>
                        <Text style={styles.movieName}>{dataMovie.title}</Text>
                        <Text style={styles.cinemaDetails}>Rạp: {dataThreates.name} </Text>
                        <Text style={styles.showtime}>Thời gian chiếu: {dataMovie.showTime}</Text>
                    </View>
                </View>
                <Text style={styles.exitDescription}>
                    khu vực màn hình
                </Text>
                <View style={styles.seatMap}>
                    {seatMap.map((seat) => (
                        <TouchableOpacity
                            key={seat.id}
                            style={[
                                styles.seat,
                                seat.booked ? styles.reservedSeat : selectedSeats.find((s) => s.id === seat.id) && styles.selectedSeat,
                            ]}
                            onPress={() => handleSeatSelection(seat)}
                            disabled={seat.booked}
                        >
                            <Text style={styles.seatText}>{seat.row}</Text>
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
                    Đã chọn: {selectedSeats.map((seat) => seat.row + seat.id).join(', ')}
                </Text>
                <TouchableOpacity style={styles.bookButton} onPress={() => onPressBooking()}>
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



// lọ dữ liệu booked
// data= [{id:1,name:'a1'},{id:2,name:'a2'},{id:3,name:'a3'}]
// check = [{id:1}, {id:2}]
// newdata  = data.map(e=> check.find(ee=>ee.id == e.id)?{...e,booked:'true'}: {...e,booked:'false'})

// console.log("data", newdata)