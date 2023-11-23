import { Image } from 'react-native'
import logo from '../assets/logo.png'

export default function Logo({width, height}) {
  return <Image source={logo} style={{ width: width ?? 100, height: height ?? 100 }} />
}
