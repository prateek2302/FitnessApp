import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFitness } from '../context/FitnessContext';
import { formatTime } from '../utils/calculations';

export default function HistoryScreen() {
  const { workouts } = useFitness();

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()} • {new Date(item.date).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</Text>
        <Text style={styles.cal}>{item.calories} kcal</Text>
      </View>
      <Text style={styles.dur}>{formatTime(item.duration)} • {item.exercises.length} exercises</Text>
      <Text style={styles.ex}>{item.exercises.map(e=>e.name).join(' • ')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ padding:20, paddingTop:60 }}>
        <Text style={styles.h1}>History</Text>
        <Text style={styles.sub}>{workouts.length} workouts logged</Text>

        <View style={styles.chart}>
          {workouts.slice(0,7).map((w,i)=> {
            const h = Math.max(8, (w.calories/300)*80);
            return <View key={w.id} style={{ alignItems:'center', gap:6 }}>
              <View style={{ width:28, height:h, backgroundColor:'#22c55e', borderRadius:8 }} />
              <Text style={{ color:'#555', fontSize:9 }}>{new Date(w.date).getDate()}</Text>
            </View>;
          })}
          {workouts.length===0 && <Text style={{ color:'#333', fontSize:12 }}>No data yet - finish a workout</Text>}
        </View>
      </View>
      <FlatList data={workouts} keyExtractor={i=>i.id} renderItem={renderItem} contentContainerStyle={{ padding:20, gap:12, paddingBottom:100 }} ListEmptyComponent={<Text style={{ color:'#444', textAlign:'center', marginTop:40 }}>Start your first workout!</Text>} />
    </View>
  );
}
const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#050505' },
  h1:{ color:'#fff', fontSize:28, fontWeight:'900' },
  sub:{ color:'#666', fontSize:13, marginTop:4 },
  chart:{ flexDirection:'row', gap:10, alignItems:'flex-end', backgroundColor:'#111', borderRadius:16, padding:16, marginTop:16, borderWidth:1, borderColor:'#222', minHeight:110 },
  item:{ backgroundColor:'#111', borderRadius:16, padding:14, borderWidth:1, borderColor:'#222' },
  date:{ color:'#666', fontSize:11, fontWeight:'700' },
  cal:{ color:'#22c55e', fontSize:12, fontWeight:'900' },
  dur:{ color:'#fff', fontSize:13, fontWeight:'800', marginTop:6 },
  ex:{ color:'#555', fontSize:11, marginTop:4 }
});
