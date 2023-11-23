import { useState, useEffect, useContext } from 'react'
import { 
  Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View 
} from 'react-native'
import { colors } from '../config/colors'

import { FontAwesome5 } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

import Padder from '../components/Padder'
import AddMinusQty from '../components/AddMinusQty'
import Logo from '../components/Logo'
import { Context } from '../config/Provider'
import Toast from 'react-native-root-toast';

export default function ViewProductScreen({ route, navigation }) {
  const state = useContext(Context)
  const [product, setProduct] = useState({})
  const [img, setImg] = useState(null)
  const [name, setName] = useState('')
  const [dollar, setdollar] = useState('')
  const [cent, setcent] = useState('')
  const [qty, setQty] = useState(0)

  useEffect(()=>{
    const item = route.params

    const {name, price, img} = item
    setProduct(item); setName(name); setImg(img ?? null);
    let [dollar, cent] = price.toString().split('.')
    setdollar(dollar ?? ''); setcent(cent ?? '');

    const findItem = state.cart.find(prod => prod.id === item.id)
    if(findItem){
      setQty(findItem?.qty ?? 0)
    }
  }, [])

  const goBack = () => navigation.goBack()

  const goToCart = () => {
    if(state.cart.length === 0){
      Toast.show('Add items to cart to view', {duration: Toast.durations.LONG})
      return
    }
    navigation.navigate('Cart')
  }

  const add = () => setQty(qty+1)

  const minus = () => {
    if(qty === 0) return
    setQty(qty-1)
  }

  const addToCart = () => {
    if(qty === 0) return
    let prod = {...product, qty: qty}
    if(state.cart.length === 0){
      let c_art = [...state.cart, prod]
      state.setCart(c_art)
    }else{
      const findItem = state.cart.find(item=>item.id === product.id)
      if(findItem){
        const c = state.cart.map(item=>{
          if(item.id === prod.id){
            item['qty'] = qty
          }
          return item
        })
        state.setCart(c)
      }else{
        let c_art = [...state.cart, prod]
        state.setCart(c_art)
      }
    }
  }

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>

        <View style={styles.viewTop}>
          <View style={styles.viewArrow}>
            <TouchableOpacity onPress={goBack} style={{ width: '100%', height: 40, alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons name="arrow-undo-sharp" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.viewCart}>
            <TouchableOpacity onPress={goToCart} style={{ position: 'relative', width: '100%', height: 40, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{ position: 'absolute', left: 4 }}>
                <FontAwesome5 name="shopping-cart" size={17} color="#000" />
              </View>
              <Text 
                style={{ position: 'absolute', color: colors.orange, 
                fontWeight: 'bold', right: 3, fontSize: 12 }}
              >{state.cartQty}</Text>
            </TouchableOpacity>
          </View>
          <Logo />
        </View>

        <View style={styles.viewBottom}>

          <View style={styles.productSection}>
            <View style={styles.prodimg}>
              <Image source={{ uri: img }} style={{ width: 200, height: 180 }} />
            </View>

            <Padder height={150} />

            <View style={{ width: '70%', alignSelf: 'center', alignItems: 'center' }}>
              <Text style={styles.prodname} numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
              <Padder height={20} />
              <Text>
                <Text style={styles.prodname}>${dollar}</Text>
                <Text style={[styles.prodname, {color: '#aaa', fontSize: 14}]}>{cent ? `.${cent}` : ''}</Text>
              </Text>
            </View>

            <Padder height={20} />

            <View style={styles.action}>
              <AddMinusQty addPress={add} minusPress={minus} qty={qty} />
            </View>

          </View>

          <View style={styles.productButtonSection}>
            <View style={styles.buttonview}>
              <TouchableOpacity onPress={addToCart}>
                <View style={styles.button}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome5 name="shopping-cart" size={16} color="white" />
                    <Text style={[styles.buttonText, {marginLeft: 10}]}>Add to Cart</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

        </View>

      </View>
      <StatusBar backgroundColor={colors.orange} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  action: {
    width: '50%',
    padding: 10,
    borderRadius: 50,
    backgroundColor: colors.orange,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionview: {
    width: '33.33%',
    alignItems: 'center'
  },
  button: {
    width: '100%',
    backgroundColor: colors.orange,
    borderRadius: 5,
    padding: 15,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  buttonview: {
    width: '90%',
    alignSelf: 'center'
  },
  container: {
    flex: 1
  },
  safearea: {
    flex: 1,
    backgroundColor: colors.orange
  },
  prodimg: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    borderRadius: 100,
    position: 'absolute',
    top: -100,
    // overflow: 'hidden',
  },
  prodname: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productSection: {
    flex: 6,
    alignItems: 'center',
  },
  productButtonSection: {
    flex: 2,
    justifyContent: 'center'
  },
  viewArrow: {
    position: 'absolute',
    left: 15,
    top: 15,
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewCart: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewTop: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBottom: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'relative'
  }
})