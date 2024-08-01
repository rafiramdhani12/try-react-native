import {View, Text, FlatList} from "react-native";
import React, {useEffect} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import {SearchPosts} from "../../lib/appwrite";
import UseAppwrite from "../../lib/UseAppwrite";
import VideoCard from "../../components/VideoCard";
import {useLocalSearchParams} from "expo-router";

const Search = () => {
  const {query} = useLocalSearchParams();
  const {data: post, refecth} = UseAppwrite(() => SearchPosts(query));

  console.log(query, post);

  useEffect(() => {
    refecth();
  }, [query]);

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={post}
          keyExtractor={(item) => item.$id}
          renderItem={({item}) => <VideoCard video={item} />}
          ListHeaderComponent={() => {
            return (
              <View className="my-6 px-4">
                <Text className="font-pmedium text-sm text-gray-100">
                  Search Result
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  {query}
                </Text>
                <View className="mt-6 mb-8">
                  <SearchInput initalQuery={query} />
                </View>
              </View>
            );
          }}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found"
              subTitle="No Videos found for this search query"
            />
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default Search;
