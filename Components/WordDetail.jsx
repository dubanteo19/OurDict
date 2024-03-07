import {View, Text, TouchableOpacity, FlatList, ScrollView} from "react-native";
import React from "react";
import {AntDesign} from "@expo/vector-icons";
import {Audio} from 'expo-av';
import {Entypo} from '@expo/vector-icons';

export default function WordDetail(props) {
    const playSound = async (audio) => {
        const sound = new Audio.Sound();
        await sound.loadAsync({
            uri: audio
        });
        await sound.playAsync();

    }
    const styles = {
        definitions: {
            borderBottomColor: "grey",
            borderBottomWidth: 1
        },
        pressWord: {
            backgroundColor: "#006ab2",
            padding: 10,
            color: "white",
            borderRadius: 10,
            margin: 5
        },
        synonyms: {
            flexDirection: "row",
            flexWrap: "wrap"
        },
        partOfSpeech: {
            borderBottomWidth: 4,
            borderBottomColor: "#006ab2",
            paddingBottom: 10
        }
    }
    const meanings = props.data.meanings.map((item, index) => {
        return (
            <View style={styles.partOfSpeech}>
                <Text>Part of speech: <Text style={{fontWeight: "bold"}}>{item.partOfSpeech}</Text></Text>
                <Text style={{fontWeight: "bold"}}>Definitions</Text>
                <View style={styles.definitions}>
                    {item.definitions.slice(0, 5).map((item) => {
                        return (<View>
                            <Text><Entypo name="dot-single" size={24} color="black"/> {item.definition}</Text>
                        </View>)
                    })}
                </View>
                {item.synonyms.length > 0 && <Text style={{fontWeight: "bold"}}>Synonyms</Text>}
                <View style={styles.synonyms}>
                    {item.synonyms.map((item) => {
                        return (<TouchableOpacity onPress={() => {
                            props.handlePress(item)
                        }}>
                            <Text style={styles.pressWord}>{item}</Text>
                        </TouchableOpacity>)
                    })}
                </View>
                {item.antonyms.length > 0 && <Text style={{fontWeight: "bold"}}>Antonyms</Text>}
                <View style={styles.synonyms}>
                    {item.antonyms.map((item) => {
                        return (<TouchableOpacity onPress={() => {
                            props.handlePress(item)
                        }}>
                            <Text style={styles.pressWord}>{item}</Text>
                        </TouchableOpacity>)
                    })}
                </View>
            </View>
        )
    })
    const phonetics = props.data.phonetics.filter(item => {
        return item.audio && item.text
    })
        .map((item, index) => {
            return (
                <View style={{flexDirection: "row", marginRight: 20, width: 100}}>
                    <Text>{index === 0 ? "US" : "UK"} {item.text}    </Text>
                    <TouchableOpacity onPress={() => {
                        playSound(item.audio)
                    }}>
                        <AntDesign name="sound" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            )

        })
    return (
        <View>
            <View style={{flexDirection: "row"}}>
                {phonetics}
            </View>
            {props.data.origin && <View>
                <Text><Text style={{fontWeight: "bold"}}>Origin: </Text>{props.data.origin}</Text>
            </View>}
            <View style={styles.meanings}>
                {meanings}
            </View>
        </View>
    )
}