import {Text, View} from "react-native";

export default function Header() {
    const styles = {
        header: {
            backgroundColor: "#056ab2",
            padding: 20,
            paddingTop:30
        },
        appName: {
            color: "#ffffff",
            fontSize:17,
            fontWeight:"bold",
        }
    }
    return (
        <View style={styles.header}>
            <Text   style={styles.appName}>OUR DICTIONARY APP</Text>
        </View>
    )
}