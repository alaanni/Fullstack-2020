interface ExercisesResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ExerciseValues {
    exercisePeriod: Array<number>;
    target: number;
}

const parseArgs = (args: Array<string>) : ExerciseValues => {
    if (args.length < 3) throw new Error('Not enough arguments');
    if (args.length > 50) throw new Error('Too many arguments');

    const argsToNumbers = args.map(value => Number(value));
    if (!argsToNumbers.includes(NaN)) {
        const target = Number(argsToNumbers.shift());
        return {
            exercisePeriod: argsToNumbers,
            target: target
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateExercises = (exercisePeriod: Array<number>, target: number) : ExercisesResult => {

    const periodLength = exercisePeriod.length;
    const trainingDays = (exercisePeriod.filter(d => !(d === 0))).length;
    const average = (exercisePeriod.reduce((a, b) => a + b, 0))/periodLength;
    const success = target <= average ? true : false;

    let rating = 0;
    let ratingDescription = '';

    if (average < 1 && average >= 0) {
        rating = 1;
    }
    if (average >= 1 && average < 2) {
        rating = 2;
    }
    if (average >= 2) {
        rating = 3;
    }

    if (rating === 1) {
        ratingDescription = "Not good at all";
    }
    if (rating === 2) {
        ratingDescription = "Not bad but you can do better";
    }
    if (rating === 3) {
        ratingDescription = "Good job!";
    } 

    return ({
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    });
};

try {
    const { exercisePeriod, target} = parseArgs(process.argv);
    calculateExercises(exercisePeriod, target);
    
} catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Something went wrong, error message: ', e.message);
}
