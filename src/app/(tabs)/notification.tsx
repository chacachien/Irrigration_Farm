import ActivateButton from '@/Components/button/activateButton'
import FarmItem from '@/Components/farmItem'
import NotiItem from '@/Components/notiItem'
import PrimaryButton from '@/Components/button/primaryButton'
import SecondaryButton from '@/Components/button/secondaryButton'
import TextButton from '@/Components/button/textButton'
import { View, Text, FlatList } from 'react-native'
import { Button } from 'react-native-paper'

const notis = [
	{
		id: '1',
		name: 'Trại xoài Đồng Tháp',
		content: 'Tưới sau 5 phút nữa với lượng nước abc xyz',
		timeNoti: '5 phút trước',
		isRead: false,
	},
	{
		id: '2',
		name: 'Trại xoài Đà Lạt',
		content: 'Tưới sau 10 phút nữa với lượng nước abc xyzádfsdaf',
		timeNoti: '10 phút trước',
		isRead: true,
	}
]

export default function Tab() {
	return (
		<View style={{ flex: 1, backgroundColor: '#F5F5F5', padding: 20 }}>
			<View style={{ marginBottom: '4%'}}>
				<SecondaryButton title='Đánh dấu tất cả là đã đọc' 
				onPress={() => {}}
				/>
			</View>

			<FlatList
				data={notis}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<NotiItem
						name={ item.name }
						content={ item.content }
						timeNoti={ item.timeNoti }
						isRead={ item.isRead }
						onPress={ () => {} } 
					/>
				)}
			/>
		</View>
	)
}
