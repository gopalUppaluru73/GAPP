import React, { useEffect, useState } from 'react'
import { 
    View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image, 
    Dimensions, FlatList
} from 'react-native'
import { colors } from '../config/colors'

import Padder from '../components/Padder'
import Logo from '../components/Logo'
import { Ionicons } from '@expo/vector-icons'

export default function AdminOrderDetail({navigation, route}) {
    const [sw, setSw] = useState(0)

    useEffect(()=>{
        const w = Dimensions.get('screen').width-120
        setSw(w)
    })

    const renderItem = ({item, index}) => (
        <View key={index}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 50 }}>
                    <Image source={{ uri: item.img }} style={{ height: 50, width: 50, borderRadius: 10 }} />
                </View>
                <View style={{ width: sw, marginLeft: 10, marginRight: 10 }}>
                    <Text 
                        numberOfLines={1} 
                        ellipsizeMode='tail' 
                        style={{ fontSize: 17, fontWeight: 'bold' }}>{item.name}</Text>
                </View>
                <View style={{ width: 50 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{item.qty}</Text>
                </View>
            </View>
            <Padder height={8} />
        </View>
    )
  return (
    <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
            <View style={styles.logo}>
                <Padder height={10} />
                <TouchableOpacity style={styles.arrowLeft} onPress={()=>navigation.goBack()}>
                    <View style={styles.arrowview}>
                        <Ionicons name="arrow-undo-sharp" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}><Logo /></View>
                <Text style={{ textAlign: 'center', fontSize: 22, color: '#fff' }}>Order Details - {route.params.date}</Text>
                <Padder height={20} />
            </View>

            <View style={styles.contact}>
                <View>
                    <Ionicons name="radio-button-on" size={24} color="black" />
                </View>
                <View style={{ flex: 1, marginLeft: 10, marginRight: 10}}>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>Address</Text>
                    <Padder height={5} />
                    <Text>{route.params.contact.name}</Text>
                    <Text>{route.params.contact.address}</Text>
                    <Text>{route.params.contact.contact}</Text>
                </View>
            </View>
            <Padder height={20} />
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Ionicons name="radio-button-on" size={24} color="black" />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10, marginRight: 10}}>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Purchased Items</Text>
                    </View>
                </View>
                <Padder />
                <FlatList data={route.params.cart} renderItem={renderItem} keyExtractor={item=>item.id} />
            </View>
        </View>
        <StatusBar backgroundColor={colors.orange} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    arrowLeft: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 999
    },
    arrowview: {
        width: 40, 
        height: 40, 
        backgroundColor:'#fff', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 40
    },
    logo: {
        position: 'relative',
        backgroundColor: colors.orange
    },
    container: {
        flex: 1,
    },
    card: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        elevation: 3,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
            height: 0.3,
            width: 0.1,
        }
    },
    contact: {
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderRadius: 5,
        elevation: 3,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
            height: 0.3,
            width: 0.1,
        }
    },
    safearea: {
        flex: 1
    }
})