import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ExerciseItem({ item, selected, onToggle }) {
  return (
    <TouchableOpacity onPress={onToggle} style={[styles.card, selected && styles.selected]}>
      <View style={{ flex:1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.meta}>{item.sets} sets • {item.reps} reps • MET {item.met}</Text>
      </View>
      <View style={[styles.check, selected && { backgroundColor:'#22c55e', borderColor:'#22c55e' }]}>
        {selected && <Text style={{ color:'#000', fontWeight:'900' }}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card:{ flexDirection:'row', alignItems:'center', backgroundColor:'#151515', borderRadius:14, padding:14, borderWidth:1, borderColor:'#222' },
  selected:{ borderColor:'#22c55e', backgroundColor:'#121e14' },
  name:{ color:'#fff', fontWeight:'800', fontSize:14 },
  meta:{ color:'#666', fontSize:11, marginTop:2 },
  check:{ width:26, height:26, borderRadius:13, borderWidth:1, borderColor:'#333', alignItems:'center', justifyContent:'center' }
});
