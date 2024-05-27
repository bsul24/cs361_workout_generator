const axios = require("axios");
const OpenAI = require("openai");

const generatePrompt = ({
  bmi,
  gender,
  goals,
  duration,
  intensity,
  preferences,
}) => {
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

const validateRequestBody = (body) => {
  const { bmi, gender, goals } = body;
  if (!bmi || !gender || !goals) {
    throw new Error("Please specify bmi, gender, and goals");
  }
};

const fetchWorkoutFromOpenAI = async (prompt) => {
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
  return completion.choices[0].message.content;
};

const generateWorkout = async (req, res) => {
  try {
    validateRequestBody(req.body);
    const prompt = generatePrompt(req.body);
    const workout = await fetchWorkoutFromOpenAI(prompt);
    res.json({ workout });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { generateWorkout };
