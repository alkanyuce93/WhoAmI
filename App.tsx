import React, { useRef, useEffect, useState } from "react";
import { Text, Animated, StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import { Accelerometer } from "expo-sensors";

const whoAmI = [
  { id: 1, name: "Albert Einstein" },
  { id: 2, name: "Marie Curie" },
  { id: 3, name: "Nelson Mandela" },
  { id: 4, name: "William Shakespeare" },
  { id: 5, name: "Mustafa Kemal Atatürk" },
  { id: 6, name: "Mehmet Akif Ersoy" },
  { id: 7, name: "İsmet İnönü" },
  { id: 8, name: "Sabahattin Ali" },
  { id: 9, name: "Zeki Müren" },
  { id: 10, name: "Nâzım Hikmet" },
  { id: 11, name: "Cahit Arf" },
  { id: 12, name: "Fatma Aliye Topuz" },
  { id: 13, name: "Orhan Pamuk" },
  { id: 14, name: "Ayşe Kulin" },
  { id: 15, name: "Tarkan" },
  { id: 16, name: "Fazıl Say" },
  { id: 17, name: "Süleyman Hilmi Tunahan" },
  { id: 18, name: "Tevfik Fikret" },
  { id: 19, name: "Zülfü Livaneli" },
  { id: 20, name: "Müslüm Gürses" },
  { id: 21, name: "Halit Ziya Uşaklıgil" },
  { id: 22, name: "Aziz Sancar" },
  { id: 23, name: "Hande Yener" },
  { id: 24, name: "Şener Şen" },
  { id: 25, name: "Cem Yılmaz" },
  { id: 26, name: "Emre Belözoğlu" },
  { id: 27, name: "Gülben Ergen" },
  { id: 28, name: "Ahmet Kaya" },
  { id: 29, name: "Serdar Ortaç" },
  { id: 30, name: "Atilla İlhan" },
  { id: 31, name: "Hüseyin Avni Lifij" },
  { id: 32, name: "Neşet Ertaş" },
  { id: 33, name: "Hülya Koçyiğit" },
  { id: 34, name: "Yılmaz Güney" },
  { id: 35, name: "Aşık Veysel Şatıroğlu" },
  { id: 36, name: "Ajda Pekkan" },
  { id: 37, name: "Cem Adrian" },
  { id: 38, name: "Hakan Şükür" },
  { id: 39, name: "Yaşar Kemal" },
  { id: 40, name: "İbrahim Tatlıses" },
  { id: 41, name: "Halide Edib Adıvar" },
  { id: 42, name: "Demet Akalın" },
  { id: 43, name: "Kenan İmirzalıoğlu" },
  { id: 44, name: "Can Yücel" },
  { id: 45, name: "Levent Yüksel" },
  { id: 46, name: "Yılmaz Erdoğan" },
  { id: 47, name: "Hulusi Kentmen" },
  { id: 48, name: "Oya Baydar" },
  { id: 49, name: "Bülent Ortaçgil" },
  { id: 50, name: "Cahit Sıtkı Tarancı" },
  { id: 51, name: "Zeki Alasya" },
  { id: 52, name: "Haldun Dormen" },
  { id: 53, name: "Metin Oktay" },
  { id: 54, name: "Sezen Aksu" },
  { id: 55, name: "Süreyya İlmen" },
  { id: 56, name: "Ediz Hun" },
  { id: 57, name: "Hande Yener" },
  { id: 58, name: "Oğuz Atay" },
  { id: 59, name: "Yusuf Akçura" },
  { id: 60, name: "Zeki Müren" },
  { id: 61, name: "Haluk Levent" },
  { id: 62, name: "Tuncel Kurtiz" },
  { id: 63, name: "Yavuz Bingöl" },
  { id: 64, name: "Fatih Terim" },
  { id: 65, name: "Edip Akbayram" },
  { id: 66, name: "Ahu Türkpençe" },
  { id: 67, name: "Haldun Taner" },
  { id: 68, name: "İlber Ortaylı" },
  { id: 69, name: "Aşık Mahzuni Şerif" },
  { id: 70, name: "Candan Erçetin" },
  { id: 71, name: "Necip Fazıl Kısakürek" },
  { id: 72, name: "İlhan Selçuk" },
  { id: 73, name: "İbrahim Sadri" },
  { id: 74, name: "Ümit Besen" },
  { id: 75, name: "Yılmaz Güney" },
  { id: 76, name: "Cem Karaca" },
  { id: 77, name: "Zeki Demirkubuz" },
  { id: 78, name: "Behçet Necatigil" },
  { id: 79, name: "Sezen Cumhur Önal" },
  { id: 80, name: "Erkin Koray" },
  { id: 81, name: "Emre Belözoğlu" },
  { id: 82, name: "Zeki Müren" },
  { id: 83, name: "Cem Yılmaz" },
  { id: 84, name: "Kemal Sunal" },
  { id: 85, name: "Hülya Avşar" },
  { id: 86, name: "Süheyl Uygur" },
  { id: 87, name: "Onur Akın" },
  { id: 88, name: "Yekta Kopan" },
  { id: 89, name: "Ahmet Rasim" },
  { id: 90, name: "Şükrü Erbaş" },
  { id: 91, name: "Cengiz Bektaş" },
  { id: 92, name: "Mazhar Alanson" },
  { id: 93, name: "Süleyman Seba" },
  { id: 94, name: "Ferhan Şensoy" },
  { id: 95, name: "Gülben Ergen" },
  { id: 96, name: "Edip Cansever" },
  { id: 97, name: "Talat Sait Halman" },
  { id: 98, name: "Müşfik Kenter" },
  { id: 99, name: "Yaşar Nuri Öztürk" },
  { id: 100, name: "Özdemir Erdoğan" },
  { id: 101, name: "Taylor Swift" },
  { id: 102, name: "Liam Neeson" },
  { id: 103, name: "Emma Roberts" },
  { id: 104, name: "Lionel Messi" },
  { id: 105, name: "Adele" },
  { id: 106, name: "Chris Evans" },
  { id: 107, name: "Jennifer Aniston" },
  { id: 108, name: "Michael Jordan" },
  { id: 109, name: "Cate Blanchett" },
  { id: 110, name: "Jamie Foxx" },
  { id: 111, name: "Priyanka Chopra" },
  { id: 112, name: "Matthew Perry" },
  { id: 113, name: "Rafael Nadal" },
  { id: 114, name: "Jennifer Lopez" },
  { id: 115, name: "Russell Crowe" },
  { id: 116, name: "Emma Thompson" },
  { id: 117, name: "Zayn Malik" },
  { id: 118, name: "Reese Witherspoon" },
  { id: 119, name: "Stephen Curry" },
  { id: 120, name: "Kate Winslet" },
  { id: 121, name: "Novak Djokovic" },
  { id: 122, name: "Amy Adams" },
  { id: 123, name: "Lewis Hamilton" },
  { id: 124, name: "Natalie Portman" },
  { id: 125, name: "Rafael Nadal" },
  { id: 126, name: "Emily Blunt" },
  { id: 127, name: "Roger Federer" },
  { id: 128, name: "Ryan Gosling" },
  { id: 129, name: "Serena Williams" },
  { id: 130, name: "Jason Statham" },
  { id: 131, name: "Blake Lively" },
  { id: 132, name: "Andy Murray" },
  { id: 133, name: "Vin Diesel" },
  { id: 134, name: "Kristen Bell" },
  { id: 135, name: "Cristiano Ronaldo" },
  { id: 136, name: "Michelle Rodriguez" },
  { id: 137, name: "David Beckham" },
  { id: 138, name: "Mila Kunis" },
  { id: 139, name: "Usain Bolt" },
  { id: 140, name: "Dakota Johnson" },
  { id: 141, name: "Kobe Bryant" },
  { id: 142, name: "Nina Dobrev" },
  { id: 143, name: "Lionel Messi" },
  { id: 144, name: "Eva Mendes" },
  { id: 145, name: "Rihanna" },
  { id: 146, name: "Christian Bale" },
  { id: 147, name: "Margot Robbie" },
  { id: 148, name: "Tom Brady" },
  { id: 149, name: "Ariana Grande" },
  { id: 150, name: "Chris Hemsworth" },
  { id: 151, name: "Jennifer Lawrence" },
  { id: 152, name: "Dwayne Johnson" },
  { id: 153, name: "Gigi Hadid" },
  { id: 154, name: "Will Smith" },
  { id: 155, name: "Scarlett Johansson" },
  { id: 156, name: "Zlatan Ibrahimović" },
  { id: 157, name: "Gal Gadot" },
  { id: 158, name: "Leonardo DiCaprio" },
  { id: 159, name: "Angelina Jolie" },
  { id: 160, name: "Brad Pitt" },
  { id: 161, name: "Selena Gomez" },
  { id: 162, name: "Ryan Reynolds" },
  { id: 163, name: "Cate Blanchett" },
  { id: 164, name: "Johnny Depp" },
  { id: 165, name: "Charlize Theron" },
  { id: 166, name: "Tom Hanks" },
  { id: 167, name: "Blake Lively" },
  { id: 168, name: "Matthew McConaughey" },
  { id: 169, name: "Kate Winslet" },
  { id: 170, name: "Chris Evans" },
  { id: 171, name: "Emma Watson" },
  { id: 172, name: "Robert Downey Jr." },
  { id: 173, name: "Mila Kunis" },
  { id: 174, name: "Hugh Jackman" },
  { id: 175, name: "Natalie Portman" },
  { id: 176, name: "Bradley Cooper" },
  { id: 177, name: "Jennifer Aniston" },
  { id: 178, name: "Idris Elba" },
  { id: 179, name: "Anne Hathaway" },
  { id: 180, name: "Joaquin Phoenix" },
  { id: 181, name: "Sandra Bullock" },
  { id: 182, name: "Will Ferrell" },
  { id: 183, name: "Penélope Cruz" },
  { id: 184, name: "Chris Hemsworth" },
  { id: 185, name: "Cameron Diaz" },
  { id: 186, name: "Mark Zuckerberg" },
  { id: 187, name: "Neymar Jr." },
  { id: 188, name: "Emma Roberts" },
  { id: 189, name: "George Clooney" },
  { id: 190, name: "Gisele Bündchen" },
  { id: 191, name: "Brad Pitt" },
  { id: 192, name: "Alicia Keys" },
  { id: 193, name: "Jamie Foxx" },
  { id: 194, name: "Gal Gadot" },
  { id: 195, name: "Dwayne Johnson" },
  { id: 196, name: "Megan Fox" },
  { id: 197, name: "Tom Cruise" },
  { id: 198, name: "Jessica Alba" },
  { id: 199, name: "Zac Efron" },
  { id: 200, name: "Amy Adams" },
];

export default function App() {
  const translateY = useRef(new Animated.Value(0)).current;
  const shakeThreshold = 1.5;
  let lastShakeTime = 0;
  const [message, setMessage] = useState("Salla Beniiigggg");

  useEffect(() => {
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

    return () => subscription.remove();
  }, []);

  const handleShake = () => {
    const randomIndex = Math.floor(Math.random() * whoAmI.length);
    const randomName = whoAmI[randomIndex].name;
    showShakeMessage(randomName);

    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
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

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={[styles.box, { transform: [{ translateY }] }]}>
          <Text style={styles.text}>{message}</Text>
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
    width: 200,
    height: 200,
    backgroundColor: "#ffcc00",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    writingDirection: "rtl",
  },
});
