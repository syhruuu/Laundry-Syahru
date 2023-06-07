import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [items,setItems] = useState([]);
  const total = cart.map((item) => item.quantity * item.price).reduce((curr,prev) => curr + prev,0);
  const navigation = useNavigation();
  console.log(cart);
  const [displayCurrentAddress, setdisplayCurrentAddress] = useState("Kami sedang memuat lokasi Anda");
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Layanan lokasi Anda tidak aktif",
        "Silakan aktifkan lokasi Anda",
        [
          {
            text: "Batalkan",
            onPress: () => console.log("Tekan Batalkan"),
            style: "Batalkan",
          },
          { text: "OK", onPress: () => console.log("Tekan OK") },
        ],
        { cancelable: false }
      );
    } else {
      setlocationServicesEnabled(enabled);
    }
  };
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Izin ditolak",
        "Mengizinkan aplikasi untuk menggunakan layanan lokasi",
        [
          {
            text: "Batalkan",
            onPress: () => console.log("Tekan Batalkan"),
            style: "Batalkan",
          },
          { text: "OK", onPress: () => console.log("Tekan OK") },
        ],
        { cancelable: false }
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });


      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  };
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = async () => {
      const colRef = collection(db,"types");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);
  console.log(product);
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/2503/2503380.png",
      name: "Kemeja",
      quantity: 0,
      price: 3.000,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/2912/2912546.png",
      name: "Kaos",
      quantity: 0,
      price: 2.000,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/2390/2390065.png",
      name: "Gaun",
      quantity: 0,
      price: 4.000,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/1176/1176990.png",
      name: "Jeans",
      quantity: 0,
      price: 4.000,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/3531/3531772.png",
      name: "Celana Panjang",
      quantity: 0,
      price: 2.500,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/10755/10755315.png",
      name: "Sweater",
      quantity: 0,
      price: 3.000,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/7462/7462718.png",
      name: "Celana Pendek",
      quantity: 0,
      price: 1.000,
    },
    {
      id: "17",
      image: "https://cdn-icons-png.flaticon.com/128/4058/4058528.png",
      name: "Lekbong",
      quantity: 0,
      price: 1.000,
    },
  ];
  return (
    <>
      <ScrollView
        style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 50 }}
      >
        {/* Location and Profile */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <MaterialIcons name="location-on" size={30} color="#fd5c63" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Beranda</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>

          <Pressable onPress={() => navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 7 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://lh3.googleusercontent.com/ogw/AOLn63Gw4YIKRZNn-XgxtRbtrvzuMn4y4nsnaBvcs80x=s32-c-mo",
              }}
            />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
            borderRadius: 7,
          }}
        >
          <TextInput placeholder="Search for items or More" />
          <Feather name="search" size={24} color="gray" />
        </View>

        {/* Image Carousel */}
        <Carousel />

        {/* Services Component */}
        <Services />

        {/* Render all the Products */}
        {product.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}
      </ScrollView>

          {total === 0 ? (
            null
          ) : (
            <Pressable
            style={{
              backgroundColor: "#088F8F",
              padding: 10,
              marginBottom: 40,
              margin: 15,
              borderRadius: 7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent:"space-between",
            }}
          >
            <View>
              <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>{cart.length} Barang |  Rp {total}</Text>
              <Text style={{fontSize:15,fontWeight:"400",color:"white",marginVertical:6}}>Biaya tambahan mungkin berlaku</Text>
            </View>
    
            <Pressable onPress={() => navigation.navigate("PickUp")}>
              <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Lanjutkan ke pengambilan barang</Text>
            </Pressable>
          </Pressable>
          )}
     
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
