// import { banners } from "@/data/Data";
// import { useRef, useState } from "react";
// import {
//   Animated,
//   Image,
//   PanResponder,
//   Pressable,
//   Text,
//   View,
// } from "react-native";

// export default function SwipBanner() {
//   //! Banner control
//   const [currentBanner, setCurrentBanner] = useState<number>(0);
//   //   const currentBannerData = banners[currentBanner];
//   const animation = useRef(new Animated.Value(0)).current;

//   const bannerController = (index: number) => {
//     if (index === currentBanner) return; // Prevent unnecessary animations

//     Animated.timing(animation, {
//       toValue: index > currentBanner ? -300 : 300,
//       duration: 200,
//       useNativeDriver: true,
//     }).start(() => {
//       setCurrentBanner(index);
//       animation.setValue(index > currentBanner ? 300 : -300);
//       Animated.timing(animation, {
//         toValue: 0,
//         duration: 200,
//         useNativeDriver: true,
//       }).start();
//     });
//   };
//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: (_, gestureState) =>
//         Math.abs(gestureState.dx) > 20,

//       onPanResponderRelease: (_, gestureState) => {
//         if (gestureState.dx < -50 && currentBanner < banners.length - 1) {
//           slideTo(currentBanner + 1);
//         } else if (gestureState.dx > 50 && currentBanner > 0) {
//           slideTo(currentBanner - 1);
//         }
//       },
//     })
//   ).current;

//   const slideTo = (newIndex: number) => {
//     if (
//       newIndex < 0 ||
//       newIndex >= banners.length ||
//       newIndex === currentBanner
//     ) {
//       return; // Prevent invalid slides
//     }

//     const direction = newIndex > currentBanner ? -300 : 300;

//     Animated.timing(animation, {
//       toValue: direction,
//       duration: 200,
//       useNativeDriver: true,
//     }).start(() => {
//       setCurrentBanner(newIndex);
//       animation.setValue(-direction);
//       Animated.timing(animation, {
//         toValue: 0,
//         duration: 200,
//         useNativeDriver: true,
//       }).start();
//     });
//   };

//   // const gestureDirection = (newIndex: number) => {
//   //   return newIndex > currentBanner ? -300 : 300;
//   // };

//   return (
//     <View
//       style={{
//         flexDirection: "column",
//         justifyContent: "flex-start",
//         alignItems: "center",
//         gap: 10,
//       }}
//     >
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "flex-start",
//           alignItems: "flex-start",
//           borderRadius: 15,
//           overflow: "hidden",
//         }}
//       >
//         <Animated.View
//           {...panResponder.panHandlers}
//           style={{
//             transform: [{ translateX: animation }],
//             width: "100%",
//             height: 160,
//           }}
//         >
//           {[banners[currentBanner]].map((item) => (
//             <View
//               key={item.id}
//               style={{
//                 backgroundColor: item.bg,
//                 width: "100%",
//                 height: 160,
//                 padding: 15,
//                 borderRadius: 15,
//                 overflow: "hidden",
//                 justifyContent: "space-between",
//               }}
//             >
//               <View>
//                 <Text
//                   style={{
//                     fontSize: 30,
//                     fontFamily: "Raleway_700Bold",
//                     color: item.text,
//                   }}
//                 >
//                   {item.title}
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: 15,
//                     fontFamily: "Raleway_400Regular",
//                     color: item.text,
//                   }}
//                 >
//                   {item.descountDesc}
//                 </Text>
//               </View>
//               <Text
//                 style={{
//                   fontSize: 20,
//                   fontFamily: "Raleway_700Bold",
//                   color: item.text,
//                 }}
//               >
//                 {item.shortTitle}
//               </Text>
//               <Image
//                 source={{ uri: item.image.url }}
//                 style={{
//                   position: "absolute",
//                   bottom: 0,
//                   right: 20,
//                   zIndex: 1,
//                   width: 130,
//                   height: 130,
//                 }}
//               />
//             </View>
//           ))}
//         </Animated.View>
//       </View>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: 5,
//         }}
//       >
//         {banners.map((item, index) => {
//           return (
//             <Pressable
//               key={item.id}
//               style={{
//                 width: index === currentBanner ? 40 : 13,
//                 height: 13,
//                 borderRadius: 100,
//                 backgroundColor: index === currentBanner ? "#004CFF" : "gray",
//               }}
//               onPress={() => bannerController(index)} // Use index instead of item.id
//             />
//           );
//         })}
//       </View>
//     </View>
//   );
// }
// import { banners } from "@/data/Data";
// import { useRef, useState } from "react";
// import {
//   Animated,
//   Image,
//   PanResponder,
//   Pressable,
//   Text,
//   View,
// } from "react-native";

// export default function SwipeBanner() {
//   const [currentBanner, setCurrentBanner] = useState<number>(0);
//   const currentBannerRef = useRef<number>(0); // Add ref to track current banner
//   const fadeAnim = useRef(new Animated.Value(1)).current;

//   const changeBanner = (newIndex: number) => {
//     if (
//       newIndex < 0 ||
//       newIndex >= banners.length ||
//       newIndex === currentBannerRef.current
//     ) {
//       return;
//     }

//     // Simple fade transition
//     Animated.timing(fadeAnim, {
//       toValue: 0,
//       duration: 150,
//       useNativeDriver: true,
//     }).start(() => {
//       setCurrentBanner(newIndex);
//       currentBannerRef.current = newIndex; // Update ref too
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 150,
//         useNativeDriver: true,
//       }).start();
//     });
//   };

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: (_, gestureState) => {
//         return Math.abs(gestureState.dx) > 20;
//       },
//       onPanResponderRelease: (_, gestureState) => {
//         const current = currentBannerRef.current; // Use ref value
//         console.log(
//           "Swipe detected:",
//           gestureState.dx,
//           "Current banner:",
//           current
//         );

//         if (gestureState.dx < -50) {
//           // Swipe left - next banner
//           console.log("Going to next banner:", current + 1);
//           changeBanner(current + 1);
//         } else if (gestureState.dx > 50) {
//           // Swipe right - previous banner
//           console.log("Going to previous banner:", current - 1);
//           changeBanner(current - 1);
//         }
//       },
//     })
//   ).current;

//   console.log(
//     "Current banner index:",
//     currentBanner,
//     "Total banners:",
//     banners.length
//   );

//   return (
//     <View
//       style={{
//         flexDirection: "column",
//         justifyContent: "flex-start",
//         alignItems: "center",
//         gap: 10,
//         width: "100%",
//       }}
//     >
//       <View
//         style={{
//           width: "100%",
//           borderRadius: 15,
//           overflow: "hidden",
//         }}
//       >
//         <Animated.View
//           {...panResponder.panHandlers}
//           style={{
//             opacity: fadeAnim,
//             width: "100%",
//             height: 160,
//           }}
//         >
//           <View
//             style={{
//               backgroundColor: banners[currentBanner]?.bg || "#000",
//               width: "100%",
//               height: 160,
//               padding: 15,
//               borderRadius: 15,
//               overflow: "hidden",
//               justifyContent: "space-between",
//             }}
//           >
//             <View>
//               <Text
//                 style={{
//                   fontSize: 30,
//                   fontFamily: "Raleway_700Bold",
//                   color: banners[currentBanner]?.text || "#fff",
//                 }}
//               >
//                 {banners[currentBanner]?.title || "Loading..."}
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 15,
//                   fontFamily: "Raleway_400Regular",
//                   color: banners[currentBanner]?.text || "#fff",
//                 }}
//               >
//                 {banners[currentBanner]?.descountDesc || ""}
//               </Text>
//             </View>
//             <Text
//               style={{
//                 fontSize: 20,
//                 fontFamily: "Raleway_700Bold",
//                 color: banners[currentBanner]?.text || "#fff",
//               }}
//             >
//               {banners[currentBanner]?.shortTitle || ""}
//             </Text>
//             {banners[currentBanner]?.image?.url && (
//               <Image
//                 source={{ uri: banners[currentBanner].image.url }}
//                 style={{
//                   position: "absolute",
//                   bottom: 0,
//                   right: 20,
//                   zIndex: 1,
//                   width: 130,
//                   height: 130,
//                 }}
//               />
//             )}
//           </View>
//         </Animated.View>
//       </View>

//       {/* Debug info - remove this after testing */}
//       <Text style={{ color: "red", fontSize: 12 }}>
//         Debug: Banner {currentBanner} of {banners.length - 1}
//       </Text>

//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: 5,
//         }}
//       >
//         {banners.map((item, index) => {
//           return (
//             <Pressable
//               key={item.id}
//               style={{
//                 width: index === currentBanner ? 40 : 13,
//                 height: 13,
//                 borderRadius: 100,
//                 backgroundColor: index === currentBanner ? "#004CFF" : "gray",
//               }}
//               onPress={() => {
//                 console.log("Dot pressed, going to index:", index);
//                 changeBanner(index);
//               }}
//             />
//           );
//         })}
//       </View>
//     </View>
//   );
// }
//!
// import { banners } from "@/data/Data";
// import { useRef, useState } from "react";
// import {
//   Animated,
//   Image,
//   PanResponder,
//   Pressable,
//   Text,
//   View,
// } from "react-native";

// export default function SwipeBanner() {
//   const [currentBanner, setCurrentBanner] = useState<number>(0);
//   const currentBannerRef = useRef<number>(0); // Add ref to track current banner
//   const fadeAnim = useRef(new Animated.Value(1)).current;

//   // Create animated values for each indicator
//   const indicatorAnims = useRef(
//     banners.map((_, index) => new Animated.Value(index === 0 ? 40 : 13))
//   ).current;

//   const changeBanner = (newIndex: number) => {
//     // Handle infinite scrolling
//     let actualIndex = newIndex;
//     if (newIndex < 0) {
//       actualIndex = banners.length - 1; // Go to last banner
//     } else if (newIndex >= banners.length) {
//       actualIndex = 0; // Go to first banner
//     }

//     if (actualIndex === currentBannerRef.current) {
//       return;
//     }

//     // Animate indicators
//     const oldIndex = currentBannerRef.current;

//     // Shrink old indicator
//     Animated.timing(indicatorAnims[oldIndex], {
//       toValue: 13,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();

//     // Expand new indicator
//     Animated.timing(indicatorAnims[actualIndex], {
//       toValue: 40,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();

//     // Simple fade transition
//     Animated.timing(fadeAnim, {
//       toValue: 0,
//       duration: 150,
//       useNativeDriver: true,
//     }).start(() => {
//       setCurrentBanner(actualIndex);
//       currentBannerRef.current = actualIndex; // Update ref too
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 150,
//         useNativeDriver: true,
//       }).start();
//     });
//   };

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: (_, gestureState) => {
//         return Math.abs(gestureState.dx) > 20;
//       },
//       onPanResponderRelease: (_, gestureState) => {
//         const current = currentBannerRef.current; // Use ref value
//         console.log(
//           "Swipe detected:",
//           gestureState.dx,
//           "Current banner:",
//           current
//         );

//         if (gestureState.dx < -10) {
//           // Swipe left - next banner (with infinite loop)
//           const nextIndex = current + 1;
//           console.log(
//             "Going to next banner:",
//             nextIndex >= banners.length ? 0 : nextIndex
//           );
//           changeBanner(nextIndex);
//         } else if (gestureState.dx > 10) {
//           // Swipe right - previous banner (with infinite loop)
//           const prevIndex = current - 1;
//           console.log(
//             "Going to previous banner:",
//             prevIndex < 0 ? banners.length - 1 : prevIndex
//           );
//           changeBanner(prevIndex);
//         }
//       },
//     })
//   ).current;

//   console.log(
//     "Current banner index:",
//     currentBanner,
//     "Total banners:",
//     banners.length
//   );

//   return (
//     <View
//       style={{
//         flexDirection: "column",
//         justifyContent: "flex-start",
//         alignItems: "center",
//         gap: 10,
//         width: "100%",
//       }}
//     >
//       <View
//         style={{
//           width: "100%",
//           borderRadius: 15,
//           overflow: "hidden",
//         }}
//       >
//         <Animated.View
//           {...panResponder.panHandlers}
//           style={{
//             opacity: fadeAnim,
//             width: "100%",
//             height: 160,
//           }}
//         >
//           <View
//             style={{
//               backgroundColor: banners[currentBanner]?.bg || "#000",
//               width: "100%",
//               height: 160,
//               padding: 15,
//               borderRadius: 15,
//               overflow: "hidden",
//               justifyContent: "space-between",
//             }}
//           >
//             <View>
//               <Text
//                 style={{
//                   fontSize: 30,
//                   fontFamily: "Raleway_700Bold",
//                   color: banners[currentBanner]?.text || "#fff",
//                 }}
//               >
//                 {banners[currentBanner]?.title || "Loading..."}
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 15,
//                   fontFamily: "Raleway_400Regular",
//                   color: banners[currentBanner]?.text || "#fff",
//                 }}
//               >
//                 {banners[currentBanner]?.descountDesc || ""}
//               </Text>
//             </View>
//             <Text
//               style={{
//                 fontSize: 20,
//                 fontFamily: "Raleway_700Bold",
//                 color: banners[currentBanner]?.text || "#fff",
//               }}
//             >
//               {banners[currentBanner]?.shortTitle || ""}
//             </Text>
//             {banners[currentBanner]?.image?.url && (
//               <Image
//                 source={{ uri: banners[currentBanner].image.url }}
//                 style={{
//                   position: "absolute",
//                   bottom: 0,
//                   right: 20,
//                   zIndex: 1,
//                   width: 130,
//                   height: 130,
//                 }}
//               />
//             )}
//           </View>
//         </Animated.View>
//       </View>

//       {/* Debug info - remove this after testing */}
//       {/* <Text style={{ color: "red", fontSize: 12 }}>
//         Debug: Banner {currentBanner} of {banners.length - 1}
//       </Text> */}

//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: 5,
//         }}
//       >
//         {banners.map((item, index) => {
//           return (
//             <Pressable
//               key={item.id}
//               onPress={() => {
//                 console.log("Dot pressed, going to index:", index);
//                 changeBanner(index);
//               }}
//             >
//               <Animated.View
//                 style={{
//                   width: indicatorAnims[index],
//                   height: 13,
//                   borderRadius: 100,
//                   backgroundColor: index === currentBanner ? "#004CFF" : "gray",
//                 }}
//               />
//             </Pressable>
//           );
//         })}
//       </View>
//     </View>
//   );
// }
import { banners } from "@/data/Data";
import { useRef, useState } from "react";
import {
  Animated,
  Image,
  PanResponder,
  Pressable,
  Text,
  View,
} from "react-native";

export default function SwipeBanner() {
  const [currentBanner, setCurrentBanner] = useState<number>(0);
  const currentBannerRef = useRef<number>(0);
  const slideAnim = useRef(new Animated.Value(0)).current; // Changed from fadeAnim to slideAnim
  const isAnimating = useRef(false);

  // Create animated values for each indicator
  const indicatorAnims = useRef(
    banners.map((_, index) => new Animated.Value(index === 0 ? 40 : 13))
  ).current;

  const changeBanner = (
    newIndex: number,
    direction: "left" | "right" = "left"
  ) => {
    // Handle infinite scrolling
    let actualIndex = newIndex;
    if (newIndex < 0) {
      actualIndex = banners.length - 1; // Go to last banner
    } else if (newIndex >= banners.length) {
      actualIndex = 0; // Go to first banner
    }

    if (actualIndex === currentBannerRef.current || isAnimating.current) {
      return;
    }

    isAnimating.current = true;

    // Animate indicators
    const oldIndex = currentBannerRef.current;

    // Shrink old indicator
    Animated.timing(indicatorAnims[oldIndex], {
      toValue: 13,
      duration: 200,
      useNativeDriver: false,
    }).start();

    // Expand new indicator
    Animated.timing(indicatorAnims[actualIndex], {
      toValue: 40,
      duration: 200,
      useNativeDriver: false,
    }).start();

    // Slide animation based on direction
    const slideDirection = direction === "left" ? -300 : 300;

    Animated.timing(slideAnim, {
      toValue: slideDirection,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setCurrentBanner(actualIndex);
      currentBannerRef.current = actualIndex;
      slideAnim.setValue(-slideDirection); // Position new banner off-screen on opposite side

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        isAnimating.current = false;
      });
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderRelease: (_, gestureState) => {
        const current = currentBannerRef.current;
        // console.log(
        //   "Swipe detected:",
        //   gestureState.dx,
        //   "Current banner:",
        //   current
        // );

        if (gestureState.dx < -10) {
          // Swipe left - next banner slides in from right
          const nextIndex = current + 1;
          // console.log(
          //   "Going to next banner:",
          //   nextIndex >= banners.length ? 0 : nextIndex
          // );
          changeBanner(nextIndex, "left");
        } else if (gestureState.dx > 10) {
          // Swipe right - previous banner slides in from left
          const prevIndex = current - 1;
          // console.log(
          //   "Going to previous banner:",
          //   prevIndex < 0 ? banners.length - 1 : prevIndex
          // );
          changeBanner(prevIndex, "right");
        }
      },
    })
  ).current;

  // console.log(
  //   "Current banner index:",
  //   currentBanner,
  //   "Total banners:",
  //   banners.length
  // );

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        width: "100%",
      }}
    >
      <View
        style={{
          width: "100%",
          borderRadius: 15,
          overflow: "hidden",
        }}
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            transform: [{ translateX: slideAnim }],
            width: "100%",
            height: 160,
          }}
        >
          <View
            style={{
              backgroundColor: banners[currentBanner]?.bg || "#000",
              width: "100%",
              height: 160,
              padding: 15,
              borderRadius: 15,
              overflow: "hidden",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: "Raleway_700Bold",
                  color: banners[currentBanner]?.text || "#fff",
                }}
              >
                {banners[currentBanner]?.title || "Loading..."}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Raleway_400Regular",
                  color: banners[currentBanner]?.text || "#fff",
                }}
              >
                {banners[currentBanner]?.descountDesc || ""}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Raleway_700Bold",
                color: banners[currentBanner]?.text || "#fff",
              }}
            >
              {banners[currentBanner]?.shortTitle || ""}
            </Text>
            {banners[currentBanner]?.image?.url && (
              <View
                style={{
                  position: "absolute",
                  bottom: banners[currentBanner]?.image?.bottom,
                  right: banners[currentBanner]?.image?.right,
                  zIndex: 1,
                  width: banners[currentBanner]?.image?.width,
                  height: banners[currentBanner]?.image?.height,
                }}
              >
                <Image
                  source={{ uri: banners[currentBanner].image.url }}
                  style={{ flex: 1 }}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
        </Animated.View>
      </View>

      {/* Debug info - remove this after testing */}
      {/* <Text style={{ color: "red", fontSize: 12 }}>
        Debug: Banner {currentBanner} of {banners.length - 1}
      </Text> */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        {banners.map((item, index) => {
          return (
            <Pressable
              key={item.id}
              onPress={() => {
                console.log("Dot pressed, going to index:", index);
                // For dot presses, determine direction based on current vs target index
                const direction = index > currentBanner ? "left" : "right";
                changeBanner(index, direction);
              }}
            >
              <Animated.View
                style={{
                  width: indicatorAnims[index],
                  height: 13,
                  borderRadius: 100,
                  backgroundColor: index === currentBanner ? "#004CFF" : "gray",
                }}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
