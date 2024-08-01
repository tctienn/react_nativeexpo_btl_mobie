import { find_movie_byTitle, find_threater_byName, get_ds_rap } from '@/api/dataApi';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';





const ThreaTer = () => {

    const [searchQuery, setSearchQuery] = useState('')
    const [dataThreates, setDataThreates] = useState([])
    const FindDataThreater = async (text) => {
        if (text.trim() == '') {
            return
        }
        const restpont = await find_threater_byName(text);
        setDataThreates(restpont.data)
    }
    const getDataThreater = async (text) => {

        const restpont = await get_ds_rap();
        setDataThreates(restpont.data)
    }



    useEffect(() => {
        getDataThreater()

    }, [])

    const onpressSearch = () => {
        FindDataThreater(searchQuery)

    }

    const navigation = useNavigation();
    const onClickThreater = (idThreater) => {
        navigation.navigate('TheaterDetailScreen', { idTheater: idThreater });
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm  rạp..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchButton} onPress={() => onpressSearch()}>
                    <Text style={styles.searchButtonText}>Tìm  </Text>
                </TouchableOpacity>
            </View>
            <Text>
                Danh sách rạp tìm thấy
            </Text>
            {dataThreates?.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                    <TouchableOpacity onPress={() => onClickThreater(item.id)} activeOpacity={0.8}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                    </TouchableOpacity>
                    <View style={styles.itemContent}>
                        <Text style={styles.itemTitle} onPress={() => onClickThreater(item.id)}>{item.name}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                        <TouchableOpacity style={styles.addButton} onPress={() => onClickThreater(item.id)}>
                            <Text style={styles.addButtonText}>cshi tiết</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            <Text></Text>
            <View style={styles.line} />
            <Text></Text>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row', // Items aligned horizontally
        alignItems: 'center', // Items centered vertically
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 10,
    },
    itemContent: {
        flex: 1,
        padding: 10,
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
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: 'rgb(213, 213, 213)', // Màu sắc của dòng kẻ 
        marginVertical: 2, // Khoảng cách trên và dưới dòng kẻ
    },
});

export default ThreaTer;
