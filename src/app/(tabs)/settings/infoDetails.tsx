import { useRouter, router, useLocalSearchParams } from 'expo-router';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import SecondaryButton from '@/Components/button/secondaryButton';
import ActivateButton from '@/Components/button/activateButton';
import PrimaryButton from '@/Components/button/primaryButton';
import TextInput from '@/Components/textInput';
import { useState } from 'react';
import TextButton from '@/Components/button/textButton';
import { string } from 'yup';
const avatarPhoto = require('assets/images/avatar1.jpg');



const InfoDetail: React.FC = () => {
	
	const userInfo = useLocalSearchParams<{userId: string, name: string, email: string, phoneNumber: string}>();
	const [isEditting, setIsEditting] = useState(false);
	const [userName, setUserName] = useState(userInfo.name);
	const [userEmail, setUserEmail] = useState(userInfo.email);
	const [userNumber, setUserNumber] = useState(userInfo.phoneNumber);

	return (
			<View style={{  padding: '5%', flex: 1 }}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Image source={avatarPhoto} 
							style={{ width: 64, height: 64, borderRadius: 32, marginRight: '5%' }}
							/>
					<Text style={styles.nameTextStyle }>{ userInfo.name }</Text>
				</View>
				<View style={{ marginVertical: '5%' }}>
					<Text style={ styles.titleTextStyle }>Tên</Text>
					{
						isEditting ? <TextInput style={{ height: 48, backgroundColor: 'white' }} value={ userName } mode='flat' onChangeText={(text) => { setUserName(text); }} /> : <Text style={ styles.contentTextStyle }>{ userInfo.name }</Text>
					}
					<Text style={ styles.titleTextStyle }>Email</Text>
					{
						isEditting ? <TextInput style={{ height: 48, backgroundColor: 'white' }} value={ userEmail } mode = 'flat' /> : <Text style={ styles.contentTextStyle }>{ userInfo.email }</Text>
					}
					<Text style={ styles.titleTextStyle }>Số điện thoại</Text>
					{
						isEditting ? <TextInput style={{ height: 45, backgroundColor: 'white'}} value={ userNumber } mode='flat' /> : <Text style={ styles.contentTextStyle }>{ userInfo.phoneNumber }</Text>
					}
				</View>
				
				{
					isEditting ? 				
					<View style={{ alignItems: 'center'}}>
						<SecondaryButton title='Lưu thông tin' onPress={() => { setIsEditting(false); }}/>
						<View style={{ marginVertical: '2%' }}></View>
						<TextButton title='Hủy' onPress={() => { setIsEditting(false) }}/>
					</View> 
				: <PrimaryButton title='Chỉnh sửa thông tin' onPress={() => { setIsEditting(true) }} />
				}
		</View>
	)
};

const styles = StyleSheet.create({
	nameTextStyle: {
		fontWeight: '500',
		fontSize: 25
	},
	titleTextStyle: {
		fontWeight: '400',
		fontSize: 21,
	},
	contentTextStyle: {
		fontWeight: '400',
		fontSize: 21,
		marginVertical: '3%',
		color: 'grey'
	}
})

export default InfoDetail;