import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// see Material Icons in the [Icons Directory](https://icons.expo.fyi).

export function Icon({
  name,
  size = 24,
  color,
  style = {},
}) {
  return <MaterialIcons color={color} size={size} name={name} style={style} />;
}
