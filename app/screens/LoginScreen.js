import { useContext, useState, useEffect } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { colors } from '../config/colors'

import Toast from 'react-native-root-toast'

import Logo from '../components/Logo'
import Input from '../components/Input'
import Padder from '../components/Padder'
import Button from '../components/Button'
import Layout from '../components/Layout'
import { Context } from '../config/Provider'

// Firebase Imports
import { app } from '../config/firebase'
import {onValue, getDatabase, ref, push} from 'firebase/database'
import { tablenames } from '../config/tables'

export default function LoginScreen({navigation}) {
    const contextState = useContext(Context)
    const [logArr, setLogArr] = useState([])
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({username: '', password: ''})
    const onChange = obj => setState({...state, ...obj})

    // setup firebase database
    const db = getDatabase(app)
    const dbRef = ref(db, tablenames.login)

    useEffect(()=>{
        onValue(dbRef, (snapshot)=>{
            if(snapshot.exists()){
                const arr = []
                const data = snapshot.val()
                const keys = Object.keys(data)
                keys.forEach(key=>{
                    arr.push({...data[key], id: key})
                })
                setLogArr(arr)
                // console.log('login data',arr)
            }else{
                setLogArr([])
            }
        })
    }, [])

    const createAccount = () => navigation.navigate('CreateAccount')

    const login = () => {
        setLoading(true)
        // const obj = {email: 'admin', password: 'password', type: 'admin'}
        // push(dbRef, obj)
        const {username, password} = state
        const findUser = logArr.find(item=>item.email.toLowerCase() === username.toLowerCase())
        if(findUser){
            if(findUser.password.toLowerCase() === password.toLowerCase()){
                if(findUser.type === 'admin'){
                    setLoading(false)
                    navigation.navigate('Dash')
                }else{
                    contextState.setContact(findUser)
                    setLoading(false)
                    navigation.navigate('Products')
                }
            }else{
                setLoading(false)
                Toast.show('Invalid username or password', {duration: Toast.durations.LONG})
            }
        }else{
            setLoading(false)
            Toast.show('Invalid username or password', {duration: Toast.durations.LONG})
        }
    }

  return (
    <Layout>
        <View style={styles.container}>
            <View style={styles.view}>
                <View style={{ alignSelf: 'center' }}><Logo /></View>
                <Padder />
                <Input name="username" onChange={onChange} placeholder="Enter Username" />
                <Padder height={15} />
                <Input name="password" onChange={onChange} placeholder="Enter Password" secureTextEntry={true} />
                <Padder height={15} />
                <Text>
                    <Text>Don't have an account?</Text>  <Text onPress={createAccount} style={styles.account}>Create a user account</Text>
                </Text>
                <Padder height={25} />
                <Button btnName="Login" loading={loading} onPress={login} />
            </View>
        </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
    account: {
        fontWeight: 'bold',
        color: colors.orange
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    view: {
        width: '90%'
    }
})