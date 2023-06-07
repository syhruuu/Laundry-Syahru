import { StyleSheet, Text, View ,ScrollView,Pressable,Image} from 'react-native'
import React from 'react'

const Services = () => {

 const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3322/3322056.png",
      name: "Mencuci",
     
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/2990/2990564.png",
      name: "Laundry"
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/2933/2933461.png",
      name: "Cuci & Setrika",
     
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/994/994928.png",
      name: "Pembersih",
    },
   
  ];
  return (
    <View style={{padding:10}}>
        <Text style={{fontSize:16,fontWeight:"500",marginBottom:7}}>Layanan Yang Tersedia</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {services.map((service,index) => (
                <Pressable style={{margin:10,backgroundColor:"white",padding:20,borderRadius:7}} key={index}>
                    <Image source={{uri:service.image}} style={{width:70,height:70}}/>

                    <Text style={{textAlign:"center",marginTop:10}}>{service.name}</Text>
                </Pressable>
            ))}
        </ScrollView>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({})