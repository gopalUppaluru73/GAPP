import { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker'
import * as ImagePicker from 'expo-image-picker'

import { Ionicons } from '@expo/vector-icons'
import Layout from '../components/Layout'
import Button from '../components/Button'
import Input from '../components/Input'
import Padder from '../components/Padder'
import { colors } from '../config/colors'
import Toast from 'react-native-root-toast';

// Firebase Imports
import { app } from '../config/firebase'
import { getDatabase, ref, push, onValue } from 'firebase/database'
import { getStorage, getDownloadURL, uploadBytes, ref as storageRef } from 'firebase/storage'
import { tablenames } from '../config/tables'
import { validateAddProduct } from '../config/validate'

export default function AddProduct({ navigation }) {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [state, setState] = useState({name: '', price: ''})
    const [foodType, setFoodType] = useState(null)
    const [typeArr, setTypeArr] = useState([
        {label: 'Food', value: 'Food'}, {label: 'Fruit', value: 'Fruit'},
        {label: 'Dessert', value: 'Dessert'}, {label: 'Drink', value: 'Drink'}
    ])
    const [img, setImg] = useState(null)
    const [open, setOpen] = useState(false)
    const onChange = obj => setState({...state, ...obj})

    // Firebase
    const db = getDatabase(app)
    const dbref = ref(db, tablenames.products)
    const storage = getStorage(app)

    const selectImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
      
        if (!result.canceled) {
            setImg(result.assets[0].uri);
        }
    }

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
                const d_objs = Object.keys(data)
                const arr = []
                d_objs.forEach(key=>arr.push({...data[key], id: key}))
                setProducts(arr)
            }
        })
    }, [])

    const addProducts = async() => {
        setLoading(true)
        const {name, price} = state
        const {status, message} = validateAddProduct(state)
        if(status){
            const findName = products.find(item=>item.name.trim().toLowerCase() === name.trim().toLowerCase())
            if(findName) {
                setLoading(false)
                Toast.show('Product name already exist', {duration: Toast.durations.LONG})
            }else{
                if(name && price && foodType){
                    if(Number(price)){
                        if(img){
                            const blob = await new Promise((resolve, reject) => {
                                const xhr = new XMLHttpRequest();
                                xhr.onload = function () {
                                resolve(xhr.response);
                                };
                                xhr.onerror = function (e) {
                                console.log(e);
                                reject(new TypeError("Network request failed"));
                                };
                                xhr.responseType = "blob";
                                xhr.open("GET", img, true);
                                xhr.send(null);
                            })

                            const rand = Math.floor(Math.random() * 1000000000)
                            const storage_Ref = storageRef(storage, `gapp-images/image${rand}`)

                            uploadBytes(storage_Ref, blob).then((snapshot)=>{
                                getDownloadURL(snapshot.ref).then(url=>{
                                    const pObj = {name, price: Number(price), type: foodType, img: url}
                                    
                                    push(dbref, pObj).then(()=>{
                                        setLoading(false)
                                        Toast.show('Product added', {duration: Toast.durations.LONG})
                                        navigation.goBack()
                                    })
                                    .catch(err=>{
                                        console.log(err)
                                        setLoading(false)
                                        Toast.show('Error occurred', {duration: Toast.durations.LONG})
                                    })
                                })
                            })
                        }else{
                            setLoading(false)
                            Toast.show('A product image is required', {duration: Toast.durations.LONG})
                        }
                    }else{
                        setLoading(false)
                        Toast.show('Amount must be a number', {duration: Toast.durations.LONG})
                    }
                }else{
                    setLoading(false)
                    Toast.show('All the fields are required', {duration: Toast.durations.LONG})
                }
            }
        }else{
            setLoading(false)
            Toast.show(message, {duration: Toast.durations.LONG})
        }
    }

  return (
    <Layout>
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <Padder height={20} />
                <View style={{ width: 150, height: 150, alignSelf: 'center' }}>
                <TouchableOpacity style={styles.imageBtn} onPress={selectImage}>
                    <View style={styles.imageview}>
                        {
                            img
                            ?
                            <Image source={{ uri: img }} style={styles.image} />
                            :
                            <View style={[styles.image, {backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}]}>
                                <Text>Select Image</Text>
                            </View>
                        }
                    </View>
                </TouchableOpacity>
                </View>
                <Padder height={20} />

                <Text style={{ fontWeight: 'bold' }}>Product Name</Text>
                <Input value={state.name} onChange={onChange} name="name" placeholder="Enter product name.. Eg. Pizza" />
                <Padder height={20} />

                <Text style={{ fontWeight: 'bold' }}>Product Price</Text>
                <Input value={state.price} onChange={onChange} name="price" type="number" placeholder="Enter product price.. Eg. 10.99" />
                <Padder height={20} />

                <View>
                    <Text style={{ fontWeight: 'bold' }}>Select Food Type</Text>
                    <DropDownPicker
                        zIndex={100}
                        open={open}
                        value={foodType}
                        items={typeArr}
                        setOpen={setOpen}
                        setValue={setFoodType}
                        setItems={setTypeArr}
                        listMode='MODAL'
                    />
                </View>
                <Padder height={30} />

                <Button padding={15} loading={loading} btnName="Add Product" onPress={addProducts} />
            </View>
        </KeyboardAwareScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        flex: 1,
        alignSelf: 'center',
    },
    imageview: {
        width: 150,
        height: 150,
        borderRadius: 150,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: colors.orange
    },
    image: {
        width: 150,
        height: 150
    },
    imageBtn: {
        width: 150,
        height: 150
    }
})