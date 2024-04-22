'use client'

import React, { useState } from "react";
import { useFinchConnect } from "@tryfinch/react-connect";

export default function App() {
  const [code, setCode] = useState(null);

  const onSuccess = ({ code }) => setCode(code);
  const onError = ({ errorMessage }) => console.error(errorMessage);
  const onClose = () => console.log("User exited Finch Connect");

  const { open } = useFinchConnect({
    clientId: process.env.CLIENT_ID,
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
