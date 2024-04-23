'use client'


import React, { useState } from "react";
import { useFinchConnect } from "@tryfinch/react-connect";

export default function App() {
  const [code, setCode] = useState(null);

  const handleGetAccessToken = async (authorizationCode) => {
    try {
      console.log('confirm the handlegetaccesstoken');
      const response = await fetch('/api/finch/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authorizationCode }),
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve access token');
      }

      const data = await response.json();
      console.log("console from page.js    ",data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onSuccess = ({ code }) => {
    setCode(code);
    console.log(code);
    handleGetAccessToken(code);
  };
  const onError = ({ errorMessage }) => console.error(errorMessage);
  const onClose = () => console.log("User exited Finch Connect");
  //testing my env access
  console.log("Where is it?");
  const myClientID = process.env.CLIENT_ID;
  console.log(myClientID);
  const { open } = useFinchConnect({
    clientId: myClientID,
    products: ["company", "directory", "individual", "employment"],
    payrollProvider: "gusto", // optional
    sandbox: "provider",       // optional
    state: "",                // optional
    onSuccess,
    onError,
    onClose,
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
       Hello! Welcome to the Gusto sandbox hosted by Finch
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
       Create Gusto Sandbox now!
      </div>
      <button onClick={() => open()} class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
      Open Finch Connect
</button>

    </main>
  );
}
