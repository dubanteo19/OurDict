import {Alert, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {AntDesign, Entypo,Feather} from "@expo/vector-icons";



export default function MyWordScreen(props) {
    const styles = {
        word: {
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth:0.5,
            paddingBottom:3,
            paddingTop:2
        },
        searchBar: {
            borderStyle: "solid",
            borderColor: "grey",
            borderWidth: 1,
            padding: 10,
            margin: 10,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: 'space-between'
        },
        myWord: {
            padding: 10,
            margin: 10,
            borderTopWidth:3
        }
    }
    const [filteredWords,setFilteredWords]= useState(props.myWords);
    useEffect(()=>{
        setFilteredWords(props.myWords)
    },[props.myWords])
    function search(input){
       if(input.length>0){
           let filtered = filteredWords.filter(word=>word.startsWith(input));
           setFilteredWords(filtered);
       }
       else{
           setFilteredWords(props.myWords);
       }
    }

    function deleteConfirm(word) {
        Alert.alert("Delete word?", "Are you sure you want to delete this word from your word list?", [
            {
                text: "Delete",
                onPress: () => {
                    props.handleDelete(word)
                    ToastAndroid.show("word deleted successfully!", ToastAndroid.SHORT)
                }
            }, {
                text: "Cancel",
                style: "destructive"
            }

        ])
    }

    const myWordElement = filteredWords.map((item, index) => {
        return <View style={styles.word} key={index}>
            <Text style={{color: "#006ab2",fontSize:17}}>{item}</Text>
            <TouchableOpacity onPress={() => {
                deleteConfirm(item)
            }}>
                <Feather name="trash" size={24} color="black" />
            </TouchableOpacity>
        </View>
    })

    return (
        <ScrollView>
            <View style={styles.searchBar}>
                <TextInput style={{fontSize: 15}} onChangeText={search}
                           placeholder={"Enter word to search"}>
                </TextInput>
            </View>
            <View style={styles.myWord}>
                {myWordElement}
            </View>
        </ScrollView>
    )
}