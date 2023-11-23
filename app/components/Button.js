import {TouchableOpacity, View, StyleSheet, Text, ActivityIndicator} from 'react-native'
import { colors } from '../config/colors'

export default function Button({ bgColor, textColor, btnName, onPress, loading, fontSize, padding }) {
  return (
    <TouchableOpacity onPress={()=>onPress ? onPress() : null}>
        <View 
            style={[
                styles.button, 
                {backgroundColor: bgColor ?? colors.orange, padding: padding ?? styles.button.padding}
            ]}>
                {
                    loading
                    ?
                    <ActivityIndicator color={textColor ?? '#fff'} size="small"  />
                    :
                    <Text 
                        style={[
                            styles.buttonText, 
                            {color: textColor ?? '#fff', fontSize: fontSize ?? 14}
                        ]}
                    >
                        {btnName ?? 'Button'}
                    </Text>
                }
            </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: colors.orange,
        borderRadius: 3,
        padding: 12,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})