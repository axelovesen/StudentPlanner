import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    Alert,
    Platform
} from 'react-native';

import { globalStyles } from '../styles/GlobalStyle';
import { parseDate } from '../utils/dateUtils';

// Alert.alert vises ikke på web, så der bruker vi window.alert
const showMessage = (title, message) => {

    if (Platform.OS === 'web') {
        window.alert(`${title}\n${message}`);
    } else {
        Alert.alert(title, message);
    }
};

export default function AddTaskScreen({
    navigation,
    addTask
}) {

    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');

    const saveTask = () => {

        if (title.trim() === '' || dueDate.trim() === '') {

            showMessage(
                'Missing information',
                'Please fill in both fields.'
            );

            return;
        }

        // Fristen lagres som en ekte dato så den kan sorteres og vises i kalenderen
        const dateKey = parseDate(dueDate);

        if (dateKey === null) {

            showMessage(
                'Invalid date',
                'Write the date as DD.MM.YYYY, e.g. 25.10.2026.'
            );

            return;
        }

        addTask(title.trim(), dateKey, priority);

        // Tømmer skjemaet så det er klart for neste oppgave
        setTitle('');
        setDueDate('');
        setPriority('Medium');

        navigation.navigate('Tasks');
    };

    return (
        <View style={globalStyles.container}>

            <Text style={globalStyles.smallHeading}>
                Plan your studies
            </Text>

            <Text style={globalStyles.title}>
                Create a task
            </Text>

            <Text style={globalStyles.subtitle}>
                Add your next assignment, exam or study session.
            </Text>

            <Text style={globalStyles.label}>
                Task name
            </Text>

            <TextInput
                style={globalStyles.input}
                placeholder="e.g. Study for genetics"
                value={title}
                onChangeText={setTitle}
            />

            <Text style={globalStyles.label}>
                Due date
            </Text>

            <TextInput
                style={globalStyles.input}
                placeholder="DD.MM.YYYY, e.g. 25.10.2026"
                value={dueDate}
                onChangeText={setDueDate}
            />

            <Text style={globalStyles.label}>
                Priority
            </Text>

            <View style={globalStyles.priorityContainer}>

                <Pressable
                    style={
                        priority === 'Low'
                            ? globalStyles.priorityButtonSelected
                            : globalStyles.priorityButton
                    }
                    onPress={() => setPriority('Low')}
                >
                    <Text style={globalStyles.priorityButtonText}>
                        Low
                    </Text>
                </Pressable>

                <Pressable
                    style={
                        priority === 'Medium'
                            ? globalStyles.priorityButtonSelected
                            : globalStyles.priorityButton
                    }
                    onPress={() => setPriority('Medium')}
                >
                    <Text style={globalStyles.priorityButtonText}>
                        Medium
                    </Text>
                </Pressable>

                <Pressable
                    style={
                        priority === 'High'
                            ? globalStyles.priorityButtonSelected
                            : globalStyles.priorityButton
                    }
                    onPress={() => setPriority('High')}
                >
                    <Text style={globalStyles.priorityButtonText}>
                        High
                    </Text>
                </Pressable>

            </View>

            <Pressable
                style={globalStyles.button}
                onPress={saveTask}
            >
                <Text style={globalStyles.buttonText}>
                    Add Task
                </Text>
            </Pressable>

        </View>
    );
}