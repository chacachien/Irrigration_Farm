import React from 'react'
import { Image, StyleSheet, View, FlatList } from 'react-native'

import One from './one' // Assuming these are React components
import Two from './two'
import Three from './three'

const itemLists = [One, Two, Three]

const Slider = () => {
	const renderItem = ({ item: Component }) => <Component /> // Render the component

	return (
		<View style={styles.container}>
			<FlatList
				data={itemLists}
				renderItem={renderItem} // Use the custom renderItem function
				keyExtractor={(item) => item.name} // Use a unique key, like component name
				horizontal // Scroll horizontally
				pagingEnabled // Enable page-like scrolling
				showsHorizontalScrollIndicator={false} // Hide scroll indicator
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1, // Make container take up full height (optional)
	},
})

export default Slider
