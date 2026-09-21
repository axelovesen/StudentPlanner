import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Pressable
} from 'react-native';

import TaskComponent from '../components/TaskComponent';
import { globalStyles } from '../styles/GlobalStyle';

export default function TaskListScreen({
    navigation,
    tasks,
    completeTask,
    deleteTask
}) {

    const [filter, setFilter] = useState('All');

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const progress =
        tasks.length === 0
            ? 0
            : (completedTasks / tasks.length) * 100;

    const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3
};

const filteredTasks = tasks
    .filter((task) => {
        if (filter === 'Active') {
            return !task.completed;
        }

        if (filter === 'Completed') {
            return task.completed;
        }

        return true;
    })
    .sort((a, b) => {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    const Header = () => (
        <View>

            <Text style={globalStyles.smallHeading}>
                YOUR STUDIES
            </Text>

            <Text style={globalStyles.title}>
                Stay on track.
            </Text>

            <View style={globalStyles.progressCard}>

                <Text style={globalStyles.progressTitle}>
                    Weekly progress
                </Text>

                <Text style={globalStyles.progressText}>
                    {completedTasks} of {tasks.length} tasks completed
                </Text>

                <View style={globalStyles.progressBackground}>

                    <View
                        style={[
                            globalStyles.progressBar,
                            { width: `${progress}%` }
                        ]}
                    />

                </View>

            </View>

            <View style={globalStyles.filterContainer}>

                {['All', 'Active', 'Completed'].map((item) => (

                    <Pressable
                        key={item}
                        style={
                            filter === item
                                ? globalStyles.filterButtonSelected
                                : globalStyles.filterButton
                        }
                        onPress={() => setFilter(item)}
                    >

                        <Text
                            style={
                                filter === item
                                    ? globalStyles.filterTextSelected
                                    : globalStyles.filterText
                            }
                        >
                            {item}
                        </Text>

                    </Pressable>

                ))}

            </View>

        </View>
    );

    const Footer = () => (
        <Pressable
            style={[
                globalStyles.button,
                {
                    marginTop: 10,
                    marginBottom: 40
                }
            ]}
            onPress={() => navigation.navigate('Add')}
        >
            <Text style={globalStyles.buttonText}>
                + Add New Task
            </Text>
        </Pressable>
    );

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#f4f6f8'
            }}
        >

            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}

                style={{
                    flex: 1
                }}

                contentContainerStyle={{
                    padding: 20,
                    paddingBottom: 40
                }}

                ListHeaderComponent={Header}

                ListFooterComponent={Footer}

                ListEmptyComponent={
                    <Text style={globalStyles.emptyText}>
                        No tasks here yet.
                    </Text>
                }

                renderItem={({ item }) => (

                    <TaskComponent
                        id={item.id}
                        title={item.title}
                        dueDate={item.dueDate}
                        priority={item.priority}
                        completed={item.completed}
                        completeTask={completeTask}
                        deleteTask={deleteTask}
                    />

                )}

                showsVerticalScrollIndicator={true}

                keyboardShouldPersistTaps="handled"
            />

        </View>
    );
}