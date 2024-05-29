import { useRouter, router, Link } from 'expo-router';
import { View, Text, Button, Image, StyleSheet } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import SecondaryButton from '@/Components/secondaryButton';
import { string } from 'yup';
import SettingItem from '@/Components/settingItem';
const avatarPhoto = require('assets/images/avatar1.jpg');

const infoDetail = {
	userId: "123456",
	name: "Nguyễn Văn A",
	email: "nva@email.com", 
	phoneNumber: "0123456789",
}



const Settings: React.FC = () => {
	// const router = useRoute();
	
	return (
		<View style={{  padding: '5%', flex: 1 }}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Image source={avatarPhoto} 
							style={{ width: 64, height: 64, borderRadius: 32, marginRight: '5%' }}
							/>
					<Text style={styles.nameTextStyle }>{ infoDetail.name }</Text>
				</View>
				<View>
					<Text style={ styles.titleTextStyle }>Cá nhân</Text>
					<SettingItem title='Thông tin cá nhân' icon='user' underlined={true} onPress={()=>{}} />
					<SettingItem title='Đổi mật khẩu' icon='key' onPress={()=>{}} />
				</View>
				<View>
					<Text style={ styles.titleTextStyle }>Hệ thống</Text>
					<SettingItem title='Chế độ tối' icon='dark' onPress={()=>{}} />
				</View>
				<View>
					<Text style={ styles.titleTextStyle }>Hỗ trợ</Text>
					<SettingItem title='Trợ giúp' icon='question' underlined={true} onPress={()=>{}} />
					<SettingItem title='Đăng xuất' icon='log-out' underlined={true} onPress={()=>{}} />
					<SettingItem title='Chính sách và quyền riêng tư' underlined={true} icon='lock' onPress={()=>{}} />
					<SettingItem title='Giới thiệu ứng dụng' icon='info' onPress={()=>{}} />
				</View>
		</View>
	)
};

const styles = StyleSheet.create({
	nameTextStyle: {
		fontWeight: '500',
		fontSize: 25
	},
	titleTextStyle: {
		fontWeight: '500',
		fontSize: 21,
		marginVertical: '4%'
	}
})

export default Settings;