import {FlatList, Image, LogBox, ScrollView, Text, View} from "react-native";
import minh from "./minh.jpg"
import phuong from "./phuong.jpg"
import ngan from "./ngan.jpg"
import lap from "./lap.jpg"
import quynh from "./quynh.jpg"

export default function () {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    const styles = {
        header: {
            paddingTop:10,
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "center"
        },
        members: {
            padding: 30,
            fontSize: 20,

        }
    }
    const members = [
        {
            name: "Du Thanh Minh",
            id: 21130444,
            role: "Team lead, developer",
            img: minh
        },
        {
            name: "Nguyễn Hoàng Lập",
            id: 21130451,
            role: "Developer,design,plan ",
            img: lap
        },
        {
            name: "Nguyễn Thị Chúc Ngân",
            id: 21130451,
            role: "Developer, documentations",
            img: ngan
        },
        {
            name: "Lại Thị Bích Phượng",
            id: 21130451,
            role: "Developer, UI/UX",
            img: phuong
        },
        {
            name: "Liêu Thị Diễm Quỳnh",
            id: 21130509,
            role: "Developer, design",
            img: quynh

        },
    ];
    return (
        <ScrollView>
            <Text  style={styles.header}>This awsome app is developed by
                <Text style={{fontStyle: "italic", color: "#006ab2"}}> dbt's team </Text>
                under help of Vo Tan Toan lecturer
            </Text>
            <View style={styles.members}>
                <Text style={{fontSize: 18, margin: 10, fontWeight: "bold"}}>
                    OUR TEAM MEMBERS:
                </Text>
                <FlatList data={members}
                          keyExtractor={item => item.role}
                          renderItem={({item}) => {
                              return <View
                                  style={{
                                      flexDirection: "row",
                                      paddingVertical: 10,
                                      borderTopWidth: 2
                                  }}>
                                  <View>
                                      <Image style={{
                                          width: 80,
                                          marginRight: 10,
                                          height: 80, borderRadius: 50
                                      }} source={item.img}></Image>
                                  </View>
                                  <View>
                                      <Text>Full name:
                                          <Text
                                              style={{fontWeight: "bold"}}>{item.name}</Text></Text>
                                      <Text>Student id: {item.id}</Text>
                                      <Text>Role: {item.role}</Text>
                                  </View>
                              </View>
                          }}/>
            </View>
        </ScrollView>
    )
}