/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import axios from 'axios';
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {Text, View, SafeAreaView, Dimensions, Button} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const App = () => {
  const PAGE_WIDTH = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([...new Array(6).keys()]);
  const [isVertical, setIsVertical] = useState(false);
  const [isFast, setIsFast] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const ref = useRef(null);
  const [result, setResults] = useState([]);

  useEffect(() => {
    fetchData();
    console.log(result);
  }, []);

  const fetchData = (date = '') => {
    const API = 'https://api.4dnum.com/api/v1/result';
    axios
      .get(`${API}/${date}`)
      .then(res => res.data !== undefined && setResults(res.data))
      .catch(err => {
        console.log(err);
      });
  };

  const baseOptions = isVertical
    ? {
        vertical: true,
        width: PAGE_WIDTH,
        height: PAGE_WIDTH,
      }
    : {
        vertical: false,
        width: PAGE_WIDTH,
        height: PAGE_WIDTH,
      };

  // console.log(result);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          // display: 'flex',
          // backgroundColor: 'rebeccapurple',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black'}}>Hello There</Text>
        <Carousel
          {...baseOptions}
          defaultIndex={0}
          loop
          ref={ref}
          autoPlay={isAutoPlay}
          autoPlayInterval={isFast ? 100 : 2000}
          data={result}
          onSnapToItem={index => {
            console.log('current index:', index);
            setActiveIndex(index);
          }}
          renderItem={({index}) => {
            return (
              <Text
                key={index}
                index={index}
                style={{
                  fontSize: 30,
                  backgroundColor: 'pink',
                  color: 'black',
                  textAlign: 'center',
                }}>
                {index}
                {/* {result.find(i => i.type === 'GD').fdData.s1} */}
              </Text>
            );
          }}
        />
        <Button title="Click me" onPress={() => fetchData('2022-06-01')} />
      </View>
    </SafeAreaView>
  );
};

export default App;
