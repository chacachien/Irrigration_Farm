import { View, Text } from 'react-native'
import React, { useState } from 'react'
import TextInput from '@/Components/textInput'
import PrimaryButton from '@/Components/primaryButton'
import { router } from 'expo-router'
import TextButton from '@/Components/textButton'


const changePassword: React.FC = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordConfirm, setOldPasswordConfirm] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    return (
        <View style={{ paddingHorizontal: '6%', paddingTop: '7%' }}>
            <Text style={{ fontSize: 20 }}>Mật khẩu cũ</Text>
            <TextInput style={{ height: 45, backgroundColor: 'white' }} mode='flat' value={ oldPassword } onChangeText={(text) => setOldPassword(text)} />
            <Text style={{ fontSize: 20 }}>Lặp lại mật khẩu cũ</Text>
            <TextInput style={{ height: 45, backgroundColor: 'white' }} mode='flat'value={ oldPasswordConfirm } onChangeText={(text) => setOldPasswordConfirm(text)} />
            <Text style={{ fontSize: 20 }}>Mật khẩu mới</Text>
            <TextInput style={{ height: 45, backgroundColor: 'white' }} mode='flat' value={ newPassword } onChangeText={(text) => setNewPassword(text)} />
            <Text style={{ fontSize: 20 }}>Xác nhận mật khẩu</Text>
            <TextInput style={{ height: 45, backgroundColor: 'white' }} mode='flat' value={ newPasswordConfirm } onChangeText={(text) => setNewPasswordConfirm(text)} />
            <View style={{ marginTop: '5%'}}>

            </View>
            <PrimaryButton title='Hoàn tất' onPress={() => {router.back()}} />
            <View style={{ alignItems: 'center', marginTop: '5%' }}>
                <TextButton title='Hủy' onPress={() => {router.back()}} />
            </View>
        </View>
      )
}

export default changePassword;