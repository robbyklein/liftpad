export type IWorkout = {
  id?: number
  title: string
  performed: string
}

export interface IWorkoutWithNested extends IWorkout {
  exercises: IWorkoutExercise[]
}

export interface IWorkoutWithCountAndStreak extends IWorkout {
  exerciseCount: number
  streak: number
}

export interface IWorkoutExercise {
  exerciseId: number
  sets: {
    weight: number
    reps: number
  }[]
}

export type IExercise = {
  id: number
  equipment: string
  imageEnd: string
  imageStart: string
  instructions: string
  liftType: string
  muscle: string
  title: string
}

export interface IExerciseWithNested extends IExercise {
  sets: ISet[]
}

export type ISet = {
  id?: number
  weight: number
  reps: number
  exerciseId: number
  workoutId: number
}
