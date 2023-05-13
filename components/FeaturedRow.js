import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import client from '../sanity'

const FeaturedRow = ({id, title, description}) => {

  const [restaurants, setRestaurants] = useState([]);


  useEffect(() => {
    client.fetch(`
    *[_type == "featured" && _id == $id] {
            ...,
            restaurants[] -> {
              ...,
              dishes[] ->,
              type -> {
                name
              }
            },
    }[0]
    `,{ id }).then(data=> {
      setRestaurants(data?.restaurants)
    })
  },[])
  console.log(restaurants)

  return (
    <View>
      <View className='mt-4 flex-row items-center justify-between px-4'>
        <Text className='font-bold text-lg'>{title}</Text>
        <ArrowRightIcon color={'#00CCBB'}/>
        </View>
        <Text className='text-xs text-gray-500 px-4'>
          {description}
        </Text>
        <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className='pt-4'
        >
          <RestaurantCard
          id = {123}
          imgUrl = 'https://links.papareact.com/gn7'
          title = 'Yo! Sushi'
          rating = {4.5}
          genre = 'Japanese'
          address = '124 PyiTawThar St'
          short_description = 'This is a Test'
          dishes = {[]}
          long = {20}
          lat = {10}
          />
           <RestaurantCard
          id = {123}
          imgUrl = 'https://links.papareact.com/gn7'
          title = 'Yo! Sushi'
          rating = {4.5}
          genre = 'Japanese'
          address = '124 PyiTawThar St'
          short_description = 'This is a Test'
          dishes = {[]}
          long = {20}
          lat = {10}
          />
           <RestaurantCard
          id = {123}
          imgUrl = 'https://links.papareact.com/gn7'
          title = 'Yo! Sushi'
          rating = {4.5}
          genre = 'Japanese'
          address = '124 PyiTawThar St'
          short_description = 'This is a Test'
          dishes = {[]}
          long = {20}
          lat = {10}
          />

        </ScrollView>
    </View>
  )
}

export default FeaturedRow