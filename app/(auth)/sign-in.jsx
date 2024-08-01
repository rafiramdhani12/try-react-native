import {View, Text, ScrollView, Image, Alert} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import {Link, router} from "expo-router";
import {getCurrentUser, signIn} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";

const Signin = () => {
  const {setUser, setIsLogged} = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("error", "please fill in all fields ");
    }
    setSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      Alert.alert("Success", "user signed in succesfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("error", error.message);
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
              Log in to Aora
            </Text>
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
              title={"sign-in"}
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={submitting}
            />
            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-300 font-pregular">
                Dont Have Account?
              </Text>
              <Link
                href={"/sign-up"}
                className="text-lg text-gray-300 underline">
                Sign Up
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Signin;
