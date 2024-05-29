import React from 'react';
import { Touchable, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import ToggleSwitch from 'toggle-switch-react-native';

const iconList : any = (name: string) => {
    if (name === 'user') {
        return (
            <AntDesign name='user' size={23} color='black' />
        );
    }
    else if (name === 'key') {
        return (
            <Ionicons name='key-outline' size={23} color='black' />
        );
    }
    else if (name === 'dark') {
        return (
            <Ionicons name='moon-outline' size={23} color='black' />
        );
    }
    else if (name === 'question') {
        return (
            <AntDesign name='questioncircleo' size={23} color='black' />
        );
    }
    else if (name === 'log-out') {
        return (
            <Feather name='log-out' size={23} color='black' />
        );
    }
    else if (name === 'lock') {
        return (
            <SimpleLineIcons name='lock' size={23} color='black' />
        );
    }
    else if (name === 'info') {
        return (
            <AntDesign name='infocirlceo' size={23} color='black' />
        )
    } 
}

interface SettingItemProps {
    title: string,
    icon: string,
    underlined?: boolean,
    onPress: any
}

const SettingItem: React.FC<SettingItemProps> = ({
    title,
    icon,
    underlined,
    onPress
}) => {
    return (
        <TouchableOpacity onPress={ onPress }>
            <View style={ underlined ? [styles.mainItemContainer, { borderBottomColor: 	'#F5F5F5', borderBottomWidth: 1 }] : styles.mainItemContainer }>
                <View style={ styles.iconContainer }>
                {
                    iconList(icon)                    
                }
                </View>
                <Text style={ icon != 'dark' ? styles.titleText : [styles.titleText, { width: '58%'}]}>
                    {
                        title
                    }
                </Text>
                { icon != 'dark' ? <Text><AntDesign name='right' size={21} color='grey' /></Text> : <ToggleSwitch isOn={ false }
                                                                                                                   onColor='black'
                                                                                                                   offColor='#d3d3d3'
                                                                                                                   size='small'
                                                                                                                   onToggle={(isOn => console.log("changed to : ", isOn ))} /> }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainItemContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: '3%',
    },
    iconContainer: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        textAlign: 'left',
        width: '65%',
        marginHorizontal: '8%',
        fontSize: 17
    }
})

export default SettingItem;