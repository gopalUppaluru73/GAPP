import React, { useState, useEffect } from 'react'
import { 
    View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar 
} from 'react-native'
import { colors } from '../config/colors'

import { Ionicons } from '@expo/vector-icons'

import { app } from '../config/firebase'
import { getDatabase, ref, onValue } from 'firebase/database'
import { tablenames } from '../config/tables'
import Logo from '../components/Logo'
import Padder from '../components/Padder'

export default function AdminOrders({ navigation }) {
    const [orders, setOrders] = useState([])

    // Firebase
    const db = getDatabase(app)
    const dbref = ref(db, tablenames.orders)

    useEffect(()=>{
        onValue(dbref, snapshot=>{
            if(snapshot.exists()){
                const data = snapshot.val()
                const keys = Object.keys(data)
                const arr = []
                keys.forEach(key => arr.push({...data[key], id: key}))
                setOrders(arr)
                // console.log('orders',arr)
            }else{
                // console.log('empty')
                setOrders([])
            }
        })
    }, [])

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={()=>navigation.navigate('AdminOrderDetail', item)} style={{ padding: 10 }}>
        <View style={styles.contact}>
            <View>
                <Ionicons name="radio-button-on" size={24} color="black" />
            </View>
            <View style={{ flex: 1, marginLeft: 10, marginRight: 10}}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Address</Text>
                <Padder height={5} />
                <Text>{item.contact?.name ?? ''}</Text>
                <Text>{item.contact?.address ?? ''}</Text>
                <Text><Text style={{ fontWeight: 'bold'}}>Date of Purchase:</Text> {item?.date ?? ''}</Text>
            </View>
        </View>
        </TouchableOpacity>
    )
  return (
    <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
            <View style={styles.logo}>
                <TouchableOpacity style={styles.arrowLeft} onPress={()=>navigation.goBack()}>
                    <View style={styles.arrowview}>
                        <Ionicons name="arrow-undo-sharp" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <Logo />
            </View>
            <View style={{ flex: 1 }}>
                {
                orders.length > 0
                ?
                <FlatList data={orders} renderItem={renderItem} keyExtractor={item=>item.id} />
                :
                <></>
                }
            </View>
        </View>
        <StatusBar backgroundColor={colors.orange} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    arrowview: {
        width: 40, 
        height: 40, 
        backgroundColor:'#fff', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 40
    },
    contact: {
        padding: 15,
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
    arrowLeft: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    logo: {
        position: 'relative',
        alignItems: 'center',
        backgroundColor: colors.orange
    },
    safearea: {
        flex: 1
    },
    container: {
        flex: 1
    }
})