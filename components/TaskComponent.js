import React from 'react';
import {
    View,
    Text,
    Pressable
} from 'react-native';

import { globalStyles } from '../styles/GlobalStyle';

export default function TaskComponent({
    id,
    title,
    dueDate,
    priority,
    completed,
    completeTask,
    deleteTask
}) {

    return (
        <View style={globalStyles.taskCard}>

            <View style={globalStyles.taskTopRow}>

                <Text style={globalStyles.taskTitle}>
                    {title}
                </Text>

                <View style={globalStyles.priorityBadge}>
                    <Text style={globalStyles.priorityText}>
                        {priority}
                    </Text>
                </View>

            </View>

            <Text style={globalStyles.dueDate}>
                Due {dueDate}
            </Text>

            {completed ? (

                <Text style={globalStyles.completedText}>
                    ✓ Completed
                </Text>

            ) : (

                <Pressable
                    style={globalStyles.doneButton}
                    onPress={() => completeTask(id)}
                >
                    <Text style={globalStyles.doneButtonText}>
                        Mark as Done
                    </Text>
                </Pressable>

            )}

            <Pressable
                style={globalStyles.deleteButton}
                onPress={() => deleteTask(id)}
            >
                <Text style={globalStyles.deleteButtonText}>
                    Delete
                </Text>
            </Pressable>

        </View>
    );
}