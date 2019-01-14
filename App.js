import { Rides, Parks, Ride, Park } from './views';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

const rideNavigator = createStackNavigator({
  Index: { screen: Rides },
  Show: {screen: Ride},
});

const parkNavigator = createStackNavigator({
  Index: { screen: Parks },
  Show: { screen: Park },
});

const App = createBottomTabNavigator({
  Rides: { screen: rideNavigator },
  Parks: { screen: parkNavigator },
});

export default App;
