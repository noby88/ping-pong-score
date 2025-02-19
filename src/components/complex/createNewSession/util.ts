export const canSubmit = (players: Record<string, string>) => Object.values(players).every((value) => Boolean(value));
