// import { Link } from "expo-router";
// import { useState } from "react";
// import { DimensionValue, Image, Text, View } from "react-native";
// export default function ProductCard(props: {
//   img: string;
//   title?: string;
//   description?: string;
//   price?: number;
//   salePrice?: number;
//   totalSold?: number;
//   w?: DimensionValue | undefined;
//   id: number;
// }) {
//   const [imageSize, setImageSize] = useState(0);
//   return (
//     <Link
//       href={{ pathname: "/shop/[id]", params: { id: props.id.toString() } }}
//       style={{
//         flexDirection: "column",
//         gap: 10,
//         width: props.w || 150,
//         overflow: "visible",
//         paddingTop: 15,
//       }}
//     >
//       <View
//         style={{
//           borderWidth: 5,
//           borderColor: "#fff",
//           borderRadius: 8,
//           shadowOffset: {
//             width: 5,
//             height: 5,
//           },
//           shadowOpacity: 0.3,
//           shadowRadius: 8,
//           shadowColor: "#000",
//           // Android shadow
//           elevation: 8,
//           backgroundColor: "#fff",
//         }}
//         onLayout={(event) => {
//           const width = event.nativeEvent.layout.width;
//           setImageSize(width);
//         }}
//       >
//         <Image
//           source={{ uri: props.img }}
//           style={{
//             width: "100%",
//             height: imageSize,
//             borderRadius: 8,
//           }}
//         />
//       </View>
//       <View
//         style={{
//           flexDirection: "column",
//           gap: 5,
//           padding: 3,
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 14,
//             fontWeight: "bold",
//           }}
//         >
//           {props.title}
//         </Text>
//         <Text
//           style={{
//             fontSize: 12,
//           }}
//         >
//           {props.description && `${props.description.slice(0, 35)}...`}
//         </Text>
//         <Text
//           style={{
//             fontSize: 22,
//             fontWeight: "bold",
//           }}
//         >
//           {`$${props.price}`}
//         </Text>
//       </View>
//     </Link>
//   );
// }
import { Link } from "expo-router";
import { useState } from "react";
import {
  DimensionValue,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductCard(props: {
  img: string;
  title?: string;
  description?: string;
  price?: number;
  salePrice?: number;
  totalSold?: number;
  w?: DimensionValue | undefined;
  id: number;
}) {
  const [imageSize, setImageSize] = useState(0);

  return (
    <Link
      href={{ pathname: "/shop/[id]", params: { id: props.id.toString() } }}
      asChild
    >
      <TouchableOpacity activeOpacity={0.8} style={{ width: props.w || 150 }}>
        <View
          style={{
            flexDirection: "column",
            gap: 10,
            width: "100%",
            overflow: "visible",
            paddingTop: 15,
          }}
        >
          <View
            style={{
              borderWidth: 5,
              borderColor: "#fff",
              borderRadius: 8,
              shadowOffset: { width: 5, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              shadowColor: "#000",
              elevation: 8,
              backgroundColor: "#fff",
            }}
            onLayout={(event) => {
              const width = event.nativeEvent.layout.width;
              setImageSize(width);
            }}
          >
            <Image
              source={{ uri: props.img }}
              style={{
                width: "100%",
                height: imageSize,
                borderRadius: 8,
              }}
            />
          </View>

          <View style={{ flexDirection: "column", gap: 5, padding: 3 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {props.title}
            </Text>
            <Text style={{ fontSize: 12 }}>
              {props.description && `${props.description.slice(0, 35)}...`}
            </Text>
            <Text
              style={{ fontSize: 22, fontWeight: "bold" }}
            >{`$${props.price}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
