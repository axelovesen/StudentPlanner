import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import TaskListScreen from './screens/TaskListScreen';
import AddTaskScreen from './screens/AddTaskScreen';

const Tab = createBottomTabNavigator();

export default function App() {

    const [tasks, setTasks] = useState([
        {
            id: '1',
            title: 'Finish programming assignment',
            dueDate: '21 September',
            priority: 'High',
            completed: false
        },
        {
            id: '2',
            title: 'Study physiology',
            dueDate: '23 September',
            priority: 'Medium',
            completed: false
        },
        {
            id: '3',
            title: 'Prepare genetics seminar',
            dueDate: '25 September',
            priority: 'Low',
            completed: false
        }
    ]);

    const addTask = (title, dueDate, priority) => {

        const newTask = {
            id: Date.now().toString(),
            title: title,
            dueDate: dueDate,
            priority: priority,
            completed: false
        };

        setTasks([...tasks, newTask]);
    };

    const completeTask = (id) => {

        const updatedTasks = tasks.map((task) => {

            if (task.id === id) {
                return {
                    ...task,
                    completed: true
                };
            }

            return task;
        });

        setTasks(updatedTasks);
    };

    const deleteTask = (id) => {

        const updatedTasks = tasks.filter(
            (task) => task.id !== id
        );

        setTasks(updatedTasks);
    };

    return (
        <NavigationContainer>

            <Tab.Navigator
                screenOptions={({ route }) => ({

                    headerStyle: {
                        backgroundColor: '#ffffff'
                    },

                    headerTitleStyle: {
                        fontWeight: '600'
                    },

                    headerShadowVisible: false,

                    tabBarActiveTintColor: '#3867d6',
                    tabBarInactiveTintColor: '#8a94a6',

                    tabBarStyle: {
                        height: 70,
                        paddingTop: 7,
                        paddingBottom: 8,
                        backgroundColor: '#ffffff'
                    },

                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: '600'
                    },

                    tabBarIcon: ({ color, size }) => {

                        let iconName;

                        if (route.name === 'Home') {
                            iconName = 'home-outline';
                        }

                        if (route.name === 'Tasks') {
                            iconName = 'checkmark-circle-outline';
                        }

                        if (route.name === 'Add') {
                            iconName = 'add-circle-outline';
                        }

                        return (
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    }
                })}
            >

                <Tab.Screen
                    name="Home"
                    options={{
                        title: 'Student Planner'
                    }}
                >
                    {(props) => (
                        <HomeScreen
                            {...props}
                            tasks={tasks}
                        />
                    )}
                </Tab.Screen>

                <Tab.Screen
                    name="Tasks"
                    options={{
                        title: 'My Tasks'
                    }}
                >
                    {(props) => (
                        <TaskListScreen
                            {...props}
                            tasks={tasks}
                            completeTask={completeTask}
                            deleteTask={deleteTask}
                        />
                    )}
                </Tab.Screen>

                <Tab.Screen
                    name="Add"
                    options={{
                        title: 'New Task'
                    }}
                >
                    {(props) => (
                        <AddTaskScreen
                            {...props}
                            addTask={addTask}
                        />
                    )}
                </Tab.Screen>

            </Tab.Navigator>

        </NavigationContainer>
    );
}