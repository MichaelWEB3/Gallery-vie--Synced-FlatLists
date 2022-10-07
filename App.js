import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  FlatList,
  Image,
  Animated,
  TouchableOpacity

} from 'react-native';
const { width, height } = Dimensions.get('screen')
const App = () => {
  const imageW = width * 0.7;
  const imageH = height * 0.7;
  const [listPhontos, setlistPhotos] = useState([])
  const [select, setSelect] = useState(listPhontos[1])

  useEffect(() => {
    async function getPhoto() {
      const date = await axios.get('https://api.pexels.com/v1/curated?page=3&per_page=10', {
        headers: {
          Authorization: '563492ad6f91700001000001be32815a95b3476794990b17a32c5505'
        }
      })
      setSelect(date.data.photos[0].src?.original)
      setlistPhotos(date.data.photos)
    }
    getPhoto()

  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }} >
      <StatusBar hidden />
      <View style={{ flex: 1 }}>
        {listPhontos &&
          <Image
            resizeMode='cover'
            style={{ width: 500, height: 800 }}
            source={{ uri: select }}
          />
        }
      </View>
      {listPhontos &&
        <View style={{ height: 100, position: 'absolute', zIndex: 50, bottom: 10, backgroundColor: "transparent" }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            horizontal
            data={listPhontos}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => {
                  setSelect(item?.src?.original)
                }}>
                  <Image
                    style={{ width: 75, height: 75, margin: 5, padding: 5, borderRadius: 10, borderWidth: item?.src?.original == select ? 5 : 1, borderColor: '#FFF' }}
                    source={{ uri: item?.src?.original }}
                  />
                </TouchableOpacity>
              )
            }}
          />
        </View>
      }
    </View>
  );
};

export default App;
