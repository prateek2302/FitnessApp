// MET based calorie calc: Calories = MET * weightKg * hours
export const calcCalories = (met, weightKg, durationSec) => {
  const hours = durationSec / 3600;
  return Math.round(met * weightKg * hours);
};

export const calcWorkoutCalories = (exercises, weightKg, durationSec) => {
  if (!exercises.length) return 0;
  const avgMet = exercises.reduce((a,b)=>a+b.met,0)/exercises.length;
  return calcCalories(avgMet, weightKg, durationSec);
};

export const formatTime = (sec) => {
  const m = Math.floor(sec/60).toString().padStart(2,'0');
  const s = (sec%60).toString().padStart(2,'0');
  return `${m}:${s}`;
};

export const todayString = () => new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short' });
