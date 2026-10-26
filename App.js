import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import TaskListScreen from './screens/TaskListScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import CalendarScreen from './screens/CalendarScreen';
import StudyPlanScreen from './screens/StudyPlanScreen';

const Tab = createBottomTabNavigator();

// Nøkkelen oppgavene lagres under i AsyncStorage
const STORAGE_KEY = 'studentplanner_tasks';

export default function App() {

    const [tasks, setTasks] = useState([
        {
            id: '1',
            title: 'Finish programming assignment',
            dueDate: '2026-10-21',
            priority: 'High',
            completed: false
        },
        {
            id: '2',
            title: 'Study physiology',
            dueDate: '2026-10-23',
            priority: 'Medium',
            completed: false
        },
        {
            id: '3',
            title: 'Prepare genetics seminar',
            dueDate: '2026-10-25',
            priority: 'Low',
            completed: false
        }
    ]);

    // Blir true når lagrede oppgaver er hentet, så vi ikke overskriver dem med eksempeldataene
    const [loaded, setLoaded] = useState(false);

    // Henter lagrede oppgaver når appen starter
    useEffect(() => {

        const loadTasks = async () => {

            try {
                const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);

                if (savedTasks !== null) {
                    setTasks(JSON.parse(savedTasks));
                }
            } catch (error) {
                console.log('Could not load tasks', error);
            }

            setLoaded(true);
        };

        loadTasks();
    }, []);

    // Lagrer oppgavene hver gang listen endres
    useEffect(() => {

        if (!loaded) {
            return;
        }

        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch((error) => {
            console.log('Could not save tasks', error);
        });
    }, [tasks, loaded]);

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

                        if (route.name === 'Calendar') {
                            iconName = 'calendar-outline';
                        }

                        if (route.name === 'Plan') {
                            iconName = 'sparkles-outline';
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
                    name="Calendar"
                    options={{
                        title: 'Calendar'
                    }}
                >
                    {(props) => (
                        <CalendarScreen
                            {...props}
                            tasks={tasks}
                            completeTask={completeTask}
                            deleteTask={deleteTask}
                        />
                    )}
                </Tab.Screen>

                <Tab.Screen
                    name="Plan"
                    options={{
                        title: 'Study Plan'
                    }}
                >
                    {(props) => (
                        <StudyPlanScreen
                            {...props}
                            tasks={tasks}
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