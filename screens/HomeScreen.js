import React from 'react';
import {
    View,
    Text,
    Pressable
} from 'react-native';

import { globalStyles } from '../styles/GlobalStyle';

export default function HomeScreen({
    navigation,
    tasks
}) {

    const activeTasks = tasks.filter(
        (task) => !task.completed
    ).length;

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    return (
        <View style={globalStyles.homeContainer}>

            <Text style={globalStyles.smallHeading}>
                STUDENT PLANNER
            </Text>

            <Text style={globalStyles.title}>
                Plan less. Do more.
            </Text>

            <Text style={globalStyles.subtitle}>
                Keep your deadlines, priorities and study tasks in one place.
            </Text>

            <View style={globalStyles.statsContainer}>

                <View style={globalStyles.statCard}>

                    <Text style={globalStyles.statNumber}>
                        {activeTasks}
                    </Text>

                    <Text style={globalStyles.statLabel}>
                        Active tasks
                    </Text>

                </View>

                <View style={globalStyles.statCard}>

                    <Text style={globalStyles.statNumber}>
                        {completedTasks}
                    </Text>

                    <Text style={globalStyles.statLabel}>
                        Completed
                    </Text>

                </View>

            </View>

            <Pressable
                style={globalStyles.button}
                onPress={() => navigation.navigate('Tasks')}
            >
                <Text style={globalStyles.buttonText}>
                    View My Tasks
                </Text>
            </Pressable>

            <Pressable
                style={globalStyles.secondaryButton}
                onPress={() => navigation.navigate('Add')}
            >
                <Text style={globalStyles.buttonText}>
                    + Create New Task
                </Text>
            </Pressable>

        </View>
    );
}