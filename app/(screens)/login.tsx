import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { router } from 'expo-router';

import { supabase } from '../../utils/supabase';

import InputField from '../../components/InputField';

const Login = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  async function signInWithEmail() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email!,
      password: password!,
    });

    if (error) Alert.alert(error.message);

    router.replace('/');
  }

  return (
    <View className="flex-1 justify-center items-center mb-[200px]">
      <Text className="font-[Medium] text-xl p-2.4 mb-5">Welcome to your PDA</Text>

      <InputField
        header={'Email'}
        value={email!}
        setValue={setEmail}
        placeholder={'me@example.com'}
        style="w-full"
      />

      <InputField
        header={'Password'}
        value={password!}
        setValue={setPassword}
        placeholder={'******'}
        style="w-full"
      />

      <TouchableOpacity
        onPress={signInWithEmail}
        className="bg-[#348ceb] w-[90%] h-10 items-center justify-center rounded mt-1.5">
        <Text className="font-[Medium] text-white">Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
