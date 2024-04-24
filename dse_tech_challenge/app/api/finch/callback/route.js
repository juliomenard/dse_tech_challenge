import fs from 'fs';

 import { NextResponse } from 'next/server';

  export async function POST(req, res) {
    const body = await req.json();
    try {
      const response = await fetch('https://api.tryfinch.com/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code: body.authorizationCode,
        })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Return the data retrieved from the API
      const data = await response.json();
    
      console.log("2nd console log of the data from auth/token   ", data.access_token);
      fs.writeFileSync('./tokenNotHere.txt', data.access_token, 'utf8');
      return NextResponse.json({ message: 'SUCCESS'}, { status: 200 });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Return an error response with status code 500
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
