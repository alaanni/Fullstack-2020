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
    periodLength: number;
    trainingDays: number;
    success: boolean;
    target: number;
    average: number;
}

const parseArgs = (args: Array<string>) : ExerciseValues => {
    if (args.length < 3) throw new Error('Not enough arguments');
    if (args.length > 50) throw new Error('Too many arguments');

    args.shift()
    const argsToNumbers = args.map(value => Number(value));
    if (!argsToNumbers.includes(NaN)) {
        const target = Number(argsToNumbers.shift())
        const average = (argsToNumbers.reduce((a, b) => a + b, 0))/argsToNumbers.length
        return {
            periodLength: argsToNumbers.length,
            trainingDays: (argsToNumbers.filter(d => !(d === 0))).length,
            success: target <= average ? true : false,
            target: target,
            average: average,
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateExercises = (periodLength: number, trainingDays: number,
    success: boolean, target: number, average: number) : ExercisesResult => {

    let rating = 0;
    let ratingDescription = '';

    if (average < 1 && average >= 0) {
        rating = 1
    }
    if (average >= 1 && average < 2) {
        rating = 2
    }
    if (average >= 2) {
        rating = 3
    }

    if (rating === 1) {
        ratingDescription = "Not good at all"
    }
    if (rating === 2) {
        ratingDescription = "Not bad but you can do better"
    }
    if (rating === 3) {
        ratingDescription = "Good job!"
    } 

    return ({
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    })
}

try {
    (process.argv).shift();
    const { periodLength, trainingDays, success, target, average } = parseArgs(process.argv);
    console.log(calculateExercises(periodLength, trainingDays, success, target, average))
    
} catch (error) {
    console.log('Error, something went wrong, message: ', error.message);
}

export { parseArgs, calculateExercises };