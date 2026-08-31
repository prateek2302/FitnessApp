import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatCard({ label, value, unit, color='#22c55e', icon }) {
  return (
    <View style={[styles.card, { borderColor: color+'30' }]}>
      <View style={[styles.iconBox, { backgroundColor: color+'18' }]}>
        <Text style={{ fontSize: 18 }}>{icon}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
      <View style={{ flexDirection:'row', alignItems:'baseline', gap:4 }}>
        <Text style={styles.value}>{value}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card:{ flex:1, backgroundColor:'#111', borderRadius:18, borderWidth:1, padding:14, gap:6 },
  iconBox:{ width:34, height:34, borderRadius:10, alignItems:'center', justifyContent:'center' },
  label:{ color:'#888', fontSize:11, fontWeight:'700', letterSpacing:0.5, textTransform:'uppercase', marginTop:6 },
  value:{ color:'#fff', fontSize:22, fontWeight:'900' },
  unit:{ color:'#666', fontSize:12, fontWeight:'600' }
});
