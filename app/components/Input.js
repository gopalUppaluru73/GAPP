import {TextInput, StyleSheet} from 'react-native'

export default function Input(props) {
  return (
        <TextInput
            {...props}
            style={styles.textInput}
            value={props.value}
            onChangeText={text=>props.onChange ? props.onChange({[props.name]: text}) : null} 
        />
    )
}

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 3,
        padding: 10
    }
})