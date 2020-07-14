interface exercisesResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (list: number[], target: number) : exercisesResult => {
    const periodLength = list.length;
    const trainingDays = (list.filter(d => !(d === 0))).length;
    const average = (list.reduce((a, b) => a + b, 0))/periodLength;
    const success = target >= average ? true : false;
    const rating = () => {
        if (average < 1) {
            return 1
        }
        if (average >= 1 && average < 2) {
            return 2
        }
        if (average >= 2) {
            return 3
        }
    }
    const ratingDescription = () => {
        if (rating() === 1) {
            return ""
        }
    }

    return (
        { periodLength,
          trainingDays,
          success,
          rating: rating(),
          ratingDescription: 'not too bad but could be better',
          target: 2,
          average: 1.9285714285714286 });
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))