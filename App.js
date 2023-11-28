import { useEffect } from 'react'
import { RootSiblingParent } from 'react-native-root-siblings'
import Route from './Route'
import Provider from './app/config/Provider'
import { StripeProvider } from '@stripe/stripe-react-native'
import * as Updates from 'expo-updates';

const publishableKey = 'pk_test_51NtrUAEh1w3z8Rq8eZ7YfttzQ6LKOm95D5pFtvVDbPRYkRwKQodHjYZpjcukIXs1jjKaoEzP70qPTMj97RcNVFVg006eB2dyaD'

export default function App() {

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  useEffect(() => {
    onFetchUpdateAsync()
  }, [])

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
