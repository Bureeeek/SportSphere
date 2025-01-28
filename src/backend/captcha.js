import express, { json } from 'express';
import fetch from 'node-fetch';
const app = express();
const port = 5800;

app.use(json());

// Define the reCAPTCHA verification endpoint
app.post('/api/verify-captcha', async (req, res) => {
  const { captchaToken, selectedPlatforms, handles, reason, articles } = req.body;

  // Your API key associated with the project
  const API_KEY = 'AIzaSyBw2yPkscNsdi__OGPuJfBRDf9KM5Md488';
  const siteKey = '6LcIV8UqAAAAACJnTgVx2U7xBNdv7mirBCAtLbTW';

  // Prepare the request body for Google reCAPTCHA API
  const requestBody = {
    event: {
      token: captchaToken,
      expectedAction: 'submitForm', // or use whatever action you defined
      siteKey: siteKey,
    }
  };

  try {
    // Send the POST request to Google's reCAPTCHA Enterprise API
    const response = await fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/sportsphere-1738051787082/assessments?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log('reCAPTCHA verification response:', data);

    // Check the response from Google
    if (data.success) {
      // Process the form data (i.e., save to database, send verification email, etc.)
      res.json({ success: true, message: 'Verification successful!' });
    } else {
      res.json({ success: false, message: 'reCAPTCHA verification failed.' });
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
