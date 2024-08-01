import { StyleSheet, View, Text, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';



export default function TabReturn() {
    const navigation = useNavigation()
    const PressReturn = () => {
        navigation.navigate('Home');
    }
    return (
        <View style={styles.boderTab}>
            <Text style={styles.returnButton} onPress={() => PressReturn()}> {"<"} home
            </Text>

        </View>
    )

}

const styles = StyleSheet.create({
    boderTab: {
        backgroundColor: "rgb(231, 231, 231)",
        padding: 5
    },
    returnButton: {
        color: "rgb(74, 149, 181)",
        fontSize: 20
    }


})