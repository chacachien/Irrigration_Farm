import { useRouter, router } from 'expo-router';
import { View, Text, Button } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';



const InfoDetail: React.FC = () => {
	// const router = useRoute<InfoDetailRouteProp>();
	
	return (
		<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
			<Text>Tab Info Details</Text>
            <Button title='test' onPress={() => router.back()} />
		</View>
	)
};

export default InfoDetail;