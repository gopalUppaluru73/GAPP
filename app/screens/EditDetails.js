import { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../config/colors'

import Toast from 'react-native-root-toast'

import Layout from '../components/Layout'
import Logo from '../components/Logo'
import Padder from '../components/Padder'
import Input from '../components/Input'
import Button from '../components/Button'
import { Context } from '../config/Provider'
import { Ionicons } from '@expo/vector-icons'

// Firebase Imports
import { app } from '../config/firebase'
import { getDatabase, ref, set, onValue } from 'firebase/database'
import { tablenames } from '../config/tables'

export default function EditDetails({navigation}) {
    const contextState = useContext(Context)
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({})
    const onChange = obj => setState({...state, ...obj})

    // Firebase
    const db = getDatabase(app)
    const dbref = ref(db, tablenames.login)

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
        onValue(dbref, snapshot=>{
            if(snapshot.exists()){
                const data = snapshot.val()
                const d_obj = Object.keys(data)
                const arr = []
                d_obj.forEach(key=>arr.push({...data[key], id: key}))
                const findItem = arr.find(item=>item.email === contextState.contact.email)
                if(findItem){
                    contextState.setContact(findItem)
                    setState({...contextState.contact})
                }
            }
        })
    }, [])

    const update = () => {
        const {id, firstname, lastname, email, address, contact, password} = state
        if(id && firstname && lastname && email && address && contact && password){
            set(ref(db, `${tablenames.login}/${id}`), state)
            .then(()=>{
                Toast.show('Information updated', {duration: Toast.durations.LONG})
            })
            .catch(()=>{
                Toast.show('Failed to update record', {duration: Toast.durations.LONG})
            })
        }
    }
  return (
      <Layout>
        <KeyboardAwareScrollView>
            <View style={styles.view}>
                <Padder height={25} />
                <View style={styles.alignSelfCenter}>
                    <Logo />
                </View>
                <Padder height={25} />
                <Text style={styles.text}>Edit Details</Text>
                <Padder height={20} />
                <Input name="firstname" onChange={onChange} value={state.firstname} placeholder="Enter Firstname" />
                <Padder height={15} />
                <Input name="lastname" onChange={onChange} value={state.lastname} placeholder="Enter Lastname" />
                <Padder height={15} />
                <Input name="address" onChange={onChange} value={state.address} placeholder="Address" />
                <Padder height={15} />
                <Input name="contact" onChange={onChange} value={state.contact} placeholder="Contact number" />
                <Padder height={15} />
                <Input name="email" editable={false} onChange={onChange} value={state.email} placeholder="Enter email address" />
                <Padder height={25} />
                <Button loading={loading} btnName="Update" onPress={update} />
            </View>
        </KeyboardAwareScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({
    alignSelfCenter: {
        alignSelf: 'center'
    },
    account: {
        fontWeight: 'bold',
        color: colors.orange
    },
    text: { 
        fontSize: 25, 
        fontWeight: 'bold',
        color: colors.orange,
        textAlign: 'center'
    },
    view: {
        width: '90%',
        alignSelf: 'center'
    }
})