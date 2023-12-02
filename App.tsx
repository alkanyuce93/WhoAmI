import React, { useRef, useEffect, useState } from "react";
import { Text, Animated, StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import { Accelerometer } from "expo-sensors";
import * as ScreenOrientation from "expo-screen-orientation";

const whoAmI = [
  {
    id: 1,
    name: "Albert Einstein",
    banned: "fizikçi teorik izafiyet",
  },
  {
    id: 2,
    name: "Marie Curie",
    banned: "radyoaktivite bilim madde",
  },
  {
    id: 3,
    name: "Nelson Mandela",
    banned: "özgürlük ırkçılık demokrasi",
  },
  {
    id: 4,
    name: "William Shakespeare",
    banned: "oyun şiir trajedi",
  },
  {
    id: 5,
    name: "Mustafa Kemal Atatürk",
    banned: "devrim ülke lider",
  },
  {
    id: 6,
    name: "Mehmet Akif Ersoy",
    banned: "şair milli marş vatan",
  },
  {
    id: 7,
    name: "İsmet İnönü",
    banned: "siyaset devlet adamı cumhuriyet",
  },
  {
    id: 8,
    name: "Sabahattin Ali",
    banned: "yazar roman edebiyat",
  },
  {
    id: 9,
    name: "Zeki Müren",
    banned: "şarkıcı sanat sahne",
  },
  {
    id: 10,
    name: "Nâzım Hikmet",
    banned: "şiir komünizm hapis",
  },
  {
    id: 11,
    name: "Cahit Arf",
    banned: "matematik teorem bilim",
  },
  {
    id: 12,
    name: "Fatma Aliye Topuz",
    banned: "yazar edebiyat kadın hakları",
  },
  {
    id: 13,
    name: "Orhan Pamuk",
    banned: "yazar Nobel edebiyat",
  },
  {
    id: 14,
    name: "Ayşe Kulin",
    banned: "yazar roman tarih",
  },
  {
    id: 15,
    name: "Tarkan",
    banned: "şarkıcı pop Turkçe müzik",
  },
  {
    id: 16,
    name: "Fazıl Say",
    banned: "piyanist klasik müzik besteci",
  },
  {
    id: 17,
    name: "Süleyman Hilmi Tunahan",
    banned: "İslam tarikat sohbet",
  },
  {
    id: 18,
    name: "Tevfik Fikret",
    banned: "şair Servet-i Fünun şiir",
  },
  {
    id: 19,
    name: "Zülfü Livaneli",
    banned: "yazar müzisyen siyaset",
  },
  {
    id: 20,
    name: "Müslüm Gürses",
    banned: "şarkıcı Arabesk müzik",
  },
  {
    id: 21,
    name: "Halit Ziya Uşaklıgil",
    banned: "yazar roman edebiyat",
  },
  {
    id: 22,
    name: "Aziz Sancar",
    banned: "biyokimyager Nobel bilim",
  },
  {
    id: 23,
    name: "Hande Yener",
    banned: "şarkıcı pop estetik",
  },
  {
    id: 24,
    name: "Şener Şen",
    banned: "oyuncu tiyatro sinema",
  },
  {
    id: 25,
    name: "Cem Yılmaz",
    banned: "komedyen stand-up film",
  },
  {
    id: 26,
    name: "Emre Belözoğlu",
    banned: "futbolcu Fenerbahçe milli takım",
  },
  {
    id: 27,
    name: "Gülben Ergen",
    banned: "şarkıcı pop magazin",
  },
  {
    id: 28,
    name: "Ahmet Kaya",
    banned: "şarkıcı grup müzik",
  },
  {
    id: 29,
    name: "Serdar Ortaç",
    banned: "şarkıcı pop estetik",
  },
  {
    id: 30,
    name: "Atilla İlhan",
    banned: "şair şiir toplumcu",
  },
  {
    id: 31,
    name: "Hüseyin Avni Lifij",
    banned: "ressam Tablo sanat",
  },
  {
    id: 32,
    name: "Neşet Ertaş",
    banned: "halk müziği Bozlak çalgı",
  },
  {
    id: 33,
    name: "Hülya Koçyiğit",
    banned: "oyuncu film dizi",
  },
  {
    id: 34,
    name: "Yılmaz Güney",
    banned: "yönetmen senarist sinema",
  },
  {
    id: 35,
    name: "Aşık Veysel Şatıroğlu",
    banned: "halk şairi Türk halk müziği saz",
  },
  {
    id: 36,
    name: "Ajda Pekkan",
    banned: "şarkıcı pop estetik",
  },
  {
    id: 37,
    name: "Cem Adrian",
    banned: "şarkıcı akustik müzik",
  },
  {
    id: 38,
    name: "Hakan Şükür",
    banned: "futbolcu milli takım gol",
  },
  {
    id: 39,
    name: "Yaşar Kemal",
    banned: "yazar Çukurova roman",
  },
  {
    id: 40,
    name: "İbrahim Tatlıses",
    banned: "şarkıcı Arabesk kürtçe",
  },
  {
    id: 41,
    name: "Halide Edib Adıvar",
    banned: "yazar romancı feminist",
  },
  {
    id: 42,
    name: "Demet Akalın",
    banned: "şarkıcı pop magazin",
  },
  {
    id: 43,
    name: "Kenan İmirzalıoğlu",
    banned: "oyuncu dizi sinema",
  },
  {
    id: 44,
    name: "Can Yücel",
    banned: "şair şiir aşk",
  },
  {
    id: 45,
    name: "Levent Yüksel",
    banned: "şarkıcı pop rock",
  },
  {
    id: 46,
    name: "Yılmaz Erdoğan",
    banned: "oyuncu tiyatro film",
  },
  {
    id: 47,
    name: "Hulusi Kentmen",
    banned: "oyuncu dizi sinema",
  },
  {
    id: 48,
    name: "Oya Baydar",
    banned: "yazar edebiyat siyaset",
  },
  {
    id: 49,
    name: "Bülent Ortaçgil",
    banned: "şarkıcı rock gitar",
  },
  {
    id: 50,
    name: "Cahit Sıtkı Tarancı",
    banned: "şair şiir aşk",
  },
  {
    id: 51,
    name: "Zeki Alasya",
    banned: "oyuncu komedi tiyatro",
  },
  {
    id: 52,
    name: "Haldun Dormen",
    banned: "oyuncu dizi tiyatro",
  },
  {
    id: 53,
    name: "Metin Oktay",
    banned: "futbolcu Galatasaray gol",
  },
  {
    id: 54,
    name: "Sezen Aksu",
    banned: "şarkıcı Türk sanat müziği diva",
  },
  {
    id: 55,
    name: "Süreyya İlmen",
    banned: "resim ressam sanat",
  },
  {
    id: 56,
    name: "Ediz Hun",
    banned: "oyuncu dizi sinema",
  },
  {
    id: 57,
    name: "Hande Yener",
    banned: "şarkıcı pop estetik",
  },
  {
    id: 58,
    name: "Oğuz Atay",
    banned: "yazar roman edebiyat",
  },
  {
    id: 59,
    name: "Yusuf Akçura",
    banned: "yazar tarih fikir adamı",
  },
  {
    id: 60,
    name: "Zeki Müren",
    banned: "şarkıcı sanat sahne",
  },
  {
    id: 61,
    name: "Haluk Levent",
    banned: "şarkıcı rock sosyal aktivist",
  },
  {
    id: 62,
    name: "Tuncel Kurtiz",
    banned: "oyuncu tiyatro sinema",
  },
  {
    id: 63,
    name: "Yavuz Bingöl",
    banned: "şarkıcı Türk halk müziği geleneksel",
  },
  {
    id: 64,
    name: "Fatih Terim",
    banned: "futbolcu teknik direktör Galatasaray",
  },
  {
    id: 65,
    name: "Edip Akbayram",
    banned: "şarkıcı rock anadolu rock",
  },
  {
    id: 66,
    name: "Ahu Türkpençe",
    banned: "oyuncu dizi sinema",
  },
  {
    id: 67,
    name: "Haldun Taner",
    banned: "yazar tiyatro edebiyat",
  },
  {
    id: 68,
    name: "İlber Ortaylı",
    banned: "tarihçi profesör yazar",
  },
  {
    id: 69,
    name: "Aşık Mahzuni Şerif",
    banned: "ozan türkü halk şairi",
  },
  {
    id: 70,
    name: "Candan Erçetin",
    banned: "şarkıcı müzisyen sanatçı",
  },
  {
    id: 71,
    name: "Necip Fazıl Kısakürek",
    banned: "şair yazar mütefekkir",
  },
  {
    id: 72,
    name: "İlhan Selçuk",
    banned: "gazeteci karikatürist yazar",
  },
  {
    id: 73,
    name: "İbrahim Sadri",
    banned: "yazar şair eleştirmen",
  },
  {
    id: 74,
    name: "Ümit Besen",
    banned: "şarkıcı müzisyen besteci",
  },
  {
    id: 75,
    name: "Yılmaz Güney",
    banned: "oyuncu yazar yönetmen",
  },
  {
    id: 76,
    name: "Cem Karaca",
    banned: "müzisyen şarkıcı söz yazarı",
  },
  {
    id: 77,
    name: "Zeki Demirkubuz",
    banned: "yönetmen senarist oyuncu",
  },
  {
    id: 78,
    name: "Behçet Necatigil",
    banned: "şair yazar çevirmen",
  },
  {
    id: 79,
    name: "Sezen Cumhur Önal",
    banned: "şair yazar eleştirmen",
  },
  {
    id: 80,
    name: "Erkin Koray",
    banned: "rock müziği müzisyen besteci",
  },
  {
    id: 81,
    name: "Emre Belözoğlu",
    banned: "futbolcu sporcu teknik direktör",
  },
  {
    id: 82,
    name: "Zeki Müren",
    banned: "şarkıcı sanatçı besteci",
  },
  {
    id: 83,
    name: "Cem Yılmaz",
    banned: "komedyen oyuncu yazar",
  },
  {
    id: 84,
    name: "Kemal Sunal",
    banned: "oyuncu komedyen yazar",
  },
  {
    id: 85,
    name: "Hülya Avşar",
    banned: "oyuncu şarkıcı sunucu",
  },
  {
    id: 86,
    name: "Süheyl Uygur",
    banned: "tiyatrocu oyuncu yazar",
  },
  {
    id: 87,
    name: "Onur Akın",
    banned: "şarkıcı müzisyen besteci",
  },
  {
    id: 88,
    name: "Yekta Kopan",
    banned: "yazar şair sunucu",
  },
  {
    id: 89,
    name: "Ahmet Rasim",
    banned: "gazeteci yazar şair",
  },
  {
    id: 90,
    name: "Şükrü Erbaş",
    banned: "şair yazar eleştirmen",
  },
  {
    id: 91,
    name: "Cengiz Bektaş",
    banned: "yazar şair çevirmen",
  },
  {
    id: 92,
    name: "Mazhar Alanson",
    banned: "müzisyen şarkıcı söz yazarı",
  },
  {
    id: 93,
    name: "Süleyman Seba",
    banned: "sporcu futbolcu başkan",
  },
  {
    id: 94,
    name: "Ferhan Şensoy",
    banned: "tiyatrocu oyuncu yazar",
  },
  {
    id: 95,
    name: "Gülben Ergen",
    banned: "şarkıcı müzisyen dansçı",
  },
  {
    id: 96,
    name: "Edip Cansever",
    banned: "şair yazar eleştirmen",
  },
  {
    id: 97,
    name: "Talat Sait Halman",
    banned: "şair yazar çevirmen",
  },
  {
    id: 98,
    name: "Müşfik Kenter",
    banned: "tiyatrocu oyuncu yönetmen",
  },
  {
    id: 99,
    name: "Yaşar Nuri Öztürk",
    banned: "şair yazar çevirmen",
  },
  {
    id: 100,
    name: "Özdemir Erdoğan",
    banned: "müzisyen şarkıcı söz yazarı",
  },
  {
    id: 101,
    name: "Taylor Swift",
    banned: "şarkıcı müzisyen söz yazarı",
  },
  {
    id: 102,
    name: "Liam Neeson",
    banned: "oyuncu aktör senarist",
  },
  {
    id: 103,
    name: "Emma Roberts",
    banned: "oyuncu aktris moda ikonu",
  },
  {
    id: 104,
    name: "Lionel Messi",
    banned: "futbolcu sporcu oyuncu",
  },
  {
    id: 105,
    name: "Adele",
    banned: "şarkıcı müzisyen söz yazarı",
  },
  {
    id: 106,
    name: "Chris Evans",
    banned: "oyuncu aktör film yapımcısı",
  },
  {
    id: 107,
    name: "Jennifer Aniston",
    banned: "oyuncu aktris film yapımcısı",
  },
  {
    id: 108,
    name: "Michael Jordan",
    banned: "sporcu basketbolcu girişimci",
  },
  {
    id: 109,
    name: "Cate Blanchett",
    banned: "oyuncu aktris film yapımcısı",
  },
  {
    id: 110,
    name: "Jamie Foxx",
    banned: "oyuncu şarkıcı komedyen",
  },
  {
    id: 111,
    name: "Priyanka Chopra",
    banned: "oyuncu şarkıcı güzellik kraliçesi",
  },
  {
    id: 112,
    name: "Matthew Perry",
    banned: "oyuncu aktör komedyen",
  },
  {
    id: 113,
    name: "Rafael Nadal",
    banned: "sporcu tenisçi şampiyon",
  },
  {
    id: 114,
    name: "Jennifer Lopez",
    banned: "şarkıcı oyuncu girişimci",
  },
  {
    id: 115,
    name: "Russell Crowe",
    banned: "oyuncu aktör film yapımcısı",
  },
  {
    id: 116,
    name: "Emma Thompson",
    banned: "oyuncu aktris yazar",
  },
  {
    id: 117,
    name: "Zayn Malik",
    banned: "şarkıcı müzisyen söz yazarı",
  },
  {
    id: 118,
    name: "Reese Witherspoon",
    banned: "oyuncu aktris film yapımcısı",
  },
  {
    id: 119,
    name: "Stephen Curry",
    banned: "sporcu basketbolcu girişimci",
  },
  {
    id: 120,
    name: "Kate Winslet",
    banned: "oyuncu aktris film yapımcısı",
  },
  {
    id: 121,
    name: "Novak Djokovic",
    banned: "sporcu tenisçi şampiyon",
  },
  {
    id: 122,
    name: "Amy Adams",
    banned: "oyuncu aktris şarkıcı",
  },
  {
    id: 123,
    name: "Lewis Hamilton",
    banned: "sporcu Formula 1 yarışçı",
  },
  {
    id: 124,
    name: "Natalie Portman",
    banned: "oyuncu aktris film yapımcısı",
  },
  {
    id: 125,
    name: "Rafael Nadal",
    banned: "sporcu tenisçi şampiyon",
  },
  {
    id: 126,
    name: "Emily Blunt",
    banned: "oyuncu aktris şarkıcı",
  },
  {
    id: 127,
    name: "Roger Federer",
    banned: "sporcu tenisçi şampiyon",
  },
  {
    id: 128,
    name: "Ryan Gosling",
    banned: "oyuncu aktör müzisyen",
  },
  {
    id: 129,
    name: "Serena Williams",
    banned: "sporcu tenisçi şampiyon",
  },
  {
    id: 130,
    name: "Jason Statham",
    banned: "oyuncu aktör dövüş sanatçısı",
  },
  {
    id: 131,
    name: "Blake Lively",
    banned: "oyuncu aktris moda ikonu",
  },
  {
    id: 132,
    name: "Andy Murray",
    banned: "sporcu tenisçi şampiyon",
  },
  {
    id: 133,
    name: "Vin Diesel",
    banned: "oyuncu aktör film yapımcısı",
  },
  {
    id: 134,
    name: "Kristen Bell",
    banned: "oyuncu şarkıcı dizi yıldızı",
  },
  {
    id: 135,
    name: "Cristiano Ronaldo",
    banned: "futbolcu sporcu golcü",
  },
  {
    id: 136,
    name: "Michelle Rodriguez",
    banned: "oyuncu aktris film yıldızı",
  },
  {
    id: 137,
    name: "David Beckham",
    banned: "futbolcu stil ikonu spor yorumcusu",
  },
  {
    id: 138,
    name: "Mila Kunis",
    banned: "oyuncu aktris film yıldızı",
  },
  {
    id: 139,
    name: "Usain Bolt",
    banned: "sprinter atlet hız koşucusu",
  },
  {
    id: 140,
    name: "Dakota Johnson",
    banned: "oyuncu aktris film yıldızı",
  },
  {
    id: 141,
    name: "Kobe Bryant",
    banned: "basketbolcu sporcu NBA efsanesi",
  },
  {
    id: 142,
    name: "Nina Dobrev",
    banned: "oyuncu aktris dizi yıldızı",
  },
  {
    id: 143,
    name: "Lionel Messi",
    banned: "futbolcu sporcu Barcelona kaptanı",
  },
  {
    id: 144,
    name: "Eva Mendes",
    banned: "oyuncu aktris moda ikonu",
  },
  {
    id: 145,
    name: "Rihanna",
    banned: "şarkıcı müzisyen moda tasarımcısı",
  },
  {
    id: 146,
    name: "Christian Bale",
    banned: "oyuncu aktör Batman",
  },
  {
    id: 147,
    name: "Margot Robbie",
    banned: "oyuncu aktris Harley Quinn",
  },
  {
    id: 148,
    name: "Tom Brady",
    banned: "amerikan futbolcusu sporcu Süper Bowl şampiyonu",
  },
  {
    id: 149,
    name: "Ariana Grande",
    banned: "şarkıcı müzisyen pop yıldızı",
  },
  {
    id: 150,
    name: "Chris Hemsworth",
    banned: "oyuncu aktör Thor",
  },
  {
    id: 151,
    name: "Jennifer Lawrence",
    banned: "oyuncu aktris Katniss Everdeen",
  },
  {
    id: 152,
    name: "Dwayne Johnson",
    banned: "oyuncu aktör The Rock",
  },
  {
    id: 153,
    name: "Gigi Hadid",
    banned: "model manken moda ikonu",
  },
  {
    id: 154,
    name: "Will Smith",
    banned: "oyuncu aktör Fresh Prince",
  },
  {
    id: 155,
    name: "Scarlett Johansson",
    banned: "oyuncu aktris Black Widow",
  },
  {
    id: 156,
    name: "Zlatan Ibrahimović",
    banned: "futbolcu sporcu şutör",
  },
  {
    id: 157,
    name: "Gal Gadot",
    banned: "oyuncu aktris Wonder Woman",
  },
  {
    id: 158,
    name: "Leonardo DiCaprio",
    banned: "oyuncu aktör Titanic",
  },
  {
    id: 159,
    name: "Angelina Jolie",
    banned: "oyuncu aktris Tomb Raider",
  },
  {
    id: 160,
    name: "Brad Pitt",
    banned: "oyuncu aktör Fight Club",
  },
  {
    id: 161,
    name: "Selena Gomez",
    banned: "şarkıcı oyuncu pop yıldızı",
  },
  {
    id: 162,
    name: "Ryan Reynolds",
    banned: "oyuncu aktör Deadpool",
  },
  {
    id: 163,
    name: "Cate Blanchett",
    banned: "oyuncu aktris Carol",
  },
  {
    id: 164,
    name: "Johnny Depp",
    banned: "oyuncu aktör Pirates of the Caribbean",
  },
  {
    id: 165,
    name: "Charlize Theron",
    banned: "oyuncu aktris Mad Max",
  },
  {
    id: 166,
    name: "Tom Hanks",
    banned: "oyuncu aktör Forrest Gump",
  },
  {
    id: 167,
    name: "Blake Lively",
    banned: "oyuncu aktris Gossip Girl",
  },
  {
    id: 168,
    name: "Matthew McConaughey",
    banned: "oyuncu aktör Interstellar",
  },
  {
    id: 169,
    name: "Kate Winslet",
    banned: "oyuncu aktris Titanic",
  },
  {
    id: 170,
    name: "Chris Evans",
    banned: "oyuncu aktör Captain America",
  },
  {
    id: 171,
    name: "Emma Watson",
    banned: "oyuncu aktris Hermione Granger",
  },
  {
    id: 172,
    name: "Robert Downey Jr.",
    banned: "oyuncu aktör Iron Man",
  },
  {
    id: 173,
    name: "Mila Kunis",
    banned: "oyuncu aktris That '70s Show",
  },
  {
    id: 174,
    name: "Hugh Jackman",
    banned: "oyuncu aktör Wolverine",
  },
  {
    id: 175,
    name: "Natalie Portman",
    banned: "oyuncu aktris Black Swan",
  },
  {
    id: 176,
    name: "Bradley Cooper",
    banned: "oyuncu aktör A Star is Born",
  },
  {
    id: 177,
    name: "Jennifer Aniston",
    banned: "oyuncu aktris Friends",
  },
  {
    id: 178,
    name: "Idris Elba",
    banned: "oyuncu aktör Luther",
  },
  {
    id: 179,
    name: "Anne Hathaway",
    banned: "oyuncu aktris The Devil Wears Prada",
  },
  {
    id: 180,
    name: "Joaquin Phoenix",
    banned: "oyuncu aktör Joker",
  },
  {
    id: 181,
    name: "Sandra Bullock",
    banned: "oyuncu aktris The Blind Side",
  },
  {
    id: 182,
    name: "Will Ferrell",
    banned: "oyuncu aktör Anchorman",
  },
  {
    id: 183,
    name: "Penélope Cruz",
    banned: "oyuncu aktris Vicky Cristina Barcelona",
  },
  {
    id: 184,
    name: "Chris Hemsworth",
    banned: "oyuncu aktör Thor",
  },
  {
    id: 185,
    name: "Cameron Diaz",
    banned: "oyuncu aktris Charlie's Angels",
  },
  {
    id: 186,
    name: "Mark Zuckerberg",
    banned: "girişimci Facebook sosyal medya",
  },
  {
    id: 187,
    name: "Neymar Jr.",
    banned: "futbolcu sporcu Paris Saint-Germain",
  },
  {
    id: 188,
    name: "Emma Roberts",
    banned: "oyuncu aktris Scream Queens",
  },
  {
    id: 189,
    name: "George Clooney",
    banned: "oyuncu aktör Ocean's Eleven",
  },
  {
    id: 190,
    name: "Gisele Bündchen",
    banned: "model moda Victoria's Secret",
  },
  { id: 191, name: "Tom Cruise", banned: "oyuncu Hollywood film" },
  { id: 192, name: "Beyoncé", banned: "şarkıcı pop müzik" },
  { id: 193, name: "Elon Musk", banned: "girişimci SpaceX Tesla" },
  { id: 194, name: "Oprah Winfrey", banned: "medya mogul talk show" },
  { id: 195, name: "Dwayne Johnson", banned: "oyuncu güreş WWE" },
  { id: 196, name: "Angelina Jolie", banned: "oyuncu UNHCR aktivist" },
  { id: 197, name: "Leonardo DiCaprio", banned: "oyuncu çevreci aktivist" },
  { id: 198, name: "Serena Williams", banned: "sporcu tenisçi Grand Slam" },
  { id: 199, name: "Keanu Reeves", banned: "oyuncu Matrix motosiklet" },
  {
    id: 200,
    name: "Greta Thunberg",
    banned: "aktivist iklim değişikliği genç",
  },
  { id: 201, name: "Hugh Jackman", banned: "oyuncu aktör Wolverine" },
  { id: 202, name: "Emma Watson", banned: "oyuncu aktris Hermione Granger" },
  {
    id: 203,
    name: "Mark Zuckerberg",
    banned: "girişimci Facebook sosyal medya",
  },
  {
    id: 204,
    name: "Neymar Jr.",
    banned: "futbolcu sporcu Paris Saint-Germain",
  },
  { id: 205, name: "Emma Roberts", banned: "oyuncu aktris Scream Queens" },
  { id: 206, name: "George Clooney", banned: "oyuncu aktör Ocean's Eleven" },
  { id: 207, name: "Gisele Bündchen", banned: "model moda Victoria's Secret" },
  { id: 208, name: "Tom Hanks", banned: "oyuncu aktör Forrest Gump" },
  { id: 209, name: "Chris Evans", banned: "oyuncu aktör Captain America" },
  { id: 210, name: "Emma Stone", banned: "oyuncu aktris La La Land" },
  {
    id: 211,
    name: "Johnny Depp",
    banned: "oyuncu aktör Pirates of the Caribbean",
  },
  { id: 212, name: "Scarlett Johansson", banned: "oyuncu aktris Black Widow" },
  { id: 213, name: "Chris Hemsworth", banned: "oyuncu aktör Thor" },
  { id: 214, name: "Cameron Diaz", banned: "oyuncu aktris Charlie's Angels" },
  { id: 215, name: "Elif Şafak", banned: "yazar romancı feminist" },
  { id: 216, name: "Atalay Demirci", banned: "komedyen oyuncu yazar" },
  { id: 217, name: "Tarkan", banned: "şarkıcı pop müzik" },
  { id: 218, name: "Can Yaman", banned: "oyuncu dizi aşk" },
  { id: 219, name: "Ozan Güven", banned: "oyuncu dizi tiyatro" },
  { id: 220, name: "Yılmaz Erdoğan", banned: "oyuncu tiyatro film" },
  { id: 221, name: "Beren Saat", banned: "oyuncu dizi aşk" },
  { id: 222, name: "Tuba Büyüküstün", banned: "oyuncu dizi aşk" },
  { id: 223, name: "Engin Akyürek", banned: "oyuncu dizi aşk" },
  { id: 224, name: "Serenay Sarıkaya", banned: "oyuncu dizi aşk" },
  { id: 225, name: "Kenan İmirzalıoğlu", banned: "oyuncu dizi film" },
  { id: 226, name: "Bülent Ersoy", banned: "şarkıcı sanatçı estetik" },
  { id: 227, name: "Kıvanç Tatlıtuğ", banned: "oyuncu dizi aşk" },
];

const whoAmIUpdated = whoAmI.map((person) => ({
  ...person,
  banned: person.banned.split(" ").join(" / "),
}));

export default function App() {
  const translateY = useRef(new Animated.Value(0)).current;
  const shakeThreshold = 1.5;
  let lastShakeTime = 0;
  const [message, setMessage] = useState("Salla Beniiigggg");
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
          <Text style={styles.text}>{message}</Text>
          {message !== "Salla Beniiigggg" && (
            <>
              <Text style={styles.bannedHeader}>Bunlar Yasak:</Text>
              <Text style={styles.bannedText}>{bannedWord}</Text>
            </>
          )}
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
    backgroundColor: "#ffcc00",
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
  },
  bannedHeader: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    writingDirection: "rtl",
    marginTop: 10,
  },
});
