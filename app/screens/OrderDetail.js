import React, { useState, useEffect } from 'react'
import { 
    View, Text, SafeAreaView, StyleSheet, StatusBar, Image, FlatList, Dimensions, TouchableOpacity 
} from 'react-native'
import { colors } from '../config/colors'

import { Ionicons } from '@expo/vector-icons'
import Padder from '../components/Padder'

export default function OrderDetail({ navigation, route }) {
    const [sw, setSW] = useState(0)

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
        const w = Dimensions.get('screen').width-120
        setSW(w)
    }, [])

    const renderItem = ({item, index}) =>(
        <View key={index}>
            <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderRadius:10, padding: 10 }}>
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
            <FlatList data={route.params} renderItem={renderItem} keyExtractor={item=>item.id} />
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
    }
})