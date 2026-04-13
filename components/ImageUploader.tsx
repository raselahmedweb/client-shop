import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onChange: (urls: string[]) => void;
};

const ImageUploader = ({ onChange }: Props) => {
  const { pickAndUpload } = useCloudinaryUpload();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    setLoading(true);
    const urls = await pickAndUpload();

    const updated = [...images, ...urls];
    setImages(updated);

    onChange(updated); // send to parent
    setLoading(false);
  };

  return (
    <View>
      {/* Upload Button */}
      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>
          {loading ? "Uploading..." : "Select Images"}
        </Text>
      </TouchableOpacity>

      {/* Preview */}
      <View style={styles.preview}>
        {images.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.image} />
        ))}
      </View>
    </View>
  );
};

export default ImageUploader;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  preview: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});
