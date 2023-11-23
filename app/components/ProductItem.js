import { 
    Image, StyleSheet, Text, TouchableOpacity, View 
} from 'react-native'

import Padder from './Padder'

export default function ProductItem({product, onPress}) {
    const [dollar, cent] = product.price.toString().split('.')
  return (
    <View style={styles.product}>
        <TouchableOpacity onPress={()=>onPress ? onPress(product) : null}>
            <View style={styles.productItem}>
                <Image source={{ uri: product.img }} style={{ width: 100, height: 100 }} />
                <Padder />
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.name}>
                    {product.name}
                </Text>
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>${dollar}</Text>
                    <Text style={{ fontSize: 12, color: 'rgb(100,100,100)' }}>
                        {cent ? `.${cent}` : ''}
                    </Text>
                </Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    name: { 
        fontWeight: 'bold', 
        fontSize: 16,
    },
    product: {
        width: '48%',
        marginTop: 10,
        marginBottom: 10
    },
    productItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        padding: 10,
        alignItems: 'center'
    },
})