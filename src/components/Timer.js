import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatTime } from '../utils/calculations';

export default function Timer({ seconds, isActive }) {
  return (
    <View style={styles.wrap}>
      <View style={[styles.dot, { backgroundColor: isActive ? '#22c55e' : '#444' }]} />
      <Text style={styles.time}>{formatTime(seconds)}</Text>
      <Text style={styles.sub}>{isActive ? 'LIVE' : 'PAUSED'}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap:{ alignItems:'center', paddingVertical:20 },
  dot:{ width:8, height:8, borderRadius:4, marginBottom:12 },
  time:{ fontSize:56, fontWeight:'900', color:'#fff', letterSpacing:-2, fontVariant:['tabular-nums'] },
  sub:{ color:'#666', fontSize:11, fontWeight:'800', letterSpacing:2, marginTop:4 }
});
