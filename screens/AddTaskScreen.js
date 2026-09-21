import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    Alert
} from 'react-native';

import { globalStyles } from '../styles/GlobalStyle';

export default function AddTaskScreen({
    navigation,
    addTask
}) {

    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');

    const saveTask = () => {

        if (title === '' || dueDate === '') {

            Alert.alert(
                'Missing information',
                'Please fill in both fields.'
            );

            return;
        }

        addTask(title, dueDate, priority);

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
                placeholder="e.g. 25 September"
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