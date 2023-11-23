import React, {useState, useEffect, useContext} from 'react'
import { 
    SafeAreaView, View, StyleSheet, StatusBar, ScrollView
} from 'react-native'
import { colors } from '../config/colors'
import Head from '../components/Head'
import Toast from 'react-native-root-toast';
import { Context } from '../config/Provider';
import Padder from '../components/Padder';
import ProductItem from '../components/ProductItem';
import Filter from '../components/Filter';

// Firebase Imports
import { app } from '../config/firebase'
import { getDatabase, ref, onValue } from 'firebase/database'
import { tablenames } from '../config/tables'

export default function Products({ navigation, route }) {
    const state = useContext(Context)
    const [allProducts, setAllProducts] = useState([])
    const [products, setProducts] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(undefined)

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
            }else{
                setProducts([])
                setAllProducts([])
            }
        })
        // To Reset filter on products screen from checkOutScreen
        // if(route.params.resetFilter){
        //     setSelectedIndex(undefined)
        // }
    }, [])

    const viewProduct = product => navigation.navigate('ViewProduct', product)

    const prodDisplay = products.length > 0 ? products.map((item, index)=>(
        <ProductItem product={item} key={index} onPress={viewProduct} />
    )) : <View></View>

    const goToCart = () => {
        if(state.cart.length === 0){
            const context = { duration: Toast.durations.LONG, position: Toast.positions.CENTER }
            Toast.show('Cart is empty. Add items to view cart', context)
        }else{
            navigation.navigate('Cart')
        }
    }

    const goToProfile = () => navigation.navigate('UserDash')

    const search = text => {
        if(text === ''){
            setProducts(allProducts)
        }else{
            const prods = []
            allProducts.forEach(item=>{
                if(item.name.toLowerCase().indexOf(text.toLowerCase()) > -1){
                    prods.push(item)
                }
            })
            setProducts(prods)
        }
    }

    const resetSearch = () => {
        setProducts(allProducts)
        setSelectedIndex(undefined)
    }
    const filter = (type, index)=>{
        setSelectedIndex(index)
        const p = [...allProducts]
        const filterP = p.filter(item=>item.type.toLowerCase() === type.toLowerCase())
        setProducts(filterP)
    }
  return (
    <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
            <Head goToProfile={goToProfile} goToCart={goToCart} showSearch={true} search={search} reset={resetSearch} />
            <Padder />
            <Filter filter={filter} selectedIndex={selectedIndex} />
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.productsview}>{prodDisplay}</View>
            </ScrollView>
        </View>
        <StatusBar backgroundColor={colors.orange} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    productsview: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    safearea: {
        flex: 1,
        backgroundColor: '#fff'
    }
})