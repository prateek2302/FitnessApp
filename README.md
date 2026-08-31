# FitnessApp - React Native CLI (JavaScript)

Offline-first fitness tracker built with RN CLI.

## Setup
```bash
npx @react-native-community/cli@latest init FitnessApp --version 0.74.5
cd FitnessApp
# copy src/ + App.js from this export
npm install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage react-native-vector-icons react-native-svg
cd ios && pod install && cd ..
npm run android  # or ios
```

## Features
- Dashboard with step progress bar
- Workout timer with start/pause
- Multi-exercise selection (MET based calories)
- History list + mini bar chart
- Profile weight edit + total stats
- AsyncStorage persistence

## Swap to real pedometer
In FitnessContext.js replace interval with:
`import { Pedometer } from 'expo-sensors'` or `react-native-pedometer`
Keep same setTodaySteps setter.

## Next
- Health Connect / Apple HealthKit
- Background notifications with notifee
- react-native-svg charts for weekly trends
