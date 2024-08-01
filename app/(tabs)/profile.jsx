import {View, Text, FlatList, TouchableOpacity, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import {GetUserPosts, signOut} from "../../lib/appwrite";
import UseAppwrite from "../../lib/UseAppwrite";
import VideoCard from "../../components/VideoCard";
import {useGlobalContext} from "../../context/GlobalProvider";
import {icons} from "../../constants";
import InfoBox from "../../components/InfoBox";
import {router} from "expo-router";

const Profile = () => {
  const {user, setUser, setIsLogged} = useGlobalContext();
  const {data: post} = UseAppwrite(() =>
    user ? GetUserPosts(user.$id) : null
  );

  console.log(post);

  const logOut = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in");
  };

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={post}
          keyExtractor={(item) => item.$id}
          renderItem={({item}) => <VideoCard video={item} />}
          ListHeaderComponent={() => (
            <View className="w-full justify-center items-center mt-6 mb-12 px-4">
              <TouchableOpacity
                className="w-full items-end mb-10"
                onPress={logOut}>
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
              <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                <Image
                  source={{uri: user?.avatar}}
                  className="w-[90%] h-[90%] rounded-lg"
                  resizeMode="cover"
                />
              </View>
              <InfoBox
                title={user?.username}
                containerStyles="mt-5"
                titleStyle="text-lg"
              />
              <View className="mt-5 flex-row ">
                <InfoBox
                  title={post.length || 0}
                  subtitle="post"
                  containerStyles="mr-10"
                  titleStyle="text-xl"
                />
                <InfoBox
                  title={"1.2k"}
                  subtitle="followers"
                  titleStyle="text-lg"
                />
              </View>
            </View>
          )}
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

export default Profile;
