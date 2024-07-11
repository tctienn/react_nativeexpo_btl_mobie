import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from "react-native";


export default function Load() {
    const navigation = useNavigation()
    const onpressReturn = () => {
        navigation.navigate('Home');
    }
    return (
        <TouchableWithoutFeedback onPress={() => onpressReturn()}>
            <View style={styles.containers} >

                <Image source={require('@/assets/images/loader.gif')} style={styles.img} />
                <Text style={styles.text}>
                    Đang tải ..............
                </Text>

                <Text style={styles.text2}>
                    Đang trong quá trình load hoặc không có dữ liệu press vào màn hình để quay lại
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    containers: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',

    },
    img: {
        width: "40%",
        height: "40%"

    },
    text: {
        width: "80%",
        textAlign: 'center'
    },
    text2: {
        width: "90%",
        fontSize: 10,
        position: "absolute",
        bottom: 0
    }

})