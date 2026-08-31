import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFitness } from '../context/FitnessContext';
import { clearAll } from '../utils/storage';

export default function ProfileScreen() {
  const { weight, setWeight, todaySteps, workouts } = useFitness();
  const [w, setW] = useState(weight.toString());

  const totalCals = workouts.reduce((a,b)=>a+b.calories,0);
  const totalTime = Math.floor(workouts.reduce((a,b)=>a+b.duration,0)/60);

  return (
    <View style={styles.container}>
      <View style={{ padding:20, paddingTop:60 }}>
        <Text style={styles.h1}>Profile</Text>
        <View style={styles.avatar}><Text style={{ fontSize:36 }}>🏋️</Text></View>
        <Text style={styles.name}>Fitness Enthusiast</Text>
        <Text style={styles.email}>local account • offline-first</Text>

        <View style={styles.card}>
          <Text style={styles.label}>WEIGHT (KG)</Text>
          <View style={{ flexDirection:'row', gap:12, marginTop:10 }}>
            <TextInput value={w} onChangeText={setW} keyboardType="numeric" style={styles.input} />
            <TouchableOpacity onPress={()=>setWeight(parseFloat(w)||weight)} style={styles.saveBtn}><Text style={styles.saveText}>SAVE</Text></TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection:'row', gap:12, marginTop:12 }}>
          <View style={styles.stat}><Text style={styles.statV}>{totalCals}</Text><Text style={styles.statL}>kcal total</Text></View>
          <View style={styles.stat}><Text style={styles.statV}>{totalTime}</Text><Text style={styles.statL}>min total</Text></View>
          <View style={styles.stat}><Text style={styles.statV}>{todaySteps}</Text><Text style={styles.statL}>steps today</Text></View>
        </View>

        <TouchableOpacity onPress={()=>Alert.alert('Clear data?','This deletes all workouts',[{text:'Cancel'},{text:'Clear', style:'destructive', onPress: async()=>{ await clearAll(); Alert.alert('Cleared - restart app');}}])} style={styles.danger}>
          <Text style={{ color:'#ff4d4d', fontWeight:'800', fontSize:12 }}>CLEAR ALL DATA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#050505' },
  h1:{ color:'#fff', fontSize:28, fontWeight:'900' },
  avatar:{ width:80, height:80, borderRadius:40, backgroundColor:'#111', borderWidth:1, borderColor:'#222', alignItems:'center', justifyContent:'center', marginTop:20 },
  name:{ color:'#fff', fontSize:18, fontWeight:'900', marginTop:14 },
  email:{ color:'#555', fontSize:12, marginTop:4 },
  card:{ backgroundColor:'#111', borderRadius:16, padding:16, marginTop:20, borderWidth:1, borderColor:'#222' },
  label:{ color:'#666', fontSize:10, fontWeight:'800', letterSpacing:1 },
  input:{ flex:1, backgroundColor:'#000', borderWidth:1, borderColor:'#222', borderRadius:12, color:'#fff', padding:12, fontWeight:'800' },
  saveBtn:{ backgroundColor:'#22c55e', borderRadius:12, paddingHorizontal:20, justifyContent:'center' },
  saveText:{ color:'#000', fontWeight:'900', fontSize:12 },
  stat:{ flex:1, backgroundColor:'#111', borderRadius:14, padding:12, borderWidth:1, borderColor:'#222', alignItems:'center' },
  statV:{ color:'#fff', fontWeight:'900', fontSize:16 },
  statL:{ color:'#666', fontSize:10, marginTop:2, fontWeight:'700' },
  danger:{ marginTop:20, borderWidth:1, borderColor:'#ff4d4d22', backgroundColor:'#1a0f0f', borderRadius:12, padding:14, alignItems:'center' }
});
