import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'

export default function FilterItem({filter, type, img, bg, index}) {
  return (
    <TouchableOpacity onPress={()=>filter ? filter(type, index) : null}>
    <View style={[styles.view, {backgroundColor: bg}]}>
        <Text>{type ?? ''}</Text>
        <Image source={img} style={styles.img} />
    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    img: { 
        position: 'absolute', 
        right: 5, 
        width: 35, 
        height: 35, 
        transform: [{rotate: '90deg'}] 
    },
    view: {
        height: 50,
        width: 110, 
        padding: 10, 
        transform: [{rotate: '-90deg'}, {translateX: -40}],
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative', 
    }
})