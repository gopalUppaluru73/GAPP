import { useState, useEffect } from 'react'
import { 
    View, TextInput, SafeAreaView, StyleSheet, StatusBar, ScrollView, TouchableOpacity 
} from 'react-native'

import { app } from '../config/firebase'
import { getDatabase, ref, onValue } from 'firebase/database'
import { tablenames } from '../config/tables'
import { colors } from '../config/colors'
import Logo from '../components/Logo'
import Padder from '../components/Padder'
import ProductItem from '../components/ProductItem'
import { Ionicons } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons'

export default function AdminProducts({ navigation }) {
    const [products, setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    // Firebase
    const db = getDatabase(app)
    const dbref = ref(db, tablenames.products)

    useEffect(()=>{
        onValue(dbref, snapshot=>{
            if(snapshot.exists()){
                const data = snapshot.val()
                const d_obj = Object.keys(data)
                const arr = []
                d_obj.forEach(key=>arr.push({...data[key], id: key}))
                setProducts(arr)
                setAllProducts(arr)
            }
        })
    }, [])

    const editProd = prod => navigation.navigate('EditProduct', prod)

    const prodDisplay = products.length > 0 ? products.map((item, index)=>(
        <ProductItem product={item} key={index} onPress={editProd} />
    )) : <View></View>

    const search = text => {
        if(text === ''){
            setProducts(allProducts)
            return
        }
        const arr = []
        allProducts.forEach(item=>{
            const txt = text.toLowerCase()
            if(item.name.toLowerCase().indexOf(txt) > -1 || item.type.toLowerCase().indexOf(txt) > -1){
                arr.push(item)
            }
        })
        setProducts(arr)
    }
  return (
    <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
            <View style={styles.logoview}>
                <View style={{ alignItems: 'center', position: 'relative' }}>
                    <TouchableOpacity style={styles.arrowLeft} onPress={()=>navigation.goBack()}>
                        <View style={styles.arrowview}>
                            <Ionicons name="arrow-undo-sharp" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.arrowRight} onPress={()=>navigation.navigate('AddProduct')}>
                        <View style={styles.arrowview}>
                            <Foundation name="plus" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    <Logo />
                    <Padder />
                    <TextInput onChangeText={text=>search(text)} style={styles.textinput} placeholder="Search by name or type. Eg. Pizza or food" />
                </View>
            </View>
            <Padder />
            <ScrollView style={styles.container}>
                <View style={styles.productsview}>{prodDisplay}</View>
            </ScrollView>
            <Padder />
        </View>
        <StatusBar backgroundColor={colors.orange} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    arrowLeft: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    arrowRight: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    arrowview: {
        width: 40, 
        height: 40, 
        backgroundColor:'#fff', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 40
    },
    safearea: {
        flex: 1
    },
    container: {
        flex: 1
    },
    logoview: {
        backgroundColor: colors.orange,
        padding: 10
    },
    productsview: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    textinput: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 3,
    }
})