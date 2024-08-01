import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { get_getBookedByUser } from '@/api/dataApi';
import { getUser } from '@/api/Login';

// const user = {
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     password: 'password123',
//     img: 'https://via.placeholder.com/100',
// };

const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    img: 'https://via.placeholder.com/100',
})
const getUse = async () => {
    const response = await getUser()
    response = { ...response, img: 'https://via.placeholder.com/100', }
    setUser(response.data)
}
// const tickets = [
//     { id: '1', movie: 'Avengers: Endgame', date: '2024-07-12', time: '18:30' },
//     { id: '2', movie: 'Inception', date: '2024-07-15', time: '20:00' },
//     // Add more tickets if needed
// ];





const ProfileScreen = () => {
    const navigation = useNavigation();

    const [tickets, setTickets] = useState([])



    const getDataTickets = async () => {
        const user = await getUser()
        const response = await get_getBookedByUser(user.id)
        // console.log('test data', response.data[0].showtime?.threater.name)
        setTickets(response.data)
    }
    useEffect(() => {
        getUse()
        getDataTickets()
    }, [])

    const handleBackToHome = () => {
        navigation.navigate('Home');
    };




    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleBackToHome} style={styles.backButton}>
                <Text style={styles.backButtonText}>Trở về trang Home</Text>
            </TouchableOpacity>
            <Image source={{ uri: user.img }} style={styles.profileImage} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>

            <Text style={styles.sectionTitle}>Vé đã đặt</Text>
            <FlatList
                data={tickets}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.ticketItem}>
                        <Text style={styles.ticketText}>Phim: {item?.showtime?.movie.title}</Text>
                        <Text onPress={() => alert(item?.showtime?.threater.name)} style={styles.ticketText}>thời gian: {item?.showtime?.time}</Text>
                        <Text style={styles.ticketText}>Rạp : {item?.showtime?.threater.name}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    email: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ticketItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    ticketText: {
        fontSize: 16,
    },
});

export default ProfileScreen;
