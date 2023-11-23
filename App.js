import { RootSiblingParent } from 'react-native-root-siblings'
import Route from './Route'
import Provider from './app/config/Provider'
import { StripeProvider } from '@stripe/stripe-react-native'

const publishableKey = 'pk_test_51NtrUAEh1w3z8Rq8eZ7YfttzQ6LKOm95D5pFtvVDbPRYkRwKQodHjYZpjcukIXs1jjKaoEzP70qPTMj97RcNVFVg006eB2dyaD'

export default function App() {
  return (
    <Provider>
      <StripeProvider publishableKey={publishableKey}>
        <RootSiblingParent>
          <Route />
        </RootSiblingParent>
      </StripeProvider>
    </Provider>
  );
}
