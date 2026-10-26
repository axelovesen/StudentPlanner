import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    ScrollView,
    ActivityIndicator
} from 'react-native';

import { globalStyles } from '../styles/GlobalStyle';
import { getAiStudyPlan, getSimpleStudyPlan, hasApiKey } from '../services/aiPlanner';

export default function StudyPlanScreen({ tasks }) {

    // Hvor mange timer brukeren kan studere per dag
    const [hoursPerDay, setHoursPerDay] = useState(3);
    const [plan, setPlan] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Planen lages bare for oppgaver som ikke er fullført
    const activeTasks = tasks.filter((task) => !task.completed);

    const makePlan = async () => {

        setError('');

        if (activeTasks.length === 0) {
            setPlan('');
            setError('You have no active tasks to plan.');
            return;
        }

        // Uten API-nøkkel brukes den enkle planen i stedet for AI
        if (!hasApiKey) {
            setPlan(getSimpleStudyPlan(activeTasks, hoursPerDay));
            return;
        }

        setLoading(true);

        try {
            const aiPlan = await getAiStudyPlan(activeTasks, hoursPerDay);
            setPlan(aiPlan);
        } catch (e) {
            console.log('AI plan failed', e);
            setError('Could not reach the AI, so here is a simple plan instead.');
            setPlan(getSimpleStudyPlan(activeTasks, hoursPerDay));
        }

        setLoading(false);
    };

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#f4f6f8' }}
            contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        >

            <Text style={globalStyles.smallHeading}>
                AI STUDY COACH
            </Text>

            <Text style={globalStyles.title}>
                Plan your week.
            </Text>

            <Text style={globalStyles.subtitle}>
                Get a suggestion for how to split your time between your {activeTasks.length} active tasks.
            </Text>

            <Text style={globalStyles.label}>
                Hours per day
            </Text>

            <View style={globalStyles.priorityContainer}>

                {[1, 2, 3, 4, 6].map((hours) => (
                    <Pressable
                        key={hours}
                        style={
                            hoursPerDay === hours
                                ? globalStyles.priorityButtonSelected
                                : globalStyles.priorityButton
                        }
                        onPress={() => setHoursPerDay(hours)}
                    >
                        <Text style={globalStyles.priorityButtonText}>
                            {hours} h
                        </Text>
                    </Pressable>
                ))}

            </View>

            <Pressable
                style={globalStyles.button}
                onPress={makePlan}
                disabled={loading}
            >
                <Text style={globalStyles.buttonText}>
                    {plan === '' ? '✨ Make my study plan' : '✨ Make a new plan'}
                </Text>
            </Pressable>

            {!hasApiKey && (
                <Text style={globalStyles.hintText}>
                    No AI key found, so the plan is made without AI.
                </Text>
            )}

            {loading && (
                <ActivityIndicator
                    size="large"
                    color="#3867d6"
                    style={{ marginTop: 20 }}
                />
            )}

            {error !== '' && (
                <Text style={globalStyles.errorText}>
                    {error}
                </Text>
            )}

            {plan !== '' && !loading && (
                <View style={globalStyles.planCard}>

                    <Text style={globalStyles.progressTitle}>
                        Your next 7 days
                    </Text>

                    <Text style={globalStyles.planText}>
                        {plan}
                    </Text>

                </View>
            )}

        </ScrollView>
    );
}
