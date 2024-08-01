import {View, Text, TextInput, TouchableOpacity, Image} from "react-native";
import React, {useState} from "react";
import {icons, images} from "../constants";
import {router, usePathname} from "expo-router";

const SearchInput = ({initialQuery}) => {
  const pathName = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
        <TextInput
          className="flex-1 text-white font-pregular text-base"
          value={query}
          placeholder="search a video topic"
          placeholderTextColor={"#CDCDE0"}
          onChangeText={(e) => setQuery(e)}
        />
        <TouchableOpacity
          onPress={() => {
            if (!query) {
              return Alert.alert(
                "Missing Query",
                "please input something to search across database"
              );
            }
            if (pathName.startsWith("/serach")) router.setParams({query});
            else router.push(`/search/${query}`);
          }}>
          <Image
            source={icons.search}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SearchInput;
