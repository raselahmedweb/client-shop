import * as ImagePicker from "expo-image-picker";

const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_PRESET_NAME as string;

export const useCloudinaryUpload = () => {
  const pickAndUpload = async () => {
    try {
      // Ask permission
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        alert("Permission required!");
        return [];
      }

      // Pick images
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.7,
      });

      if (result.canceled) return [];

      const uploadedUrls: string[] = [];

      // Upload each image
      for (let asset of result.assets) {
        const formData = new FormData();

        formData.append("file", {
          uri: asset.uri,
          type: "image/jpeg",
          name: "upload.jpg",
        } as any);

        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await res.json();

        uploadedUrls.push(data.secure_url);
      }

      return uploadedUrls;
    } catch (err) {
      console.log("Upload error:", err);
      return [];
    }
  };

  return { pickAndUpload };
};
