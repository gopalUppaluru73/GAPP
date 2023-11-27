import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './app/screens/LoginScreen';
import CreateAccount from './app/screens/CreateAccount';
import ViewProductScreen from './app/screens/ViewProductScreen';
import CartScreen from './app/screens/CartScreen';
import Products from './app/screens/Products';
import AddProduct from './app/screens/AddProduct';
import AdminProducts from './app/screens/AdminProducts';
import EditProduct from './app/screens/EditProduct';
import Dash from './app/screens/Dash';
import Checkout from './app/screens/Checkout';
import UserDash from './app/screens/UserDash';
import Orders from './app/screens/Orders';
import OrderDetail from './app/screens/OrderDetail';
import EditDetails from './app/screens/EditDetails';
import AdminOrders from './app/screens/AdminOrders';
import AdminOrderDetail from './app/screens/AdminOrderDetail';

import { colors } from './app/config/colors';

const Stack = createNativeStackNavigator();

export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ViewProduct" component={ViewProductScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Products" component={Products} options={{ headerShown: false }} />
        <Stack.Screen name="AddProduct" component={AddProduct} 
          options={{
            title: 'Add Products',
            // headerStyle: {
              //   backgroundColor: colors.lightOrange
              // },
              // headerTintColor: colors.orange,
              // headerTitleStyle: {
                //   fontWeight: 'bold'
                // }
              }} 
        />
        <Stack.Screen name="AdminProducts" component={AdminProducts} options={{ headerShown: false }} />
        <Stack.Screen name="AdminOrders" component={AdminOrders} options={{ headerShown: false }} />
        <Stack.Screen name="AdminOrderDetail" component={AdminOrderDetail} options={{ headerShown: false }} />
        <Stack.Screen name="EditProduct" component={EditProduct} 
          options={{
            title: 'Edit Product'
          }} 
        />
        <Stack.Screen name="Dash" component={Dash} options={{ headerShown: false }} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="UserDash" component={UserDash} 
          options={{
            title: 'User Dashboard',
          }} 
        />
        <Stack.Screen name="Orders" component={Orders} 
          options={{
            title: 'Orders'
          }} 
        />
        <Stack.Screen name="OrderDetail" component={OrderDetail} 
          options={{
            title: 'Order Details'
          }} 
        />
        <Stack.Screen name="EditDetails" component={EditDetails} 
          options={{ 
            title: 'Edit Product'
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
