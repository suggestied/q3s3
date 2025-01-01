// Import types for Supabase Edge Functions
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

console.log("Serverless function for new notifications is running.");

// Twilio credentials (replace with your actual credentials)
const TWILIO_ACCOUNT_SID = "ACe2534cdb2875767dd063e5333276be6a";
const TWILIO_AUTH_TOKEN = "e9bbdcb455438eb9a0c3c6dca8f075ad";
const TWILIO_PHONE_NUMBER = "+12316346505"; // Your Twilio phone number
const TARGET_PHONE_NUMBER = "+31610100232"; // Recipient phone number

Deno.serve(async (req) => {
  // log that we received a request
  console.log("Received request:", req);
  if (req.method !== "POST") {
    return new Response("Only POST requests are accepted", { status: 405 });
  }

  try {
    // Parse the payload from pg_notify
    const payload = await req.json();
    console.log("Received notification payload:", payload);

    // Extract the relevant fields from the payload
    const { id, status, message, detected_at } = payload;

    // Create the SMS message body
    const smsMessage = `
      🚨 New Notification 🚨
      ID: ${id}
      Status: ${status}
      Message: ${message}
      Detected At: ${detected_at}
    `;

    // Twilio REST API URL
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

    // Make the request to Twilio's API to send an SMS
    const response = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        To: TARGET_PHONE_NUMBER,
        From: TWILIO_PHONE_NUMBER,
        Body: smsMessage.trim(),
      })
    });

    if (!response.ok) {
      throw new Error(`Twilio API Error: ${response.statusText}`);
    }

    console.log("SMS sent successfully!");

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing notification:", error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
