import {View, Text, ScrollView, Image, Alert} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import {Link, router} from "expo-router";
import {createUser} from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("error", "please fill in all the fields");
      return;
    }

    console.log("Submitting user:", form); // Tambahkan log ini

    setSubmitting(true);

    try {
      const result = await createUser(form.username, form.email, form.password);
      console.log("User created:", result); // Tambahkan log ini
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="w-full justify-center h-full min-h-[85vh] px-4 my-6 ">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[115px] h-[35px]"
            />
            <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
              Sign up
            </Text>
            <FormField
              title="username"
              value={form.username}
              handleChangeText={(e) => setForm({...form, username: e})}
              otherStyles="mt-7"
            />
            <FormField
              title="email"
              value={form.email}
              handleChangeText={(e) => setForm({...form, email: e})}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <FormField
              title="password"
              value={form.password}
              handleChangeText={(e) => setForm({...form, password: e})}
              otherStyles="mt-7"
            />
            <CustomButton
              title={"sign-up"}
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={submitting}
            />
            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-300 font-pregular">
                Already Have Account ?
              </Text>
              <Link
                href={"/sign-in"}
                className="text-lg text-gray-300 underline">
                Sign In
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignUp;
