import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);


  useEffect(() => {
    client.fetch(`
    *[_type == "featured"] {
        ...,
        restaurants[] -> {
            ...,
            dishes[] ->
        }
    }
    `).then(data => {
        setFeaturedCategories(data);
    })
  }, []);

  console.log(featuredCategories);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-gray-100 pt-5">
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri:"",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="text-gray-400 font-bold text-xs">Deliver Now</Text>
          <Text className="font-bold text-xl">
            Current Locations
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-1 space-x-2 flex-row bg-gray-200 p-3">
          <MagnifyingGlassIcon color={"gray"} size={20} />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon />
      </View>
      <ScrollView className="bg-gray-100">
        <View>
          <Categories />

          {featuredCategories?.map((category) => (
            <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
