import { useEffect, useContext} from 'react'
import { Context } from '../config/Provider'
import { 
    SafeAreaView, View, TouchableOpacity, StyleSheet, StatusBar, Text 
} from 'react-native'
import Padder from '../components/Padder'

import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import { colors } from '../config/colors'
import Logo from '../components/Logo'
import Button from '../components/Button'

export default function UserDash({navigation}) {
    const state = useContext(Context)

    useEffect(()=>{
        navigation.setOptions({
            headerLeft: ()=>(
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{ marginRight: 20 }}>
                    <Ionicons name="arrow-undo-sharp" size={24} color="black" />
                </TouchableOpacity>
            )
        })
    })

    useEffect(()=>{
        //
    }, [])

  return (
    <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
            <Padder height={20} />
            <View style={{ alignItems: 'center' }}>
                <Logo />
            </View>
            <Padder height={20} />
            <View style={styles.details}>
                <View>
                    <Ionicons name="radio-button-on" size={24} color="black" />
                </View>
                <View style={styles.info}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontWeight: "bold", fontSize: 20 }}>Contact Information</Text>
                    <Padder height={8} />
                    <Text>{state.contact.contact}</Text>
                    <Text>{state.contact.firstname} {state.contact.lastname}</Text>
                    <Text>{state.contact.address}</Text>
                    <Text>{state.contact.email}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>navigation.navigate('EditDetails')}>
                        <Feather name="edit-3" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <Padder height={50} />

            <Button padding={15} btnName="View Orders" onPress={()=>navigation.navigate('Orders')} />
            
            <Padder height={20} />

            <Button padding={15} btnName="Logout" onPress={()=>navigation.navigate('Login')} />
        </View>
        <StatusBar backgroundColor={colors.orange} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        alignSelf: 'center'
    },
    details: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        flexDirection: 'row',
        elevation: 3,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
            height: 0.3,
            width: 0.1,
        }
    },
    info: { 
        flex: 1, 
        marginLeft: 10, 
        marginRight: 10
    },
    safearea: {
        flex: 1
    }
})