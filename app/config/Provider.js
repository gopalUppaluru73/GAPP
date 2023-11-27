import { createContext, useState } from 'react'

export const Context = createContext({
    contact: null,
    cart: [],
    cartQty: 0,
    deliveryFee: 3.5,
    totalFee: 0,
    setContact: (obj)=>{},
    setCart: (cart)=>{},
    setCartQtyZero: ()=>{},
})

export default function Provider({ children }){
    const [totalFee, setTotalFee] = useState(0)
    const [deliveryFee, setDeliveryFee] = useState(3.5)
    const [contact, set_Contact] = useState(null)
    const [cart, set_Cart] = useState([])
    const [cartQty, setCartQty] = useState(0)
    const setContact = obj => set_Contact(obj)
    const setCart = cart => {
        set_Cart(cart)

        let total = 0, total_fee = 0
        cart.forEach(item=>{
            total += item?.qty ?? 0
            total_fee += ((item?.price ?? 0) * (item?.qty ?? 0))
        })
        setCartQty(total)
        setTotalFee(total_fee)
    }
    const setCartQtyZero = () => {
        setCartQty(0)
        setTotalFee(0)
    }
    
    return (
        <Context.Provider 
            value={{
                contact,
                cart,
                cartQty,
                deliveryFee,
                totalFee,
                setContact,
                setCart,
                setCartQtyZero,
            }}
        >
            {children}
        </Context.Provider>
    )
}