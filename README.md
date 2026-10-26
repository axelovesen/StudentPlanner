# Student Planner

En mobilapp i React Native (Expo) som hjelper studenter med å holde oversikt over oppgaver, frister og prioriteringer, og som foreslår hvordan uken bør fordeles.

## Demovideo

- Godkjennelsesoppgave 2: https://youtube.com/shorts/YjL0RL-5ufM?feature=share
- Godkjennelsesoppgave 1: https://youtube.com/shorts/pyvH6G7ehdQ?feature=share

## Funksjoner

- **Home:** oversikt over aktive og fullførte oppgaver.
- **Tasks:** oppgaveliste med fremdrift, filter (All/Active/Completed) og sortering etter prioritet og frist.
- **Calendar:** månedsvisning med fargede prikker på dager med frister. Trykk på en dag for å se oppgavene.
- **Study Plan:** en AI (OpenAI) foreslår en studieplan for de neste 7 dagene ut fra oppgavene og hvor mange timer man har per dag. Uten API-nøkkel lages en enkel plan uten AI.
- **Add:** legg til oppgave med navn, frist (DD.MM.YYYY) og prioritet.
- Oppgavene lagres med AsyncStorage og blir liggende når appen lukkes.
- All styling ligger i `styles/GlobalStyle.js`.

## Kjør appen

```
npm install
npx expo start
```

For å bruke AI-funksjonen: lag en fil `.env.local` i prosjektmappen med

```
EXPO_PUBLIC_OPENAI_API_KEY=din-nøkkel
```

## Hvem har kodet hva

Oppgaven er individuell, og all kode er laget av Axel Neergaard Ovesen. AI-verktøy er brukt som hjelp underveis, se refleksjonen i rapporten.
