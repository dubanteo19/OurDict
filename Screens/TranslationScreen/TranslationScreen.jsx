import {ActivityIndicator, Keyboard, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";

export default function TranslationScreen() {
    const [translatedText, setTranslatedText] = useState("");
    const [text, setText] = useState("");
    const [loading,setLoading] = useState(false)
    async function translate(target) {
        let url;
        Keyboard.dismiss()
        if (target === "vi") {
            url = "https://api.mymemory.translated.net/get?q=" + text + "!&langpair=en|vi";
        } else {
            url = "https://api.mymemory.translated.net/get?q=" + text + "!&langpair=vi|en";
        }
        setLoading(true)
        let re = await fetch(url);
        let data = await re.json();
        setTranslatedText(data.responseData.translatedText);
        setLoading(false)
    }

    const styles = {
        textContainer: {
            backgroundColor: "white",
            padding: 10,
            fontSize: 18,
            margin: 10,
            borderWidth: 1,
            borderColor: "grey",
            borderRadius: 10
        },
        btn: {
            backgroundColor: "#056ab2",
            padding: 8,
            color: "white",
            fontSize: 14,
            borderRadius: 10,
            fontWeight: "bold"
        },
        label: {
            fontSize:20,
            padding:10,
            fontWeight: "bold"
        }
    }
    return (
        <View>
            <Text style={styles.label}>Origin</Text>
            <TextInput style={styles.textContainer} multiline={true} numberOfLines={8} onSubmitEditing={translate}
                       onChangeText={(text) => {
                           setText(text)
                       }} value={text} placeholder="Enter text you want to translate"></TextInput>
            <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 30}}>
                <TouchableOpacity onPress={() => {
                    translate("eng")
                }}>
                    <Text style={styles.btn}>Vietnamese to English</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    translate("vi")
                }}>
                    <Text style={styles.btn}>English to Vietnamese</Text>
                </TouchableOpacity>
            </View>
            {!!loading && <ActivityIndicator size="large" color="#056ab2" />}
            <Text style={styles.label}>Target
            </Text>
            <View style={styles.textContainer}>
                <Text style={{height: 200, fontSize: 18}}>{translatedText}

                </Text>
            </View>
        </View>
    )
}