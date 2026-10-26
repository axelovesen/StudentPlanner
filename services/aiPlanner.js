import { formatDate, daysUntil, toDateKey } from '../utils/dateUtils';

// API-nøkkelen ligger i .env.local (EXPO_PUBLIC_OPENAI_API_KEY=...) og skal ikke pushes til GitHub
const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

export const hasApiKey = Boolean(apiKey);

// Kallet gjøres direkte fra appen med fetch. Det er greit i en prototype,
// men en ekte app burde gå via en egen server så nøkkelen ikke ligger i appen.
const API_URL = 'https://api.openai.com/v1/chat/completions';

// Lager en tekstliste over de aktive oppgavene som sendes til AI-en
const describeTasks = (tasks) => {
    return tasks
        .map((task) => `- ${task.title} (priority: ${task.priority}, due ${formatDate(task.dueDate)}, ${daysUntil(task.dueDate)} days left)`)
        .join('\n');
};

// Ber OpenAI om en studieplan for de neste 7 dagene basert på oppgavene
export const getAiStudyPlan = async (tasks, hoursPerDay) => {

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are a study coach for university students. Make short, realistic study plans. Answer in English, as plain text without markdown. Use one line per day in the format "Monday: ...". Prioritise tasks with high priority and close deadlines, and give a one-sentence tip at the end.'
                },
                {
                    role: 'user',
                    content: `Today is ${formatDate(toDateKey(new Date()))}. I can study about ${hoursPerDay} hours per day.\nMy tasks:\n${describeTasks(tasks)}\n\nMake a study plan for the next 7 days.`
                }
            ]
        })
    });

    if (!response.ok) {
        throw new Error(`AI request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Svaret fra AI-en ligger i det første valget (choices[0])
    return data.choices[0].message.content.trim();
};

// Enkel plan uten AI, brukes hvis det ikke finnes en API-nøkkel.
// Fordeler timene på oppgavene etter prioritet og hvor nær fristen er.
export const getSimpleStudyPlan = (tasks, hoursPerDay) => {

    const weight = { High: 3, Medium: 2, Low: 1 };
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const lines = [];

    for (let i = 0; i < 7; i++) {

        const date = new Date();
        date.setDate(date.getDate() + i);

        // Bare oppgaver som ikke har passert fristen denne dagen
        const openTasks = tasks.filter((task) => daysUntil(task.dueDate) >= i);

        if (openTasks.length === 0) {
            lines.push(`${dayNames[date.getDay()]}: Free day`);
            continue;
        }

        // Oppgaver med høy prioritet og kort tid igjen får mest tid
        const scored = openTasks
            .map((task) => ({
                title: task.title,
                score: weight[task.priority] / Math.max(daysUntil(task.dueDate) - i + 1, 1)
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 2);

        const total = scored.reduce((sum, item) => sum + item.score, 0);

        const parts = scored.map((item) => {
            const hours = Math.max(Math.round((item.score / total) * hoursPerDay * 2) / 2, 0.5);
            return `${item.title} (${hours} h)`;
        });

        lines.push(`${dayNames[date.getDay()]}: ${parts.join(', ')}`);
    }

    return lines.join('\n');
};
