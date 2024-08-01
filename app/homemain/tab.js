import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import Home from './home';
import Theater from './Theater'
import Movie from './Movie'
import Profile from '@/components/Profile'
import Blog from './Blog'

// import datcho from './datcho';
const Tab = createBottomTabNavigator();

export default function TabLayout() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Theater"
                component={Theater}
                options={{
                    tabBarLabel: 'Theater',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="building" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Movie"
                component={Movie}
                options={{
                    tabBarLabel: 'Movie',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="film" size={size} color={color} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="Blog"
                component={Blog}
                options={{
                    tabBarLabel: 'Blog',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user-circle" size={size} color={color} />
                    ),
                }}
            /> */}
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user-circle" size={size} color={color} />
                    ),
                }}
            />


        </Tab.Navigator>
    );
}
