import {View, Text, Image} from "react-native";
import React from "react";
import {images} from "../constants";
import {router} from "expo-router";
import CustomButton from "./CustomButton";
const EmptyState = ({title, subTitle}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-2xl  text-gray-100">{title}</Text>
      <Text className="font-psemibold text-white mt-2">{subTitle}</Text>
      <CustomButton
        title="create video"
        handlePress={() => router.push("/create")}
        containerStyles={"w-full my-5"}
      />
    </View>
  );
};

export default EmptyState;
