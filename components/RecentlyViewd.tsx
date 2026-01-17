import { Image, Text, View } from 'react-native';


export default function RecentlyViewd() {
      const recentlyViewed = [
        {
          id: 9,
          url: "https://res.cloudinary.com/dywjhzbti/image/upload/v1750111076/samples/people/boy-snow-hoodie.jpg",
        },
        {
          id: 8,
          url: "https://res.cloudinary.com/demo/image/upload/sunglasses.png",
        },
        {
          id: 10,
          url: "https://res.cloudinary.com/dywjhzbti/image/upload/v1750111084/samples/look-up.jpg",
        },
        {
          id: 13,
          url: "https://res.cloudinary.com/dywjhzbti/image/upload/v1750255831/D1D72D4D-1D49-410C-870A-423B20DE974E_bpidz2.png",
        },
        {
          id: 17,
          url: "https://res.cloudinary.com/dywjhzbti/image/upload/v1750112660/lingerie2_gqodys.png",
        },
        {
          id: 19,
          url: "https://res.cloudinary.com/dywjhzbti/image/upload/v1750255830/AB90E177-EBD5-42AF-A94E-05F24787DEE2_znfguf.png",
        },
      ];
    
  return (
    <View>
      {recentlyViewed && recentlyViewed.length > 0 && (
                <View
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    gap: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 26,
                      fontFamily: "Raleway_800ExtraBold",
                    }}
                  >
                    Recently viewed
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    {recentlyViewed.map((item) => {
                      return (
                        <View
                          key={item.id}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            borderWidth: 5,
                            borderColor: "#fff",
                            shadowOffset: {
                              width: 5,
                              height: 5,
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: 8,
                            shadowColor: "#000",
                            // Android shadow
                            elevation: 8,
                            backgroundColor: "#fff",
                          }}
                        >
                          <Image
                            source={{ uri: item.url }}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: 100,
                            }}
                          />
                        </View>
                      );
                    })}
                  </View>
                </View>
              )}
    </View>
  )
}