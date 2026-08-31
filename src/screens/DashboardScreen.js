import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFitness } from '../context/FitnessContext';
import StatCard from '../components/StatCard';
import { calcWorkoutCalories } from '../utils/calculations';

export default function DashboardScreen() {
  const { todaySteps, goalSteps, workouts, weight } = useFitness();
  const todayCals = workouts.filter(w=>new Date(w.date).toDateString()===new Date().toDateString()).reduce((a,w)=>a+w.calories,0);
  const todayTime = workouts.filter(w=>new Date(w.date).toDateString()===new Date().toDateString()).reduce((a,w)=>a+w.duration,0);
  const progress = Math.min(1, todaySteps/goalSteps);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding:20, paddingTop:60, gap:16 }}>
      <Text style={styles.h1}>Good morning 👋</Text>
      <Text style={styles.sub}>Let's crush today's goal</Text>

      <View style={styles.progressCard}>
        <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
          <Text style={styles.cardLabel}>DAILY STEPS</Text>
          <Text style={styles.cardLabel}>{Math.round(progress*100)}%</Text>
        </View>
        <Text style={styles.big}>{todaySteps.toLocaleString()}<Text style={styles.bigDim}> / {goalSteps.toLocaleString()}</Text></Text>
        <View style={styles.barBg}><View style={[styles.barFill, { width: `${progress*100}%` }]} /></View>
      </View>

      <View style={{ flexDirection:'row', gap:12 }}>
        <StatCard label="Calories" value={todayCals} unit="kcal" icon="🔥" color="#22c55e" />
        <StatCard label="Active Time" value={Math.floor(todayTime/60)} unit="min" icon="⏱️" color="#38bdf8" />
      </View>
      <View style={{ flexDirection:'row', gap:12 }}>
        <StatCard label="Workouts" value={workouts.length} unit="total" icon="💪" color="#a78bfa" />
        <StatCard label="Weight" value={weight} unit="kg" icon="⚖️" color="#fb923c" />
      </View>

      <View style={styles.tip}>
        <Text style={{ color:'#22c55e', fontWeight:'800', fontSize:12 }}>TIP</Text>
        <Text style={{ color:'#888', fontSize:12, lineHeight:18 }}>Replace mock step counter with react-native-pedometer or Health Connect. Context shape stays same.</Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#050505' },
  h1:{ color:'#fff', fontSize:28, fontWeight:'900', letterSpacing:-0.5 },
  sub:{ color:'#666', fontSize:14, marginTop:2 },
  progressCard:{ backgroundColor:'#111', borderRadius:20, padding:18, borderWidth:1, borderColor:'#222' },
  cardLabel:{ color:'#666', fontSize:10, fontWeight:'800', letterSpacing:1 },
  big:{ color:'#fff', fontSize:30, fontWeight:'900', marginTop:8 },
  bigDim:{ color:'#444', fontSize:16 },
  barBg:{ height:8, backgroundColor:'#1e1e1e', borderRadius:99, marginTop:14, overflow:'hidden' },
  barFill:{ height:8, backgroundColor:'#22c55e', borderRadius:99 },
  tip:{ backgroundColor:'#0f1510', borderRadius:14, padding:14, borderWidth:1, borderColor:'#22c55e22', flexDirection:'row', gap:10 }
});
