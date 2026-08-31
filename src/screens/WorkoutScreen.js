import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFitness } from '../context/FitnessContext';
import Timer from '../components/Timer';
import ExerciseItem from '../components/ExerciseItem';
import { calcWorkoutCalories, todayString } from '../utils/calculations';

export default function WorkoutScreen() {
  const { exercises, weight, addWorkout } = useFitness();
  const [selected, setSelected] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(()=>{
    if (active) {
      intervalRef.current = setInterval(()=> setSeconds(s=>s+1), 1000);
    } else clearInterval(intervalRef.current);
    return ()=> clearInterval(intervalRef.current);
  }, [active]);

  const toggle = (id) => setSelected(prev=> prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);

  const finish = () => {
    const chosen = exercises.filter(e=>selected.includes(e.id));
    if (chosen.length===0 || seconds===0) return;
    const calories = calcWorkoutCalories(chosen, weight, seconds);
    addWorkout({ id: Date.now().toString(), date: new Date().toISOString(), duration: seconds, calories, exercises: chosen });
    setSeconds(0); setActive(false); setSelected([]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding:20, paddingTop:60 }}>
      <Text style={styles.h1}>Workout</Text>
      <Text style={styles.sub}>{todayString()} • {selected.length} exercises selected</Text>

      <Timer seconds={seconds} isActive={active} />

      <View style={{ flexDirection:'row', gap:12 }}>
        <TouchableOpacity onPress={()=>setActive(!active)} style={[styles.btn, { backgroundColor: active ? '#222' : '#22c55e' }]}>
          <Text style={[styles.btnText, { color: active ? '#fff' : '#000' }]}>{active ? 'PAUSE' : 'START'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={finish} style={[styles.btn, { backgroundColor:'#111', borderWidth:1, borderColor:'#222' }]}>
          <Text style={[styles.btnText, { color:'#fff' }]}>FINISH & SAVE</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.section}>Choose Exercises</Text>
      <View style={{ gap:10, marginTop:12 }}>
        {exercises.map(ex=> (
          <ExerciseItem key={ex.id} item={ex} selected={selected.includes(ex.id)} onToggle={()=>toggle(ex.id)} />
        ))}
      </View>
      <View style={{ height:100 }} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#050505' },
  h1:{ color:'#fff', fontSize:28, fontWeight:'900' },
  sub:{ color:'#666', fontSize:13, marginTop:4 },
  btn:{ flex:1, height:52, borderRadius:14, alignItems:'center', justifyContent:'center' },
  btnText:{ fontWeight:'900', fontSize:13, letterSpacing:1 },
  section:{ color:'#fff', fontWeight:'900', marginTop:24, fontSize:14, letterSpacing:0.5 }
});
