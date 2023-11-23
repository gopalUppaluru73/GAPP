import React, { useEffect, useState, useContext } from 'react'
import { 
    View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, StatusBar 
} from 'react-native'
import { Context } from '../config/Provider'

import { Ionicons } from '@expo/vector-icons'
import { colors } from '../config/colors'

export default function Orders({ navigation }) {
    const state = useContext(Context)
    const [orders, setOrders] = useState(state.contact?.order ?? [])

    useEffect(()=>{
        navigation.setOptions({
            headerLeft: ()=>(
                <TouchableOpacity style={{ marginRight: 10 }} onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-undo-sharp" size={24} color="black" />
                </TouchableOpacity>
            )
        })
    })

    useEffect(()=>{
        if(state.contact?.order){
            const arr = state.contact.order.map(item=>{
                let [mm, dd, yy] = item.date.split('/')
                // console.log(new Date(`${yy}-${mm}-${dd}`).getTime())
                let el = {...item, dateId: new Date(`${yy}-${mm}-${dd}`).getTime()}
                return el
            })
            arr.sort((a, b) => b.dateId - a.dateId)
            setOrders(arr)
            // console.log(arr)
        }
    }, [])

    const orderList = orders.length > 0 ? orders.map((item, index)=>(
        <TouchableOpacity key={index} onPress={()=>navigation.navigate('OrderDetail', item.cart)} style={{ marginTop: 5, marginBottom: 5 }}>
            <View key={index} style={styles.order}>
                <View style={{ width: '90%' }}>
                    <Text><Text style={{ fontWeight: 'bold' }}>Purchased Date</Text> - {item.date}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Total Amount Paid</Text> - ${item.amount}</Text>
                </View>
                <View>
                    <Ionicons name="caret-forward-outline" size={24} color="black" />
                </View>
            </View>
        </TouchableOpacity>
    )) : <></>

  return (
    <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                {orderList}
            </ScrollView>
        </View>
        <StatusBar backgroundColor={colors.orange} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1
    },
    container: {
        flex: 1,
        padding: 10
    },
    order: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    }
})