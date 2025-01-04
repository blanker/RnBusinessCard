export type Workout = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Exercise = {
    id: string;
    workoutId: string;
    name: string;
};

export type ExerciseSet = {
    id: string;
    exerciseId: string;
    reps?: number;
    weight?: number;
    oneRM?: number;
}

export type WorkoutWithExercise = Workout & {
    exercises: ExerciseWithSets[];
};

export type ExerciseWithSets = Exercise & {
    sets: ExerciseSet[];
};