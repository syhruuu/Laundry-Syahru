import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://img.freepik.com/free-vector/laundry-dry-cleaning-concept-illustration_114360-7391.jpg?w=900&t=st=1686017637~exp=1686018237~hmac=bfd7efeae9555e18349da6fc06b25a68c31cd1f15663a8741942474650787473",
    "https://img.freepik.com/free-photo/woman-using-capsule-wash-her-clothes_23-2149117041.jpg?w=900&t=st=1686017789~exp=1686018389~hmac=63b49f7f4af9df4d289b89639baacbc9a9e01b4f489e61566c619f407f39dd91",
  ];
  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={"#13274F"}
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{
          borderRadius: 6,
          width: "94%",
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
