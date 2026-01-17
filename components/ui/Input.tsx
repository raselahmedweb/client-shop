import { StyleSheet, TextInput } from "react-native";

const Input = ({
  placeholder,
  value,
  onChangeText,
  style,
}: {
  placeholder: string;
  value: string;
  onChangeText: any;
  style: object;
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="gray"
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    backgroundColor: "#eeeeee",
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%"
  },
});

export default Input;
