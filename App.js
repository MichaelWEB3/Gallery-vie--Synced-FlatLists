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
  /*
  const [listPhontos, setlistPhotos] = useState([
    'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=800x600&vertical=top',
    'https://cdn.dribbble.com/users/3281732/screenshots/6784133/samji_illustrator_4x.jpeg?compress=1&resize=800x600&vertical=top',
    'https://cdn.dribbble.com/users/3281732/screenshots/10940512/media/b2a8ea95c550e5f09d0ca07682a3c0da.jpg?compress=1&resize=800x600&vertical=top',
    'https://cdn.dribbble.com/users/3281732/screenshots/6629190/samji_illustrator__.jpg?compress=1&resize=800x600&vertical=top',
    'https://cdn.dribbble.com/users/3281732/screenshots/6852350/samji_illustrator.jpeg?compress=1&resize=800x600&vertical=top',
    'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=800x600&vertical=top',
    'https://cdn.dribbble.com/users/3281732/screenshots/6784133/samji_illustrator_4x.jpeg?compress=1&resize=800x600&vertical=top',
    'https://cdn.dribbble.com/users/3281732/screenshots/10940512/media/b2a8ea95c550e5f09d0ca07682a3c0da.jpg?compress=1&resize=800x600&vertical=top',
    'https://cdn.dribbble.com/users/3281732/screenshots/6629190/samji_illustrator__.jpg?compress=1&resize=800x600&vertical=top',
    'https://cdn.dribbble.com/users/3281732/screenshots/6852350/samji_illustrator.jpeg?compress=1&resize=800x600&vertical=top',
  ])*/
  const [select, setSelect] = useState(listPhontos[1])

  useEffect(() => {
    async function getPhoto() {
      const date = await axios.get('https://api.pexels.com/v1/curated?page=8&per_page=10', {
        headers: {
          Authorization: '563492ad6f91700001000001be32815a95b3476794990b17a32c5505'
        }
      })
      console.log(date.data.photos[0].src?.original)
      setSelect(date.data.photos[0].src?.original)
      setlistPhotos(date.data.photos)
    }
    getPhoto()

  }, [])


  return (
    <View style={{ flex: 1, backgroundColor: '#000' }} >
      <StatusBar hidden />
      {/**listPhontos && 
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal
          pagingEnabled
          data={listPhontos}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return (
              <View style={{ flex: 1 }}>
                <Image
                  resizeMode='cover'
                  style={{ width: 500, height: 800 }}
                  source={{ uri: item }}
                />
              </View>
            )
          }}

        />
        */ }
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
