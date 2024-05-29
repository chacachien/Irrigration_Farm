import { Stack, useRouter } from "expo-router";
import { Button } from "react-native";

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
        <Stack screenOptions={{
            headerTitleAlign: 'center'
        }}>
            <Stack.Screen name="index" options={{ title: "Cài đặt" }} initialParams={ infoDetail } />
            <Stack.Screen name="infoDetails" options={{ title: "Thông tin cá nhân" }} initialParams={ infoDetail } />
            <Stack.Screen name='changePassword' options={{ title: "Đổi mật khẩu" }} />
            <Stack.Screen name='help' options={{ title: "Trợ giúp" }} />
            <Stack.Screen name='privacy' options={{ title: "Chính sách và quyền riêng tư" }} />
            <Stack.Screen name='intro' options={{ title: "Giới thiệu về ứng dụng" }} />
        </Stack>
    )
}