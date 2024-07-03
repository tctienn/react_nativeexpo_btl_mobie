import React from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const data = [
    {
        image: 'https://via.placeholder.com/150',
        title: 'Item 1',
        description: 'Description 1 is a long description that wraps onto the next line.',
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
                <View key={index}>
                    <TouchableOpacity onPress={() => alert(item.title)} activeOpacity={0.8}>
                        <Image source={{ uri: item.image }} style={styles.smallImage} />
                    </TouchableOpacity>
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                        <TouchableOpacity style={styles.addButton} onPress={() => alert('Item added')}>
                            <Text style={styles.addButtonText}>Thêm</Text>
                        </TouchableOpacity>
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
    smallImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    itemContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    itemImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    itemContent: {
        paddingHorizontal: 10,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemDescription: {
        fontSize: 14,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#007bff',
        padding: 8,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default as;
