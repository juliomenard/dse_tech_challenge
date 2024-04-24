import fs from 'fs';
import { NextResponse } from 'next/server';

  export async function POST(req, res) {
    try {
    const body = await req.json();
    const testter = JSON.stringify(body);

    const access_token = fs.readFileSync('./tokenNotHere.txt', { encoding: 'utf-8', flag: 'r'} );
      const response = await fetch('https://api.tryfinch.com/employer/individual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
          'Finch-API-Version': '2020-09-17', 
        },
        body: JSON.stringify(body),
      });

      if(response.code == 403){
        return NextResponse.json({ data: permissionError}, { status: 403 });
      }
      if (response.code == 404){
          return NextResponse.json({ data: permissionError}, { status: 404 });
        }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Return the data retrieved from the API
      const data = await response.json();
      
      return NextResponse.json({ data: data }, { status: 200 });
    } catch (error) {
      console.error('There was a problem with the POST operation:', error);
      // Return an error response with status code 500
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
