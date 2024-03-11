import {View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, FlatList} from "react-native";
import Header from "../../Components/Header";
import {AntDesign} from '@expo/vector-icons';
import React, {useEffect, useState} from "react";
import WordDetail from "../../Components/WordDetail";

export default function HomeScreen(props) {
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
        , none: {
            display: "none"
        }
        , flex: {
            display: "flex"
        }

    }
    const [word, setWord] = useState("");
    const [data, setData] = useState([{}]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [wordList, setWordList] = useState([]);
    let timeOutId

    function handleInput(value) {
        if (timeOutId) {
            clearTimeout(timeOutId);
        }
        timeOutId = setTimeout(() => {
            let filtered = wordList.filter(item => item.startsWith(value.toLowerCase())).slice(0, 10);
            setSuggestions(filtered);
        }, 500)
        setWord(value)
        setData([{}]);
    }

    useEffect(() => {
        async function fetchWordList() {
            let re = await fetch("https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt")
            let text = await re.text();
            setWordList(text.split("\n"));
        }

        fetchWordList();
    }, [])
    const isEmpty = () => {
        return Object.keys(data[0]) === undefined || Object.keys(data[0]).length === 0;
    }


    async function fetchData(input) {
        setLoading(true)
        let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + input;
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

    useEffect(() => {
        if(word!==''){
            search();
        }
    }, [])

    function search() {
        setSuggestions(prevState => [])
        fetchData(word);
    }

    function handlePress(input) {
        fetchData(input)
        setWord(input);
    }

    function wordReady() {
        return !data.message && !isEmpty() && !isLoading;
    }

    const suggestionsElements = suggestions.map(item => {
        return <TouchableOpacity key={item} onPress={() => {
            handlePress(item)
        }}>
            <Text style={
                {
                    backgroundColor: "#006ab2",
                    color: 'white',
                    padding: 6,
                    margin: 5,
                    borderRadius: 10
                }
            }>{item}</Text>
        </TouchableOpacity>
    })

    return (
        <View style={styles.main}>
            <Header/>
            <ScrollView style={styles.body}>
                <View style={styles.searchBar}>
                    <TextInput onSubmitEditing={search} value={word} onChangeText={handleInput} style={{fontSize: 15}}
                               placeholder={"Enter word to search"}>
                    </TextInput>
                    <TouchableOpacity onPress={search}>
                        <AntDesign name="search1" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailContainer}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <Text style={{fontSize: 17, fontWeight: "bold"}}>
                            You search: {word}
                        </Text>
                        <TouchableOpacity style={wordReady() ? styles.flex : styles.none} onPress={() => {
                            props.handleAdd(word);
                        }}>
                            <AntDesign name={props.isMyWord(word) ? "heart" : "hearto"}
                                       size={24} color="#ff3a2e"/>
                        </TouchableOpacity>
                    </View>
                    {isLoading && <ActivityIndicator size="large" color="#0000ff"/>}
                    {wordReady() &&
                        <WordDetail data={data[0]} handlePress={handlePress}/>}
                    {data.message && !isLoading && <Text>{data.message}</Text>}
                    {!wordReady() && !isLoading &&
                        <View style={{flexDirection: "row", flexWrap: "wrap"}}>{suggestionsElements}</View>}
                </View>
            </ScrollView>
        </View>
    )
}