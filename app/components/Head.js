import { useContext } from 'react'
import { 
    TouchableOpacity, View, Text, Image, StyleSheet, Dimensions, TextInput 
} from 'react-native'

import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'
import { colors } from '../config/colors'

import { Context } from '../config/Provider'
import head from '../assets/head.png'
import Padder from './Padder'
import { Feather } from '@expo/vector-icons';

export default function Head({ goToProfile, goToCart, search, showSearch, reset }) {
    const state = useContext(Context)
  return (
    <>
        <View style={styles.container}>
            <View style={styles.imageview}>
                <TouchableOpacity onPress={()=>goToProfile ? goToProfile() : null}>
                    <Image source={head} style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.middle}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.name}>
                    Hi, {state.contact?.firstname ?? 'User'}
                </Text>
                <Text style={{ color:'rgb(80,80,80)' }}>
                    Let's find quality food <FontAwesome5 name="smile-wink" size={20} color={colors.orange} />
                </Text>
            </View>
            <View style={styles.cartview}>
                <TouchableOpacity onPress={()=>goToCart ? goToCart() : null} style={styles.button}>
                    <View style={{ position: 'absolute', left: 5 }}>
                        <FontAwesome5 name="shopping-cart" size={20} color="#000" />
                    </View>
                    <Text style={styles.qtyText}>{state.cartQty}</Text>
                </TouchableOpacity>
            </View>
        </View>
        <Padder />
        {
            showSearch
            ?
            <View style={styles.textinputview}>
                <Feather name="search" size={20} color="black" />
                <TextInput style={styles.textinput} onChangeText={(text)=>search ? search(text) : null} />
                <TouchableOpacity onPress={()=>reset ? reset() : null}>
                    <Fontisto name="equalizer" size={20} color="black" />
                </TouchableOpacity>
            </View>
            :
            <></>
        }
    </>
  )
}

const styles = StyleSheet.create({
    button: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row'
    },
    cartview: { 
        width: 60, 
        padding: 2, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageview: { 
        width: 60, 
        padding: 2, 
        alignItems: 'center' 
    },
    middle: { 
        width: Dimensions.get('screen').width-120, 
        padding: 5, 
    },
    name: { 
        fontSize: 20, 
        fontWeight: 'bold' 
    },
    qtyText: { 
        position: 'absolute', 
        color: colors.orange, 
        fontWeight: 'bold', 
        right: 10, 
        fontSize: 14 
    },
    textinput: {
        width: '90%',
        padding: 10
    },
    textinputview: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3,
        paddingRight: 15,
        paddingLeft: 5
    }
})