import {View, Text, FlatList, Image, RefreshControl, Alert} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import {GetAllPost, GetLatestPost} from "../../lib/appwrite";
import UseAppwrite from "../../lib/UseAppwrite";
import VideoCard from "../../components/VideoCard";

const Home = () => {
  const {data: post, refecth} = UseAppwrite(GetAllPost);
  const {data: latestPost} = UseAppwrite(GetLatestPost);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refecth();
    // re call videos -> if any new videos appeard
    setRefreshing(false);
  };
  console.log(post);
  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        {/*flatlist = map */}
        <FlatList
          data={post}
          keyExtractor={(item) => item.$id}
          renderItem={({item}) => <VideoCard video={item} />}
          ListHeaderComponent={() => {
            return (
              <View className="my-6 px-4 space-y-6">
                <View className="justify-between items-start flex-row mb-6">
                  <View>
                    <Text className="font-pmedium text-sm text-gray-100">
                      Welcome Back
                    </Text>
                    <Text className="text-2xl font-psemibold text-white">
                      amba
                    </Text>
                  </View>
                  <View className="mt-1.5">
                    <Image
                      source={images.logoSmall}
                      resizeMode="contain"
                      className="w-9 h-10"
                    />
                  </View>
                </View>
                <SearchInput />
                <View className="w-full flex-1 pt-5 pb-2">
                  <Text className="text-gray-100 text-lg font-pregular">
                    Latest Video
                  </Text>
                  <Trending posts={latestPost ?? []} />
                </View>
              </View>
            );
          }}
          ListEmptyComponent={() => (
            <EmptyState title="No Videos Found" subTitle="No Videos Create" />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
