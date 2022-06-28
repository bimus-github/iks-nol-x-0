import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import bg from "./assets/bg.jpg";
import React, { useState, useEffect } from "react";

export default function App() {
  const [map, setMap] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [person, setPreson] = useState("X");

  useEffect(() => {
    const winner = win(map);
    if (winner) {
      gameWon(winner);
    } else {
      checkTieState();
    }
  }, [map]);

  const onPress = (rowIndex, columnIndex) => {
    if (map[rowIndex][columnIndex] !== "") {
      Alert.alert("Uzur", "Bu katak to'ldirilgan");
      return;
    }
    setMap((existingMap) => {
      const updatedMap = [...existingMap];
      updatedMap[rowIndex][columnIndex] = person;
      return updatedMap;
    });
    setPreson(person === "X" ? "O" : "X");
    win();
  };

  const win = () => {
    for (let i = 0; i <= 2; i++) {
      const winX = map[i].every((cell) => cell === "X");
      const winO = map[i].every((cell) => cell === "O");
      if (winX) {
        return "X";
      } else if (winO) {
        return "O";
      }
    }

    for (let columnIndex = 0; columnIndex <= 2; columnIndex++) {
      const winX = true;
      const winO = true;
      for (let rowIndex = 0; rowIndex <= 2; rowIndex++) {
        if (map[rowIndex][columnIndex] !== "X") {
          winX = false;
        }
        if (map[rowIndex][columnIndex] !== "O") {
          winO = false;
        }
      }
      if (winX) {
        return "X";
      } else if (winO) {
        return "O";
      }
    }
    let diogO1 = true;
    let diogX1 = true;
    let diogO2 = true;
    let diogX2 = true;
    for (let i = 0; i < 3; i++) {
      if (map[i][i] !== "X") {
        diogO1 = false;
      }
      if (map[i][i] !== "O") {
        diogX1 = false;
      }
      if (map[i][2 - i] !== "X") {
        diogO2 = false;
      }
      if (map[i][2 - i] !== "O") {
        diogX2 = false;
      }
    }
    if (diogO1) {
      return "X";
    } else if (diogX1) {
      return "O";
    }
    if (diogO2) {
      return "X";
    } else if (diogX2) {
      return "O";
    }
  };
  const checkTieState = () => {
    if (!map.some((row) => row.some((cell) => cell === ""))) {
      Alert.alert(`DURRANG`, `O'yin durrang bilan tugadi :)`, [
        {
          text: "Yangi o'yinni boshlash.",
          onPress: resetGame,
        },
      ]);
    }
  };
  const gameWon = (prop) => {
    Alert.alert("Tabriklayman", ` ${prop} g'alaba qozondi!`, [
      {
        text: "Yangitdan boshlash.",
        onPress: resetGame,
      },
    ]);
  };
  const resetGame = () => {
    setMap([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setPreson("X");
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <View style={[styles.map]}>
          {map.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((cell, columnIndex) => (
                <TouchableOpacity
                  key={`row-${rowIndex}-col-${columnIndex}`}
                  onPress={() => onPress(rowIndex, columnIndex)}
                  style={styles.cell}
                >
                  {cell === "O" && <View style={styles.circle} />}
                  {cell === "X" && (
                    <View>
                      <View style={styles.crossLine} />
                      <View
                        style={[styles.crossLine, styles.crossLineSecond]}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.button}>
          <Button onPress={() => resetGame()} title="Restart" />
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242D34",
    alignItems: "center",
    justifyContent: "center",
  },
  bg: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  map: {
    width: "80%",
    aspectRatio: 1,
  },
  row: {
    flex: 1,

    flexDirection: "row",
  },
  cell: {
    flex: 1,
  },
  circle: {
    width: 75,
    height: 75,
    borderWidth: 10,
    borderColor: "white",
    borderRadius: 50,
    margin: 10,
    top: 0 * 115 + 5,
    left: 0 * 115 + 5,
  },
  crossLine: {
    left: 50 + 0 * 115,
    top: 0 * 115 + 5,
    position: "absolute",
    width: 10,
    height: 93,
    backgroundColor: "white",
    transform: [
      {
        rotate: "45deg",
      },
    ],
  },
  crossLineSecond: {
    transform: [
      {
        rotate: "-45deg",
      },
    ],
  },
  button: {
    position: "absolute",
    top: 620,
    borderRadius: 5,
  },
});
