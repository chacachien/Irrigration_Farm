import { Stack, useRouter } from "expo-router";
import { Button } from "react-native";

export default function SettingsLayout() {
    const router = useRouter();
    console.log("Is it come here when it ren der? ");

    return (
        <Stack screenOptions={{
            headerTitleAlign: 'center'
        }}>
            <Stack.Screen name="index" options={{ title: "Cài đặt" }} />
            <Stack.Screen name="infoDetails" options={{ title: "Thông tin cá nhân" }} />
        </Stack>
    )
}