// Hjelpefunksjoner for datoer.
// Fristene lagres som 'YYYY-MM-DD' slik at de kan sorteres og brukes i kalenderen.

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Gjør om 'DD.MM.YYYY' (det brukeren skriver) til 'YYYY-MM-DD'.
// Returnerer null hvis datoen ikke er gyldig.
export const parseDate = (text) => {

    const match = text.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);

    if (!match) {
        return null;
    }

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);

    const date = new Date(year, month - 1, day);

    if (date.getMonth() !== month - 1 || date.getDate() !== day) {
        return null;
    }

    return toDateKey(date);
};

// Gjør om et Date-objekt til 'YYYY-MM-DD'.
export const toDateKey = (date) => {

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${date.getFullYear()}-${month}-${day}`;
};

// Viser datoen pent, f.eks. '25 October'.
export const formatDate = (dateKey) => {

    const [year, month, day] = dateKey.split('-').map(Number);

    if (!year || !month || !day) {
        return dateKey;
    }

    return `${day} ${monthNames[month - 1]}`;
};

// Antall dager fra i dag til fristen (negativt hvis fristen er passert).
export const daysUntil = (dateKey) => {

    const [year, month, day] = dateKey.split('-').map(Number);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(year, month - 1, day);

    return Math.round((due - today) / (1000 * 60 * 60 * 24));
};
