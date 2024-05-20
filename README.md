# Workout Generator Microservice

This is the README for the Workout Generator Microservice. See below for how to request and receive data from the microservice.

## Requests/Responses

In order to request data from the microservice, users must make a POST request to the following endpoint:

https://workout-generator-microservice-ec908109836b.herokuapp.com/api/workouts/generate

There are certain parameters that must be specified in both the body and the header of the request. In the body, users have to specify at least the `bmi`, `gender`, and `goals`. Optionally, users can also specify the workout durations (in minutes), the relative intensity of the workouts, and any other preferences they have. Preferences should be an array. Once users receive a response from the server, the actual text of the workout will be available at `response.data.workout`.

Below is an example of making a request in Node.js using Axios, and then logging the contents of the response to the console.

```javascript
const axios = require("axios");

const endpoint =
  "https://workout-generator-microservice-ec908109836b.herokuapp.com/api/workouts/generate";

const options = {
  bmi: 26,
  gender: "male",
  goals: "weight loss",
  duration: 60,
  intensity: "high",
  preferences: ["strength training", "barbell lifts"],
};

const makeApiCall = async () => {
  try {
    const response = await axios.post(endpoint, options, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const workoutData = response.data.workout;

    console.log(`Workout: ${workoutData}`);
  } catch (err) {
    console.error(err);
  }
};

makeApiCall();
```

'![UML Diagram](./public/umlDigram.JPG)'
