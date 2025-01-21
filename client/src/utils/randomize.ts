export const getRandomQuestions = <T>(questions: T[], count: number): T[] => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

