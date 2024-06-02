import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

interface NotiItemProps {
    name: string,
    content: string,
    timeNoti: string,
    isRead: boolean,
    onPress: any
};

const NotiItem: React.FC<NotiItemProps> = ({
    name,
    content,
    timeNoti,
    isRead,
    onPress
}) => {
    return (
        <TouchableOpacity onPress={ onPress }>
            <View style={isRead ? [styles.container, { backgroundColor: '#fff'}] : [styles.container]}>
            <SimpleLineIcons size={35} name="drop" color={'#416D50'} />
            <View style={ styles.contentContainer }>
                <Text style={ styles.titleText }>{ name }</Text>
                <Text style={ styles.contentText }>{ content }</Text>
            </View>
            <View>
                <Text style={ styles.timeNotiText }>{ timeNoti }</Text>
            </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 10,
		marginVertical: 5,
		backgroundColor: '#E9F3ED',
		borderRadius: 10,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 5,
	},
    contentContainer: {
        flex: 1,
        paddingHorizontal: '2%'
    },
    timeNotiText: {
        color: 'grey',
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: '3%'
    },
    contentText: {
        fontSize: 14,
        fontWeight: "400"
    }
})

export default NotiItem;