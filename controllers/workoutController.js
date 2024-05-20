const axios = require("axios");
const OpenAI = require("openai");

const generatePrompt = (
  bmi,
  gender,
  goals,
  duration,
  intensity,
  preferences
) => {
  let prompt = `Create a workout plan for a ${gender} with a BMI of ${bmi}, aiming for ${goals}.`;

  if (duration) {
    prompt += ` The workouts should last ${duration} minutes.`;
  }

  if (intensity) {
    prompt += ` The intensity of the workouts should be ${intensity}.`;
  }

  if (preferences) {
    prompt += ` Here are some additional preferences: ${preferences.join(
      ", "
    )}.`;
  }

  return prompt;
};

const generateWorkout = async (req, res) => {
  const { bmi, gender, goals, duration, intensity, preferences } = req.body;

  if (!bmi || !gender || !goals) {
    return res
      .status(400)
      .json({ error: "please specify bmi, gender, and goals" });
  }

  const prompt = generatePrompt(
    bmi,
    gender,
    goals,
    duration,
    intensity,
    preferences
  );

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    const workout = completion.choices[0].message.content;
    res.json({ workout });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate workout" });
  }
};

module.exports = { generateWorkout };
