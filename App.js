import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FitnessProvider } from './src/context/FitnessContext';
import DashboardScreen from './src/screens/DashboardScreen';
import WorkoutScreen from './src/screens/WorkoutScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

function TabIcon({ focused, label }) {
  return <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.5 }}>{label}</Text>;
}

export default function App() {
  return (
    <FitnessProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: '#0a0a0a', borderTopColor: '#222', height: 70, paddingBottom: 10 },
            tabBarActiveTintColor: '#22c55e',
            tabBarInactiveTintColor: '#666',
          }}
        >
          <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarIcon: (p) => <TabIcon {...p} label="🏠" /> }} />
          <Tab.Screen name="Workout" component={WorkoutScreen} options={{ tabBarIcon: (p) => <TabIcon {...p} label="💪" /> }} />
          <Tab.Screen name="History" component={HistoryScreen} options={{ tabBarIcon: (p) => <TabIcon {...p} label="📊" /> }} />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: (p) => <TabIcon {...p} label="👤" /> }} />
        </Tab.Navigator>
      </NavigationContainer>
    </FitnessProvider>
  );
}
