import React, { createContext, useState, useEffect, useContext } from 'react';
import { loadData, saveData } from '../utils/storage';

const FitnessContext = createContext();

const DEFAULT_EXERCISES = [
  { id: '1', name: 'Push Ups', met: 8, sets: 3, reps: 15 },
  { id: '2', name: 'Squats', met: 5, sets: 3, reps: 20 },
  { id: '3', name: 'Plank', met: 4, sets: 3, reps: 1 },
  { id: '4', name: 'Running', met: 9.8, sets: 1, reps: 1 },
];

export const FitnessProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [todaySteps, setTodaySteps] = useState(3428);
  const [weight, setWeight] = useState(70); // kg
  const [goalSteps] = useState(10000);
  const [exercises] = useState(DEFAULT_EXERCISES);

  useEffect(() => {
    (async () => {
      const saved = await loadData('workouts');
      const w = await loadData('weight');
      const steps = await loadData('todaySteps');
      if (saved) setWorkouts(saved);
      if (w) setWeight(w);
      if (steps) setTodaySteps(steps);
    })();
  }, []);

  useEffect(() => { saveData('workouts', workouts); }, [workouts]);
  useEffect(() => { saveData('weight', weight); }, [weight]);

  // mock pedometer tick - replace with real native module later
  useEffect(() => {
    const id = setInterval(() => setTodaySteps(s => Math.min(goalSteps, s + Math.floor(Math.random()*5))), 4000);
    return () => clearInterval(id);
  }, []);

  const addWorkout = (workout) => {
    setWorkouts(prev => [workout, ...prev]);
  };

  const value = { workouts, todaySteps, weight, setWeight, goalSteps, exercises, addWorkout, setTodaySteps };
  return <FitnessContext.Provider value={value}>{children}</FitnessContext.Provider>;
};

export const useFitness = () => useContext(FitnessContext);
