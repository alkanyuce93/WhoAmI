import React, { useRef, useEffect, useState } from "react";
import { Text, Animated, StyleSheet, View } from "react-native";
import "intl-pluralrules";

import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import { Accelerometer } from "expo-sensors";
import * as ScreenOrientation from "expo-screen-orientation";
import { whoAmI } from "@/mockData";
import i18n from "@/i18";

const whoAmIUpdated = whoAmI.map((person) => ({
  ...person,
  banned: person.banned.split(" ").join(" / "),
}));

export default function App() {
  const translateY = useRef(new Animated.Value(0)).current;
  const shakeThreshold = 1.3;
  let lastShakeTime = 0;
  const [message, setMessage] = useState(i18n.t("shakeMe"));
  const [bannedWord, setBannedWord] = useState("");

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      const currentTime = Date.now();

      if (acceleration > shakeThreshold) {
        if (currentTime - lastShakeTime > 1000) {
          lastShakeTime = currentTime;
          handleShake();
        }
      }
    });

    return () => {
      ScreenOrientation.unlockAsync();
      subscription.remove();
    };
  }, []);

  const handleShake = () => {
    const randomIndex = Math.floor(Math.random() * whoAmI.length);
    const randomName = whoAmI[randomIndex].name;
    const randomBanned = whoAmIUpdated[randomIndex].banned;

    showShakeMessage(randomName);
    showBannedWord(randomBanned);

    Animated.timing(translateY, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: { nativeEvent: { state: number } }) => {
    if (event.nativeEvent.state === State.END) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const showShakeMessage = (message: string) => {
    setMessage(message);
  };

  const showBannedWord = (bannedWord: string) => {
    setBannedWord(bannedWord);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={[styles.box, { transform: [{ translateY }] }]}>
          <View style={styles.border}>
            <Text style={styles.text}>{message}</Text>
            {message !== "Salla Beniiiğğğğ" && (
              <>
                <Text style={styles.bannedHeader}>Bunlar Yasak:</Text>
                <Text style={styles.bannedText}>{bannedWord}</Text>
              </>
            )}
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.infoText}>Değiştirmek İçin Sallayınız</Text>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffcc44",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 55,
    fontWeight: "bold",
    textAlign: "center",
    writingDirection: "rtl",
  },
  bannedText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    writingDirection: "rtl",
    textTransform: "uppercase",
  },
  bannedHeader: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    writingDirection: "rtl",
    marginTop: 10,
  },
  border: {
    borderWidth: 5,
    borderColor: "black",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    marginTop: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffcc00",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "center",
    writingDirection: "rtl",
    marginTop: 30,
  },
});
