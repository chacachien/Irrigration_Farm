import { Stack, useRouter } from "expo-router";
import React from "react";
import { Button, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const infoDetail = {
	userId: "123456",
	name: "Nguyễn Văn A",
	email: "nva@email.com", 
	phoneNumber: "0123456789",
}

export default function SettingsLayout() {
    const router = useRouter();
    // console.log("Is it come here when it ren der? ");
    // router.push({
    //     pathname: 'settings/index',
    //     params: infoDetail
    // })

    // router.push({
    //     pathname: 'settings/infoDetails',
    //     params: infoDetail
    // })


    return (
			<Stack

			>
				<Stack.Screen
					name="index"
					options={{ title: 'Cài đặt', headerTitleAlign: 'center' }}
					initialParams={infoDetail}
				/>
				<Stack.Screen
					name="infoDetails"
					options={{ title: 'Thông tin cá nhân', headerTitleAlign: 'center' }}
					initialParams={infoDetail}
				/>
				<Stack.Screen
					name="changePassword"
					options={{ title: 'Đổi mật khẩu', headerTitleAlign: 'center' }}
				/>
				<Stack.Screen name="help" options={{ title: 'Trợ giúp', headerTitleAlign: 'center' }} />
				<Stack.Screen
					name="privacy"
					options={{ title: 'Chính sách và quyền riêng tư', headerTitleAlign: 'center' }}
				/>
				<Stack.Screen
					name="intro"
					options={{ title: 'Giới thiệu về ứng dụng', headerTitleAlign: 'center' }}
				/>
			</Stack>
		)
}