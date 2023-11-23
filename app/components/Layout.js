import { SafeAreaView, StatusBar } from 'react-native'
import { colors } from '../config/colors'

export default function Layout({children}) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.lightOrange}}>
      {children}
      <StatusBar backgroundColor={colors.orange} />
    </SafeAreaView>
  )
}
