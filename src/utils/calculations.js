export const calculateBMR = (weight, height, age, gender) => {
  // Mifflin-St Jeor formula
  if (gender === 'Male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

export const calculateDailyCalories = (bmr, activityLevel, goal) => {
  // Activity multipliers
  const multipliers = {
    Sedentary: 1.2,
    Moderate: 1.55,
    Active: 1.725,
  };
  let calories = bmr * (multipliers[activityLevel] || 1.2);
  
  // Goal adjustments
  if (goal === 'Lose Weight') {
    calories -= 500;
  } else if (goal === 'Gain Muscle') {
    calories += 500;
  }
  return Math.round(calories);
};

export const getMacroBreakdown = (calories) => {
  // Example: 40% carbs, 30% protein, 30% fats
  const carbs = Math.round((calories * 0.4) / 4); // 4 kcal/g
  const protein = Math.round((calories * 0.3) / 4); // 4 kcal/g
  const fats = Math.round((calories * 0.3) / 9); // 9 kcal/g
  return { carbs, protein, fats };
};