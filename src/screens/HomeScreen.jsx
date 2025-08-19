import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css"; // Ensure global styles are applie
export default function HomeScreen() {
  const [height, setHeight] = useState(""); // in cm
  const [weight, setWeight] = useState(""); // in kg
  const [bmi, setBmi] = useState(null);
  const [diet, setDiet] = useState("Veg");

  const calculateBMI = () => {
    if (!height || !weight) return;
    const h = parseFloat(height) / 100; // convert cm → m
    const w = parseFloat(weight);
    const bmiValue = (w / (h * h)).toFixed(1);
    setBmi(bmiValue);
  };

  return (
    <SafeAreaView className="flex-1 bg-orange-50 p-6">
      <Text className="text-3xl font-bold text-center mb-6">
        🏋️ Gym Meal Planner
      </Text>

      {/* Height Input */}
      <Text className="text-lg font-semibold mb-2">Height (cm)</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4 bg-white"
        keyboardType="numeric"
        placeholder="Enter height in cm"
        value={height}
        onChangeText={setHeight}
      />

      {/* Weight Input */}
      <Text className="text-lg font-semibold mb-2">Weight (kg)</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4 bg-white"
        keyboardType="numeric"
        placeholder="Enter weight in kg"
        value={weight}
        onChangeText={setWeight}
      />

      {/* Diet Preference */}
      <Text className="text-lg font-semibold mb-2">Diet Preference</Text>
      <View className="flex-row justify-around mb-6">
        <TouchableOpacity
          className={`px-6 py-3 rounded-xl ${
            diet === "Veg" ? "bg-green-500" : "bg-gray-200"
          }`}
          onPress={() => setDiet("Veg")}
        >
          <Text className="text-white font-bold">Veg 🌱</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`px-6 py-3 rounded-xl ${
            diet === "Non-Veg" ? "bg-red-500" : "bg-gray-200"
          }`}
          onPress={() => setDiet("Non-Veg")}
        >
          <Text className="text-white font-bold">Non-Veg 🍗</Text>
        </TouchableOpacity>
      </View>

      {/* Calculate Button */}
      <TouchableOpacity
        className="bg-orange-600 py-4 rounded-xl"
        onPress={calculateBMI}
      >
        <Text className="text-center text-white font-bold text-lg">
          Calculate BMI
        </Text>
      </TouchableOpacity>

      {/* Result */}
      {bmi && (
        <View className="mt-6 bg-white p-6 rounded-2xl shadow">
          <Text className="text-xl font-bold text-center mb-2">
            Your BMI: {bmi}
          </Text>
          <Text className="text-center text-lg">
            Diet Preference:{" "}
            <Text className="font-bold">{diet}</Text>
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
