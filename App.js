import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import axios from "axios";
import Weather from './Weather';
const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";

export default class extends React.Component {
  state = {
    isLoading: true
  };
  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather
      }
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    // console.log(data);
    this.setState({
      isLoading: false,
      condition: weather[0].main,
      temp
    });
  };

  getLocation = async () => {
    try {
      // throw Error();
      const response = await Location.requestForegroundPermissionsAsync();
      // console.log(response);
      // const location = await Location.getCurrentPositionAsync();
      // console.log(location);


      // const {coords} = await Location.getCurrentPositionAsync();
      // console.log(coords.latitude, coords.longitude);

      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      // this.setState({isLoading: false});
    }
    catch (error) {
      Alert.alert("[Warning]", "Cant find your location");
    }

  }
  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temp={Math.round(temp)} condition={condition} />
    );
  }
}





// export default function App(){
//   return <Loading />;
// }





// export default function App() {
//   return (
//     // <View style={styles.container}>
//     //   <Text style={styles.text}>Hello</Text>
//     //   <Text style={styles.text}>Hello</Text>
//     //   <StatusBar style="auto" />
//     // </View>
//     <View style={styles.container}>
//       <View style={styles.yellowView} >
//         <Text style={styles.text}>Hello</Text>
//       </View>
//       <View style={styles.blueView} >
//         <Text style={styles.text}>Hello</Text>
//       </View>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
//   text: {
//     color: 'green',
//     fontSize: 20,
//   },
//   yellowView: {
//     flex: 1,
//     color: 'yellow',
//     backgroundColor: 'yellow',
//     fontSize: 20,
//   },
//   blueView: {
//     flex: 2,
//     color: 'blue',
//     backgroundColor: 'blue',
//     fontSize: 20,
//   },
// });
