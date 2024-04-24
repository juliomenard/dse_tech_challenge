'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function Employee(){
    const params = useParams();
    console.log('lets see our params', params)

    const bodyQuery =
    {
        "requests": [
                params,
                    ] 
    };

    const bodySQuery = JSON.stringify(bodyQuery);

    const [individual, setIndividual] = useState(null);
    const [employment, setEmployment] = useState(null)

    useEffect(() => {
        //Fetch and Set Individual Data
        const fetchData = async () => {
           const res = await fetch('https://localhost:3000/api/gusto/individual', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: bodySQuery,
          });
          const data = await res.json();
           console.log(data);
           setIndividual(data);
        
        //Fetch and Set Employment Data
        const eRes = await fetch('https://localhost:3000/api/gusto/employment', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: bodySQuery,
        });
        const empData = await eRes.json();
        console.log('here is the employee data' , empData);
        setEmployment(empData);
    }
        fetchData();
      }, []);

    return (
<main className="flex min-h-screen flex-col items-center p-24">
    <Link href="/dashboard" className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out'>
            <button>Return to dashboard</button>
    </Link>
    <br></br>
    <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-lg lg:flex">
         Individual & Employment data for:
    </div>
        <div className='border border-black p-2'>
            <section>
                <h2 className='font-mono text-lg underline underline-offset-1'>Individual Details</h2>
                <ul>
                    <li><strong>ID:</strong> {individual?.data.responses[0].individual_id}</li>
                    <li><strong>First Name:</strong> {individual?.data.responses[0].body.first_name || 'Not Applicable'}</li>
                    <li><strong>Last Name:</strong> {individual?.data.responses[0].body.last_name}</li>
                    <li><strong>Middle Name:</strong> {individual?.data.responses[0].body.middle_name || ''}</li>
                    <li><strong>Preferred Name:</strong> {individual?.data.responses[0].body.preferred_name || ''}</li>
                    <li><strong>Gender:</strong> {individual?.data.responses[0].body.gender || 'Not Provided'}</li>
                    <li><strong>Date of Birth:</strong> {individual?.data.responses[0].body.dob || 'Missing Information'}</li>
                    <li><strong>Ethnicity:</strong> {individual?.data.responses[0].body.ethnicity || 'Not Provided'}</li>
                </ul>
            </section>
        </div>
    <br></br>
    <div className='border border-black p-2'>
        <section>
            <h2 className='font-mono text-lg underline underline-offset-1'>Residence</h2>
            <ul>
                <li><strong>Line 1:</strong> {individual?.data.responses[0].body.residence.line1 || 'Not Applicable'}</li>
                <li><strong>Line 2:</strong> {individual?.data.responses[0].body.residence.line2 || 'Not Applicable'}</li>
                <li><strong>City:</strong> {individual?.data.responses[0].body.residence.city || 'Not Applicable'}</li>
                <li><strong>State:</strong> {individual?.data.responses[0].body.residence.state || 'Not Applicable'}</li>
                <li><strong>Postal Code:</strong> {individual?.data.responses[0].body.residence.postal_code || 'Not Applicable'}</li>
                <li><strong>Country:</strong> {individual?.data.responses[0].body.residence.country || 'Not Applicable'}</li>
            </ul>
        </section>
    </div>
    <br></br>
    <div className='border border-black p-2'>
    <section>
        <h2 className='font-mono text-lg underline underline-offset-1'>Contact Information</h2>
        <ul>
            <li>
                <strong>Phone Numbers:</strong> {individual?.data.responses[0].body.phone_numbers ? individual.data.responses[0].body.phone_numbers.map((phone, index) => (
                    <span key={index}>
                        {phone.data} {phone.type && `(${phone.type})`}
                        {index !== individual.data.responses[0].body.phone_numbers.length - 1 && ', '}
                    </span>
                )) : 'Not Applicable'}
            </li>
            <li>
                <strong>Emails:</strong> {individual?.data.responses[0].body.emails ? (
                    <ul>
                        {individual.data.responses[0].body.emails.map((email, index) => (
                            <li key={index}>
                                (<i>{email.type}</i>) {email.data}
                            </li>
                        ))}
                    </ul>
                ) : 'Not Applicable'}
            </li>
        </ul>
    </section>
</div>
</main>
    );
};


