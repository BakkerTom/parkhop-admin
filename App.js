import { Rides, Parks } from './views';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

const rideNavigator = createStackNavigator({
  Index: { screen: Rides }
});

const parkNavigator = createStackNavigator({
  Index: { screen: Parks }
});

const App = createBottomTabNavigator({
  Rides: { screen: rideNavigator },
  Parks: { screen: parkNavigator },
});

export default App;
