import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {ExerciseSet, WorkoutWithExercises} from "@/src/types/models";
import { newWorkout, finishWorkout} from "@/src/services/workoutService";
import {createExercise,} from "@/src/services/exerciseService";
import {createSet, updateSet} from "@/src/services/setService";
import {current} from "immer";

type State = {
    currentWorkout: WorkoutWithExercises | null;
    workouts: WorkoutWithExercises[] ;
};
type Actions = {
    startWorkout: () => void;
    finishWorkout: () => void;

    addExercise: (name: string) => void;
    addSet: (exerciseId: string) => void;
    updateSet: (setId: string, updateFields: Pick<ExerciseSet, 'reps' | 'weight'>) => void;
    deleteSet: (setId: string) => void;
};


create<State & Actions>()(
    immer((set, get) => ({
        // State
        currentWorkout: null,
        workouts: [],

        // Actions
        startWorkout: () => {
            set({ currentWorkout: newWorkout() });
        },

        finishWorkout: () => {
            const {currentWorkout} = get();
            if (!currentWorkout) return;

            const finishedWorkout: WorkoutWithExercises = finishWorkout(currentWorkout);
            set((state) => {
                state.currentWorkout = null;
                state.workouts.unshift(finishedWorkout);
            });
            // set ((state) => ({
            //     currentWorkout: null,
            //     workouts: [finishedWorkout, ...state.workouts],
            // }));
        },

        addExercise(name: string) {
            const {currentWorkout} = get();
            if (!currentWorkout) return;

            const newExercise = createExercise(name, currentWorkout.id);

            set((state) => {
                state.currentWorkout?.exercises.push(newExercise);
            });
            // set((state) => ({
            //     currentWorkout: state.currentWorkout && {
            //         ...state.currentWorkout,
            //         exercises: [
            //             ...state.currentWorkout.exercises,
            //             newExercise
            //         ],
            //     } }));
        },

        addSet: (exerciseId: string) => {
            const newSet = createSet(exerciseId);
            set((state) => {
                const exercise = state.currentWorkout?.exercises?.find(e => e.id === exerciseId);
                exercise?.sets?.push(newSet);
            })
        },

        updateSet(setId, updateFields) {
            set((state) => {
                if (!state.currentWorkout) return;
                const exercise = state.currentWorkout?.exercises?.find((e) => {
                    e.sets.some(set => set.id=== setId)
                })
                const setIndex = exercise?.sets?.findIndex(set => set.id === setId);
                if (!exercise || setIndex === undefined || setIndex === -1) {
                    return;
                }

                updateSet(
                    current(exercise?.sets[setIndex]),
                    updateFields
                );
            });
        },

        deleteSet: (setId: string) => {
            set(state => {
                if (!state.currentWorkout) return;
                const exercise = state.currentWorkout?.exercises?.find((e) => {
                    e.sets.some(set => set.id=== setId)
                });
                if (!exercise) { return }
                exercise.sets = exercise?.sets?.filter(set => set.id !== setId);

                if (exercise.sets.length === 0) {
                    // that was the last set
                    state.currentWorkout.exercises = state.currentWorkout?.exercises.filter((ex)=>{
                      return ex.id === exercise.id;
                    })
                }
            })
        }
})));



