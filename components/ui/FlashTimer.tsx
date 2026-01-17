import { flashtime } from "@/data/Data";
import { Ionicons } from "@expo/vector-icons"; // For stopwatch icon
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function FlashTimer() {
  const endTime = new Date(flashtime[0].endTime).getTime();

  const getTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const diff = Math.max(endTime - now, 0);

    const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
      2,
      "0"
    );
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

    return { hours, minutes, seconds };
  }, [endTime]);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [getTimeLeft]);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
      <Ionicons name="timer-outline" size={24} color="blue" />

      {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((unit, i) => (
        <View
          key={i}
          style={{
            backgroundColor: "#ffecec",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
            minWidth: 30,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}>
            {unit}
          </Text>
        </View>
      ))}
    </View>
  );
}
