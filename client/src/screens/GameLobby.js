// import React, { useState, useEffect, useRef } from 'react';
// import {
//   StyleSheet,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   BackHandler,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import Dialog from 'react-native-dialog';
// import { Text } from 'react-native-paper';
// import Screen from '../components/Screen';
// import Button from '../components/Button';
// import CharacterList from '../data/CharacterList';
// import StageList from '../data/StageList';
// import CardCover from '../components/CardCover';
// import { io } from 'socket.io-client';
// import { useAuthValue } from '../auth/context';

// import { theme } from '../core/theme';

// var symbol;
// var myTurn = null;
// var choiceCounter = 0;
// var stageCounter = 0;

// export default function GameLobby(props) {
//   const { currentUser } = useAuthValue();
//   const username = currentUser.username;

//   const [servermsg, setServermsg] = useState('Waiting for Opponent...');
//   const [click, setClick] = useState([0]);
//   const [selected, setSelected] = useState('');
//   const [visible, setVisible] = useState(false);

//   const socketRef = useRef();
//   const scrollRef = useRef();
//   const navigationRef = useRef(useNavigation());

//   const storeKey = currentUser.id;

//   let arr = [];

//   //Store Character choice
//   const storeCharacter = async (arr) => {
//     try {
//       await AsyncStorage.setItem(storeKey, JSON.stringify(arr));
//     } catch (e) {
//       // saving error
//     }
//   };

//   //Store updated array
//   const storeArrayUpdate = async (CharacterList) => {
//     try {
//       await AsyncStorage.setItem('update', JSON.stringify(CharacterList));
//     } catch (e) {
//       // saving error
//     }
//   };

//   useEffect(() => {
//     //Disables back button
//     BackHandler.addEventListener('hardwareBackPress', function () {
//       return true;
//     });

//     //Connects Client to Socket.io Server
//     socketRef.current = io('http://192.168.2.11:3000', {
//       transports: ['websocket'],
//       forceNew: true,
//       upgrade: false,
//       query: { username },
//     });

//     socketRef.current.on('connect_error', (err) => {
//       console.log(`connect_error due to ${err.message}`);
//     });

//     // Event is called when either player makes a choice
//     socketRef.current.on('choicemade', function (data) {
//       // Render the move
//       setSelected(data.symbol);
//       setClick(data.character);
//       choiceCounter++;
//       arr.push(click);

//       //Increment "selected" object in array by 1 if character is chosen
//       const hero = CharacterList.findIndex((c) => c.name === click);
//       CharacterList[hero].selected + 1;

//       storeCharacter(); // Save character choice
//       storeArrayUpdate(); // Save updated array

//       // If the symbol is the same as the player's symbol,
//       // we can assume it is their turn
//       console.log(choiceCounter);

//       myTurn = data.symbol !== symbol;

//       // If the selection is still going, show who's turn it is
//       if (!isSelectionOver()) {
//         renderTurnMessage();
//       }

//       // if (choiceCounter >= 2) {
//       //   scrollRef.current?.scrollTo({
//       //     y: 0,
//       //     animated: true,
//       //   });
//       // }
//     });

//     // Event is called when either player makes a stage choice
//     socketRef.current.on('stageselected', (data) => {
//       symbol = data.symbol;
//       // Render the move
//       setSelected(data.symbol);
//       setClick(data.stage);
//       stageCounter++;
//       console.log(stageCounter);

//       stageCounter == 1 || 4
//         ? (myTurn = symbol === 'blue')
//         : (myTurn = symbol === 'red');

//       // If the selection is still going, show who's turn it is
//       if (!isSelectionOver()) {
//         renderTurnMessage();
//       }

//       if (stageCounter >= 4) {
//         navigationRef.current.navigate('GamePlay', { socketRef });
//       }
//     });

//     // Set up the initial state when the game begins
//     socketRef.current.on('gamebegin', (data) => {
//       // The server will asign Blue or Red to the player
//       symbol = data.symbol;
//       // // Give Blue the first turn
//       myTurn = symbol === 'blue';
//       console.log(myTurn);

//       renderTurnMessage();
//     });

//     // Disable the board if the opponent leaves
//     socketRef.current.on('opponentleft', function () {
//       setServermsg('Your Opponent Left...');
//     });

//     return () => {
//       socketRef.current.disconnect();
//       socketRef.current.close();
//     };
//   }, []);

//   function isSelectionOver() {
//     if (selected === 'blue') {
//       return true;
//     }
//   }

//   function renderTurnMessage() {
//     if (!myTurn) {
//       setServermsg('Your Opponent is Choosing...');
//     } else {
//       setServermsg('Choose your Character...');
//     }
//   }

//   function makeChoice(index) {
//     // It's not your turn
//     if (!myTurn) {
//       return;
//     }
//     // Emit the choice to the server
//     socketRef.current.emit('makechoice', {
//       symbol: symbol,
//       character: index.name,
//     });
//   }

//   function stageChoice(index) {
//     // It's not your turn
//     if (!myTurn) {
//       return;
//     }

//     // Emit the choice to the server
//     socketRef.current.emit('stagechoice', {
//       symbol: symbol,
//       stage: index,
//     });
//   }

//   const handleCancel = () => {
//     setVisible(false);
//   };

//   const showDialog = () => {
//     setVisible(true);
//   };

//   function disconnect() {
//     socketRef.current.disconnect();
//     socketRef.current.close();
//     choiceCounter = 0;
//     stageCounter = 0;
//     navigationRef.current.navigate('Home', {});
//   }

//   return choiceCounter <= 1 ? (
//     <Screen>
//       <Text style={styles.txt}>{servermsg}</Text>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{
//           flexDirection: 'row',
//           flexWrap: 'wrap',
//           justifyContent: 'center',
//           marginTop: 30,
//           paddingBottom: 30,
//         }}
//       >
//         {CharacterList.map((item, index) => {
//           return (
//             <View>
//               <TouchableOpacity key={item.id} onPress={() => makeChoice(index)}>
//                 <CardCover
//                   backgroundColor={index === click && selected}
//                   source={item.images.portrait}
//                   width={70}
//                   height={70}
//                 />
//               </TouchableOpacity>
//             </View>
//           );
//         })}
//       </ScrollView>
//       <Button mode="contained" onPress={showDialog}>
//         Disconnect
//       </Button>
//       <Dialog.Container visible={visible}>
//         <Dialog.Title>Exit Game</Dialog.Title>
//         <Dialog.Description>Do you want to exit this game?</Dialog.Description>
//         <Dialog.Button label="Cancel" onPress={handleCancel} />
//         <Dialog.Button label="Exit" onPress={disconnect} />
//       </Dialog.Container>
//     </Screen>
//   ) : (
//     <Screen>
//       <Text style={styles.txt}>{servermsg}</Text>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{
//           flexDirection: 'row',
//           flexWrap: 'wrap',
//           justifyContent: 'center',
//           marginTop: 30,
//           paddingBottom: 30,
//         }}
//       >
//         {StageList.map((item, index) => {
//           return (
//             <View>
//               <TouchableOpacity
//                 key={item.name}
//                 onPress={() => stageChoice(index)}
//               >
//                 <CardCover
//                   bgColor={index === click && selected}
//                   source={item.portrait}
//                   width={125}
//                   height={70}
//                 />
//               </TouchableOpacity>
//             </View>
//           );
//         })}
//       </ScrollView>
//     </Screen>
//   );
// }

// const styles = StyleSheet.create({
//   txt: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     backgroundColor: theme.colors.primary,
//   },
// });
