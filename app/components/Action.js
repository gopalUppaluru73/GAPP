import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default function Action({text, addPress, minusPress}) {
  return (
    <>
        <View style={styles.actionBtn}>
            <TouchableOpacity onPress={()=>minusPress ? minusPress() : null} style={{ padding: 2 }}>
                <AntDesign name="minus" size={18} color="#fff" />
            </TouchableOpacity>
        </View>
        <View style={[styles.actionBtn, {alignItems: 'center'}]}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff'}}>{text ?? 0}</Text>
        </View>
        <View style={[styles.actionBtn, {alignItems: 'flex-end'}]}>
            <TouchableOpacity onPress={()=>addPress ? addPress() :  null} style={{ padding: 2 }}>
                <AntDesign name="plus" size={18} color="#fff" />
            </TouchableOpacity>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    actionBtn: {
        flex: 1
    }
})