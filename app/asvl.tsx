import React from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, Dimensions, Button } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const data = [
    {
        image: 'https://via.placeholder.com/150',
        title: 'Item 1',
        description: 'Description 1',
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Item 2',
        description: 'Description 2',
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Item 3',
        description: 'Description 3',
    },
];



const as = () => {
    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Tìm kiếm..."
            />
            <Image
                source={{ uri: 'https://via.placeholder.com/300' }}
                style={styles.largeImage}
            />
            {data.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <Button title="Thêm" onPress={() => alert('Item added')} />
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 20,
    },
    largeImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 250,
        padding: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    itemImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemDescription: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
});

export default as;
