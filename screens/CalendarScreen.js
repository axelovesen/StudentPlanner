import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    ScrollView
} from 'react-native';

import TaskComponent from '../components/TaskComponent';
import { globalStyles, priorityColors } from '../styles/GlobalStyle';
import { toDateKey, formatDate } from '../utils/dateUtils';

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3
};

export default function CalendarScreen({
    tasks,
    completeTask,
    deleteTask
}) {

    const today = new Date();

    // Hvilken måned som vises, og hvilken dag brukeren har trykket på
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    const [selectedDay, setSelectedDay] = useState(toDateKey(today));

    // Knappene for å bla mellom måneder
    const goToPreviousMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const goToNextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    const goToToday = () => {
        setMonth(today.getMonth());
        setYear(today.getFullYear());
        setSelectedDay(toDateKey(today));
    };

    // Lager listen med dager i måneden.
    // Tomme felt (null) i starten gjør at den første dagen havner på riktig ukedag.
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstWeekDay = (new Date(year, month, 1).getDay() + 6) % 7;

    const days = [];

    for (let i = 0; i < firstWeekDay; i++) {
        days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        days.push(toDateKey(new Date(year, month, day)));
    }

    // Finner oppgavene som har frist på en gitt dag
    const tasksOnDay = (dateKey) => {
        return tasks.filter((task) => task.dueDate === dateKey);
    };

    // Fargen på prikken er fargen til den viktigste aktive oppgaven den dagen
    const dotColor = (dateKey) => {

        const activeTasks = tasksOnDay(dateKey)
            .filter((task) => !task.completed)
            .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

        if (activeTasks.length === 0) {
            return null;
        }

        return priorityColors[activeTasks[0].priority].text;
    };

    const selectedTasks = tasksOnDay(selectedDay);

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#f4f6f8' }}
            contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        >

            <Text style={globalStyles.smallHeading}>
                YOUR DEADLINES
            </Text>

            <Text style={globalStyles.title}>
                See your month.
            </Text>

            <View style={globalStyles.calendarCard}>

                <View style={globalStyles.calendarHeader}>

                    <Pressable
                        style={globalStyles.calendarArrow}
                        onPress={goToPreviousMonth}
                    >
                        <Text style={globalStyles.calendarArrowText}>‹</Text>
                    </Pressable>

                    <Text style={globalStyles.calendarMonth}>
                        {monthNames[month]} {year}
                    </Text>

                    <Pressable
                        style={globalStyles.calendarArrow}
                        onPress={goToNextMonth}
                    >
                        <Text style={globalStyles.calendarArrowText}>›</Text>
                    </Pressable>

                </View>

                <View style={globalStyles.calendarGrid}>

                    {weekDays.map((day) => (
                        <Text key={day} style={globalStyles.calendarWeekDay}>
                            {day}
                        </Text>
                    ))}

                    {days.map((dateKey, index) => {

                        if (dateKey === null) {
                            return <View key={`empty-${index}`} style={globalStyles.calendarCell} />;
                        }

                        const isSelected = dateKey === selectedDay;
                        const isToday = dateKey === toDateKey(today);
                        const color = dotColor(dateKey);

                        return (
                            <Pressable
                                key={dateKey}
                                style={globalStyles.calendarCell}
                                onPress={() => setSelectedDay(dateKey)}
                            >
                                <View
                                    style={[
                                        globalStyles.calendarDay,
                                        isToday && globalStyles.calendarToday,
                                        isSelected && globalStyles.calendarSelected
                                    ]}
                                >
                                    <Text
                                        style={
                                            isSelected
                                                ? globalStyles.calendarDayTextSelected
                                                : globalStyles.calendarDayText
                                        }
                                    >
                                        {Number(dateKey.split('-')[2])}
                                    </Text>
                                </View>

                                <View
                                    style={[
                                        globalStyles.calendarDot,
                                        { backgroundColor: color || 'transparent' }
                                    ]}
                                />
                            </Pressable>
                        );
                    })}

                </View>

                <Pressable
                    style={globalStyles.todayButton}
                    onPress={goToToday}
                >
                    <Text style={globalStyles.todayButtonText}>
                        Go to today
                    </Text>
                </Pressable>

            </View>

            <Text style={globalStyles.sectionTitle}>
                DUE {formatDate(selectedDay).toUpperCase()}
            </Text>

            {selectedTasks.length === 0 ? (
                <Text style={globalStyles.emptyText}>
                    Nothing due this day.
                </Text>
            ) : (
                selectedTasks.map((task) => (
                    <TaskComponent
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        dueDate={task.dueDate}
                        priority={task.priority}
                        completed={task.completed}
                        completeTask={completeTask}
                        deleteTask={deleteTask}
                    />
                ))
            )}

        </ScrollView>
    );
}
