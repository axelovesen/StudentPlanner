import React from 'react';
import {
    View,
    Text,
    Pressable
} from 'react-native';

import { globalStyles, priorityColors } from '../styles/GlobalStyle';
import { formatDate, daysUntil } from '../utils/dateUtils';

export default function TaskComponent({
    id,
    title,
    dueDate,
    priority,
    completed,
    completeTask,
    deleteTask
}) {

    // Hvor mange dager det er igjen til fristen
    const daysLeft = daysUntil(dueDate);

    let daysText = `${daysLeft} days left`;

    if (daysLeft === 0) {
        daysText = 'Due today';
    } else if (daysLeft === 1) {
        daysText = '1 day left';
    } else if (daysLeft < 0) {
        daysText = 'Overdue';
    }

    // Hver prioritet har sin egen farge
    const colors = priorityColors[priority] || priorityColors.Medium;

    return (
        <View
            style={[
                globalStyles.taskCard,
                { borderLeftWidth: 5, borderLeftColor: colors.text }
            ]}
        >

            <View style={globalStyles.taskTopRow}>

                <Text style={globalStyles.taskTitle}>
                    {title}
                </Text>

                <View
                    style={[
                        globalStyles.priorityBadge,
                        { backgroundColor: colors.background }
                    ]}
                >
                    <Text
                        style={[
                            globalStyles.priorityText,
                            { color: colors.text }
                        ]}
                    >
                        {priority}
                    </Text>
                </View>

            </View>

            <Text style={globalStyles.dueDate}>
                Due {formatDate(dueDate)}
                {!completed && (
                    <Text
                        style={
                            daysLeft < 0
                                ? globalStyles.overdueText
                                : globalStyles.daysLeftText
                        }
                    >
                        {'  ·  '}{daysText}
                    </Text>
                )}
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