import React, { useRef, useState} from 'react'
import { Image, StyleSheet, View, FlatList, Animated } from 'react-native'

import One from './one' // Assuming these are React components
import Two from './two'
import Three from './three'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { clearInput } from '@/Store/reducers/register'

const itemLists = [One, Two, Three]

const Slider = () => {

  const [index, setIndex] = useState(0)
const flatListRef = useRef<FlatList<any>>(null)
  const scrollX = useRef(new Animated.Value(0)).current
	const dispatch = useDispatch()
	const handleOnScroll = (event: any) => {
		Animated.event(
			[
				{
					nativeEvent: {
						contentOffset: {
							x: scrollX,
						},
					},
				},
			],
			{
				useNativeDriver: false,
			},
		)(event)
	}

	const handleOnViewableItemsChanged = useRef(({ viewableItems }: any) => {
		console.log('viewableItems', viewableItems);
		setIndex(viewableItems[0].index)
	}).current

  const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: 50,
	}).current

	const renderItem = ({ item: Component }: { item: React.ComponentType<any> }) => <Component moveToNext={moveToNext} />
	const moveToNext = async () => {
		console.log(index)  
		if (index < itemLists.length -1) {
			flatListRef.current?.scrollToIndex({index: index +1})
			// setIndex(viewableItems[0].index)
		}
		// dispatch(clearInput())
		// await AsyncStorage.clear().then(() => {
		// 	console.log('done')
		// })

		console.log(index)            
	}
    //const renderItem = ({ item: Component }) => <Component />
	return (
		<View style={styles.container}>
			<FlatList
				ref={flatListRef}
				data={itemLists}
				renderItem={renderItem} // Use the custom renderItem function
				keyExtractor={(item) => item.name} // Use a unique key, like component name
				horizontal
				pagingEnabled
				snapToAlignment="center"
				showsHorizontalScrollIndicator={false}
				onScroll={handleOnScroll}
				onViewableItemsChanged={handleOnViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
        flex:1
	// 	flex: 1, // Make container take up full height (optional)
	},
})

export default Slider
