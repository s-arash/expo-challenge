/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Button,
  Image,
  ImageSourcePropType,
  ImageURISource,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextStyle,
  useColorScheme,
  View,
} from 'react-native';

type FairyTrailMode = "Dating" | "Friends"
interface Profile {
  images: Array<string>;
  name: string;
  country: string,
  age: string,
  aboutMe: string;
  myValues: string;
  myHobbies: string;
  instagram: string;
  fairyTrailMode: FairyTrailMode;
}
const ProfileView = (props: { initProfile: Profile }) => {
  const [profile, setProfile] = React.useState<Profile>(props.initProfile);
  const isDarkMode = useColorScheme() === 'dark';

  const titleStyle: TextStyle = {
    fontSize: 20,
    fontWeight: '300',
    marginTop: 25,
    marginLeft: 0,
    color: "#10A010"
  };
  const sectionStyle = {
    marginLeft: 16
  };
  return (
    <ScrollView style={{ padding: 10 }} >
      <Image source={profile.images.map((x) => { return { uri: x, width: 400, height: 400 } })[0]} />
      <Text>{profile.name + ", " + profile.country + ", " + profile.age}</Text>
      <Text>{profile.aboutMe}</Text>
      <Text style={titleStyle}>My values ...</Text>
      <Text style={sectionStyle}>{profile.myValues}</Text>
      <Text style={titleStyle}>My hobbies ...</Text>
      <Text style={sectionStyle}>{profile.myHobbies}</Text>
      <Text style={titleStyle}>Instagram (only shown to your adventure matches)</Text>
      <Text style={sectionStyle}>{profile.instagram}</Text>
      <Text style={titleStyle}>Fairytrail Mode (tell others you are not open to dating)</Text>
      <View style={sectionStyle}>
        <FairyTrailModeModalPicker mode={profile.fairyTrailMode} modeChanged={(mode) => {
          setProfile({ ...profile, fairyTrailMode: mode });
        }} />
      </View>
      <Text></Text>
    </ScrollView>
  );
};

const FairyTrailModeModalPicker = (props: { mode: FairyTrailMode, modeChanged: (mode: FairyTrailMode) => any }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentMode, setCurrentMode] = React.useState<FairyTrailMode>(props.mode);
  const modeStyle = {
    fontSize: 24,
    color: "#000000",
    margin: 3
  };
  const modeSelectedStyle = {
    ...modeStyle,
    fontWeight: '400',
    color: selectedColor
  };

  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}><Text>{props.mode == "Dating" ? "Dating and Friends" : "Only Friends"}</Text></Pressable>
      <Modal animationType='fade' transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ justifyContent: 'center', flexDirection: 'column', flex: 0 }}>
              <Text style={{ ...modeStyle, alignSelf: 'center', marginBottom: 20 }}>Choose Mode</Text>
              <Pressable style={{ alignSelf: 'center' }} onPress={() => { setCurrentMode("Dating") }}>
                <Text style={currentMode == "Dating" ? modeSelectedStyle : modeStyle}>Dating & Friends</Text>
              </Pressable>
              <Pressable style={{ alignSelf: 'center' }} onPress={() => { setCurrentMode("Friends") }}>
                <Text style={currentMode == "Friends" ? modeSelectedStyle : modeStyle}>Only Friends</Text>
              </Pressable>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Button title='Cancel' onPress={() => {
                setCurrentMode(props.mode);
                setModalVisible(false);
              }} />
              <Button title='Select' onPress={() => {
                props.modeChanged(currentMode)
                setModalVisible(false);
              }} />
            </View>
          </View>
        </View>
      </Modal>
    </View>);
}

const App = () => {
  return (<View>
    <ProfileView initProfile={{
      images: ["https://avatars.githubusercontent.com/u/4473311?v=4"],
      name: "Taige", aboutMe: "Most adventerous experience: Iceland blah blah. \n\nTop wishes: Blah blah.",
      country: "United States", age: "34", myValues: "kindnesss, whatever",
      myHobbies: "making stupid profiles", instagram: "@numbskull88", fairyTrailMode: "Dating"
    }} />
  </View>)
};

const selectedColor = "#10A010";
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 2,
    padding: 20,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});

export default App;
