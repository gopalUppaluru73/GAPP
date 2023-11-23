import {StyleSheet, View} from 'react-native'
import FilterItem from './FilterItem'
import { type } from '../config/type'
import { colors } from '../config/colors'

const images = [
    require('../assets/fruit.png'),
    require('../assets/food.png'),
    require('../assets/dessert.png'),
    require('../assets/drink.png'),
]

export default function Filter({ filter, selectedIndex }) {
    const filterList = type.map((item, index)=>(
        <FilterItem 
            bg={Number(selectedIndex) === index ? colors.orange : 'transparent'} 
            type={item} 
            filter={filter} 
            index={index}
            key={item} 
            img={images[index]} 
        />
    ))
  return (
    <View style={styles.container}>{filterList}</View>
  )
}

const styles = StyleSheet.create({
    container: { 
        width: '90%', 
        alignSelf: 'center', 
        height: 130, 
        // backgroundColor: 'yellow', 
        flexDirection: 'row', 
        justifyContent: 'space-around'
    }
})