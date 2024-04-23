// export default async function handler(req, res) {

//     try {
//       const { authorizationCode } = req.body;

//       const response = await fetch('https://api.tryfinch.com/auth/token', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           client_id: process.env.CLIENT_ID,
//           client_secret: process.env.CLIENT_SECRET,
//           code: authorizationCode,
//         })
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       const data = await response.json();
//       res.status(200).json(data);
//       console.log(data);
//     } catch (error) {
//       console.error('There was a problem with the fetch operation:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }

 // 2nd portion
 //

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
  
      const data = await response.json();
      console.log("2nd console log of the data from auth/token   ", data.access_token);
      // Return the data retrieved from the API
      return NextResponse.json({ message: 'SUCCESS' }, { status: 200 });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Return an error response with status code 500
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
