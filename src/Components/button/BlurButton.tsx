import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Link } from 'expo-router'


export default function BlurButton({ link_to}: { link_to: string }) {
	return (
        <Link href={link_to} style={styles.skipLink}>
            Bỏ qua
        </Link>

	)
}

const styles = StyleSheet.create({

	skipLink: {
		color: '#ccc', // Light gray color for the skip link
		fontSize: 14, // Adjust the skip link font size as needed
	},

})
