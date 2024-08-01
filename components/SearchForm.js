import { find_movie_byTitle, find_threater_byName, get_threater } from '@/api/dataApi';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';

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



const SearchForm = ({ route }) => {
    const { searchText } = route.params
    const [searchQuery, setSearchQuery] = useState()
    // const { searchText } = route.params
    // const { searchText } = route.params;
    console.log("search", searchText)
    const [dataThreates, setDataThreates] = useState([])
    const [dataMovies, setDataMovies] = useState([])
    const getDataThreater = async (text) => {
        if (searchText.trim() == '') {
            return
        }
        const restpont = await find_threater_byName(text);
        setDataThreates(restpont.data)
    }

    const getDataMovies = async (text) => {
        if (searchText.trim() == '') {
            return
        }
        const restpont = await find_movie_byTitle(text);
        setDataMovies(restpont.data)
    }

    useEffect(() => {
        getDataThreater(searchText)
        getDataMovies(searchText)
    }, [])

    const onpressSearch = () => {
        getDataThreater(searchQuery)
        getDataMovies(searchQuery)
    }

    const navigation = useNavigation();
    const onClickThreater = (idThreater) => {
        navigation.navigate('TheaterDetailScreen', { idTheater: idThreater });
    }
    const onClickDetailMovie = (movieId, theaterId) => {

        get_threater(theaterId).then((data) => navigation.navigate('MovieDetailScreen', { movieId: movieId, theater: data.data }))

    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm phim, rạp..."
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
                    <TouchableOpacity onPress={() => alert(item.title)} activeOpacity={0.8}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                    </TouchableOpacity>
                    <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>{item.name}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                        <TouchableOpacity style={styles.addButton} onPress={() => onClickThreater(item.id)}>
                            <Text style={styles.addButtonText}>Chi tiết</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            <Text></Text>
            <View style={styles.line} />
            <Text></Text>
            <Text>
                Danh sách phim tìm thấy
            </Text>
            {dataMovies?.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                    <TouchableOpacity onPress={() => alert(item.title)} activeOpacity={0.8}>
                        <Image source={{ uri: item.poster }} style={styles.itemImage} />
                    </TouchableOpacity>
                    <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                        <TouchableOpacity style={styles.addButton} onPress={() => onClickDetailMovie(item.id, item.threaterr)}>
                            <Text style={styles.addButtonText}>Chi tiết</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
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

export default SearchForm;
