import { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../config/colors'

import Toast from 'react-native-root-toast'

import Layout from '../components/Layout'
import Logo from '../components/Logo'
import Padder from '../components/Padder'
import Input from '../components/Input'
import Button from '../components/Button'
import { validateCreateAccount } from '../config/validate'

// Firebase Imports
import { app } from '../config/firebase'
import {onValue, getDatabase, ref, push} from 'firebase/database'
import { tablenames } from '../config/tables'

export default function CreateAccount({navigation}) {
    const [logArr, setLogArr] = useState([])
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({firstname: '', lastname: '', address: '', contact: '', email: '', password: '', type: 'user'})
    const onChange = obj => setState({...state, ...obj})

    // setup firebase database
    const db = getDatabase(app)
    const dbRef = ref(db, tablenames.login)

    useEffect(()=>{
        onValue(dbRef, snapshot=>{
            if(snapshot.exists()){
                const data = snapshot.val()
                const d_obj = Object.keys(data)
                const arr = []
                d_obj.forEach(key=>arr.push({...data[key], id: key}))
                setLogArr(arr)
            }else{
                setLogArr([])
            }
        })
    }, [])

    const goToLogin = () => navigation.navigate('Login') 

    const registerAccount = () => {
        setLoading(true)
        const { email } = state
        const { status, message } = validateCreateAccount(state)
        if(status){
            const findUser = logArr.find(item=>item.email.toLowerCase() === email.toLowerCase())
            if(findUser){
                setLoading(false)
                Toast.show('An account with this email already exist', {position: Toast.positions.TOP})
            }else{
                push(dbRef, state)
                .then(()=>{
                    setLoading(false)
                    Toast.show('Account created', {position: Toast.positions.TOP})
                    navigation.goBack()
                })
                .catch(()=>{
                    setLoading(false)
                    Toast.show('Failed to create account', {position: Toast.positions.TOP})
                })
            }
        }else{
            setLoading(false)
            Toast.show(message, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER
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
                <Text style={styles.text}>Create User Account</Text>
                <Padder height={20} />
                <Input name="firstname" onChange={onChange} value={state.firstname} placeholder="Enter Firstname" />
                <Padder height={15} />
                <Input name="lastname" onChange={onChange} value={state.lastname} placeholder="Enter Lastname" />
                <Padder height={15} />
                <Input name="address" onChange={onChange} value={state.address} placeholder="Address" />
                <Padder height={15} />
                <Input name="contact" onChange={onChange} value={state.contact} placeholder="Contact number" />
                <Padder height={15} />
                <Input name="email" onChange={onChange} value={state.email} placeholder="Enter email address" />
                <Padder height={15} />
                <Input name="password" secureTextEntry={true} onChange={onChange} value={state.password} placeholder="Password" />
                <Padder height={15} />
                <Text>
                    <Text>Already have an account?</Text>  <Text onPress={goToLogin} style={styles.account}>Login</Text>
                </Text>
                <Padder height={25} />
                <Button loading={loading} btnName="Register" onPress={registerAccount} />
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