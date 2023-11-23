import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '../config/colors'

export default function AddMinusQty({qty, fontSize, addPress, minusPress}) {
  return (
    <>
        <View style={styles.actionview}>
            <TouchableOpacity onPress={()=>minusPress ? minusPress() : null} style={{ padding: 5 }}>
                <AntDesign name="minus" size={fontSize ?? 20} color="#fff" />
            </TouchableOpacity>
        </View>
        <View style={styles.actionview}>
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: fontSize ?? 20, fontWeight: 'bold' }}>
                {qty ?? '0'}
            </Text>
        </View>
        <View style={styles.actionview}>
            <TouchableOpacity onPress={()=>addPress ? addPress() : null} style={{ padding: 5 }}>
                <AntDesign name="plus" size={fontSize ?? 20} color="#fff" />
            </TouchableOpacity>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    action: {
        width: '50%',
        padding: 10,
        borderRadius: 50,
        backgroundColor: colors.orange,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    actionview: {
        width: '33.33%',
        alignItems: 'center'
    },
})