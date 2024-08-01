import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const blogs = [
    {
        id: 1,
        title: 'Blog Title 1',
        description: 'This is a brief description of the first blog.',
        imageUrl: 'https://example.com/image1.jpg',
    },
    {
        id: 2,
        title: 'Blog Title 2',
        description: 'This is a brief description of the second blog.',
        imageUrl: 'https://example.com/image2.jpg',
    },
    // Add more blog items here
];

export default function BlogList() {
    return (
        <ScrollView style={styles.container}>
            {blogs.map(blog => (
                <View key={blog.id} style={styles.card}>
                    <Image source={{ uri: blog.imageUrl }} style={styles.image} />
                    <View style={styles.content}>
                        <Text style={styles.title}>{blog.title}</Text>
                        <Text style={styles.description}>{blog.description}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    card: {
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 1, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: 200,
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});
