import {View, Text, StyleSheet} from 'react-native'

export default function TextList({ label, text, fontSize, fontWeight, lineColor }) {
  return (
    <View style={[styles.container, {borderBottomColor: lineColor ?? styles.container.borderBottomColor}]}>
        <View style={styles.left}>
            <Text style={{ fontSize: fontSize ?? 14, fontWeight: fontWeight ?? 'normal', textAlign: 'left'}}>
                {label ?? ''}
            </Text>
        </View>
        <View style={styles.right}>
            <Text style={{ fontSize: fontSize ?? 14, fontWeight: fontWeight ?? 'normal', textAlign: 'right'}}>
                {text ?? ''}
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5
    },
    left: {
        width: '60%',
    },
    right: {
        width: '40%'
    }
})