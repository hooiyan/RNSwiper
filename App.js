/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import {Box, Flex, Text} from 'native-base';
import {FlatList} from 'react-native-bidirectional-infinite-scroll';
import InfiniteScroll from 'react-native-infinite-looping-scroll';

const App = () => {
  const {width} = Dimensions.get('window');
  const [data, setData] = React.useState([
    {key: 'a', text: 'Hello 1'},
    {key: 'b', text: 'Hello 2'},
    {key: 'c', text: 'Hello 3'},
  ]);

  console.log(width);

  // const onStartReached = () => {
  //   console.log('reached the beginning');
  //   return `reached the beginning`;
  // };

  // const onEndReached = () => {
  //   console.log('reached the end');
  //   return `reached the end`;
  // };

  // var queryMoreMessages = function (n) {
  //   return new Promise(function (resolve) {
  //     var newMessages = [];
  //     for (var i = 0; i < n; i++) {
  //       var messageText = testMessages[getRandomInt(0, testMessages.length)];
  //       newMessages.push({
  //         id: generateUniqueKey(),
  //         text: messageText,
  //         isMyMessage: Boolean(getRandomInt(0, 2)), // Randomly assign true or false.
  //       });
  //     }
  //     // Lets resolve after 500 ms, to simulate network latency.
  //     setTimeout(function () {
  //       resolve(newMessages);
  //     }, 500);
  //   });
  // };

  const theBeginning = () => {
    const startPromise = new Promise(resolve => {
      const newData = [
        {key: 'a', text: 'Hello 1'},
        {key: 'b', text: 'Hello 2'},
        {key: 'c', text: 'Hello 3'},
      ];
      resolve(newData);
    });

    return startPromise;
  };

  // const theEnding = () => {
  //   const endPromise = new Promise(resolve => {});

  //   return endPromise;
  // };

  const started = async () => {
    const newData = await theBeginning();
    console.log(newData);
    setData(newData);
  };

  return (
    <Box safeAreaTop flex={1}>
      <Text textAlign="center">Hello React Native</Text>
      {/* "nativeEvent": {"layout": {"height": 21, "width": 390, "x": 0, "y": 68}, "target": 13}, */}
      <View onLayout={({nativeEvent}) => console.log(nativeEvent)}>
        <Text textAlign="center">Hello World</Text>
      </View>
      <Flex backgroundColor="red.300" justifyContent="center" flex={1}>
        <FlatList
          onStartReached={started}
          // onEndReached={onEndReached}
          showDefaultLoadingIndicators={false}
          // getItemLayout={(data, index) => ({
          //   index,
          // })}
          // initialScrollIndex={data.length - 1}
          width={width}
          horizontal
          pagingEnabled
          data={data}
          keyExtractor={d => d.key}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <Flex flex={1} flexDirection="row" alignItems="center">
                <Text fontSize="xl" textAlign="center" width={width}>
                  {item.text}
                </Text>
              </Flex>
            );
          }}
        />
      </Flex>
    </Box>
    // <View style={styles.container}>
    //   <InfiniteScroll
    //     horizontal={true}
    //     data={[
    //       {key: '1'},
    //       {key: '2'},
    //       {key: '3'},
    //       {key: '4'},
    //       {key: '5'},
    //       {key: '6'},
    //       {key: '7'},
    //     ]}
    //     renderItem={({item}) => (
    //       <View style={styles.listItem}>
    //         <Text>{item.key}</Text>
    //       </View>
    //     )}
    //   />
    // </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 50,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
