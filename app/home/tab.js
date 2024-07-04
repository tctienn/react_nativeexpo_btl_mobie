import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import Tab1Screen from './index';
import Tab2Screen from './Demo2';
import Tab3Screen from './dathang';
import Tab4Screen from './home';
import datcho from './datcho';
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
                name="datcho"
                component={datcho}
                options={{
                    tabBarLabel: 'datcho',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tab1"
                component={Tab1Screen}
                options={{
                    tabBarLabel: 'Tab 1',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tab2"
                component={Tab2Screen}
                options={{
                    tabBarLabel: 'Tab 2',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tab3"
                component={Tab3Screen}
                options={{
                    tabBarLabel: 'Tab 3',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tab4"
                component={Tab4Screen}
                options={{
                    tabBarLabel: 'Tab 4',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
