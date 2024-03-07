import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React, {useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {AntDesign, Entypo, MaterialIcons} from "@expo/vector-icons";
import MyWordScreen from "./Screens/MyWordScreen/MyWordScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TranslationScreen from "./Screens/TranslationScreen/TranslationScreen";
import AboutUs from "./Screens/AboutUsScreen/AboutUs";


export default function App() {
    const Tab = createBottomTabNavigator();
    const [myWords, setMyWords] = useState([]);

    useEffect(() => {
        async function loadStorage() {
            let res = await AsyncStorage.getItem("myWords");
            if (res) {
                setMyWords(JSON.parse(res))
            }
        }

        loadStorage();
    }, []);
    useEffect(() => {
        if (myWords !== '') {
            save();
        }
    }, [myWords])

    async function save() {
        await AsyncStorage.setItem("myWords", JSON.stringify(myWords));
        let a = await AsyncStorage.getItem("myWords");
        console.log(a)
    }

    function handleDelete(word) {
        setMyWords(myWords.filter(item => item !== word));
    }

    function handleAdd(word) {
        if (!isMyWord(word)) {
            setMyWords(prevState => {
                return [...prevState, word];
            });
            ToastAndroid.show("New word added to My Word list successfully", ToastAndroid.SHORT)
        } else {
            ToastAndroid.show("This word's already in your word list!", ToastAndroid.SHORT)
        }

    }

    function isMyWord(word) {
        return myWords.includes(word);
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
    });
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" options={
                    {
                        tabBarIcon: ({color, size}) => (
                            <Entypo name="home" size={24} color="black"/>
                        ),
                        headerShown: false
                    }}
                            children={() => <HomeScreen isMyWord={isMyWord} handleAdd={handleAdd}/>}
                />
                <Tab.Screen name="My word" options={
                    {
                        tabBarIcon: ({color, size}) => (
                            <AntDesign name="book" size={24} color="black"/>
                        ),
                        tabBarBadge: myWords.length,
                        headerTitle: "MY WORDS LIST",
                    }} children={() => <MyWordScreen
                    myWords={myWords}
                    handleDelete={handleDelete}
                />}/>
                <Tab.Screen name="Translator" options={
                    {
                        tabBarIcon: ({color, size}) => (
                            <MaterialIcons name="g-translate" size={24} color="black"/>
                        ),
                        headerTitle: "Translator",
                    }} children={() => <TranslationScreen

                />}/>
                <Tab.Screen name="About us" options={
                    {
                        tabBarIcon: ({color, size}) => (
                            <AntDesign name="idcard" size={24} color="black"/>
                        ),
                        headerTitle: "About us",
                    }} children={() => <AboutUs

                />}/>
            </Tab.Navigator>

        </NavigationContainer>
    )
}


