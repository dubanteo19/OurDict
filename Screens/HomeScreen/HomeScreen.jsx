import {View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, FlatList} from "react-native";
import Header from "../../Components/Header";
import {AntDesign} from '@expo/vector-icons';
import React, {useEffect, useState} from "react";
import WordDetail from "../../Components/WordDetail";

export default function HomeScreen() {
    const styles = {
        main: {flex: 1},
        body: {
            flex: 1
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
        detailContainer: {
            padding: 20,
        }

    }
    const [word, setWord] = useState("");
    const [data, setData] = useState([{}]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    let timeoutId;

    function handleInput(value) {
        setWord(value);
    }

    const renderSuggestion = ({item}) => (
        <View style={{padding: 10}}>
            <Text>{item}</Text>
        </View>
    );

    async function fetchData() {
        setLoading(true)
        let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
        try {
            const res = await fetch(url);
            const dataJson = await res.json();
            if (dataJson) {
                setData(dataJson);
                setLoading(false);
            }
        } catch (e) {
            setError("Oop! Sometimes went wrong");
        }
    }

    function search() {
        fetchData();
    }

    function handlePress(word) {
        setWord(word);
        search();
    }

    return (
        <View style={styles.main}>
            <Header/>
            <ScrollView style={styles.body}>
                <View style={styles.searchBar}>
                    <TextInput value={word} onChangeText={handleInput} style={{fontSize: 15}}
                               placeholder={"Enter word to search"}>
                    </TextInput>

                    <TouchableOpacity onPress={search}>
                        <AntDesign name="search1" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={{fontSize: 17, fontWeight: "bold"}}>
                        You search: {word}
                    </Text>
                    {isLoading && <ActivityIndicator size="large" color="#0000ff"/>}
                    {data[0].word && !isLoading && <WordDetail data={data[0]} handlePress={handlePress}/>}
                </View>
            </ScrollView>
        </View>
    )
}