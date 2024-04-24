'use client'
import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation';
import  Link  from 'next/link';

export default function Dashboard() {
const [company, setCompany] = useState(null);
const [directory, setDirectory] = useState(null);

const handleClick = async () => {
    const fetchPayment = await fetch('https://localhost:3000/api/gusto/payment', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },    
    });
    const payData = await fetchPayment;
    if(!payData.ok){
        console.log('Insufficient Access to Payment endpoint');
    }
}

    useEffect(() => {
        //Fetch and Set Company Data
        const fetchData = async () => {
           const res = await fetch('https://localhost:3000/api/gusto/company', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await res.json();
           setCompany(data);
        
        //Fetch and Set Directory Data
        const dRes = await fetch('https://localhost:3000/api/gusto/directory', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
            },
        });
        const dirData = await dRes.json();
        setDirectory(dirData);
    }
        fetchData();
      }, []);

    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-lg lg:flex">
         Welcome to your company's Directory & General information from Gusto, provided by Finch
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out' onClick={handleClick}>Payment Endpoint Test</button>
        <br></br>
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-lg lg:flex">
         Company
        </div>
        
        <div className='border border-black p-2 mb-2'>
            <section>
                <h2 className='font-mono text-lg underline underline-offset-1'>Company Details</h2>
                <ul>
                    <li><strong>ID:</strong> {company?.["data"]["id"] || 'Missing Info'}</li>
                    <li><strong>Legal Name:</strong> {company?.["data"]["legal_name"] || 'Missing Info'}</li>
                    <li><strong>Entity Type:</strong> {company?.["data"]["entity"]["type"] || 'Missing Info'}</li>
                    <li><strong>Entity Subtype:</strong> {company?.["data"]["entity"]["subtype"] || 'Not Applicable'}</li>
                    <li><strong>EIN:</strong> {company?.["data"]["ein"] || 'Missing Info'}</li>
                    <li><strong>Primary Email:</strong> {company?.["data"]["primary_email"] || 'Missing Info'}</li>
                    <li><strong>Primary Phone Number:</strong> {company?.["data"]["primary_phone_number"] || 'Missing Info'}</li>
                </ul>
            </section>
        </div>
        <div className='border border-black p-2 mb-2'>
            <section>
                <h2 className='font-mono text-lg underline underline-offset-1'>Departments</h2>
                    <ul>
                        {company?.["data"]["departments"].map((department, index) => (
                        <li key={index}><strong>Name:</strong> {department["name"]}  <small>Parent:</small> {department["parent"] || <small>none</small>}</li>
                        ))}
                    </ul>
            </section>
        </div>
        <div className='border border-black p-2 mb-2'>
            <section>
                <h2 className='font-mono text-lg underline underline-offset-1'>Locations</h2>
                    <ul>
                        {company?.["data"]["locations"].map((location, index) => (
                            <React.Fragment key={index}>
                                <li><strong>Line 1:</strong> {location["line1"] || 'Missing Info'}</li>
                                <li><strong>Line 2:</strong> {location["line2"] || ''}</li>
                                <li><strong>City:</strong> {location["city"] || 'Missing Info'}</li>
                                <li><strong>State:</strong> {location["state"] || 'Missing Info'}</li>
                                <li><strong>Postal Code:</strong> {location["postal_code"] || 'Missing Info'}</li>
                                <li><strong>Country:</strong> {location["country"] || 'Missing Info'}</li>
                            </React.Fragment>
                            ))}
                    </ul>
            </section>
        </div>
        <div className='border border-black p-2'>
            <section>
                <h2 className='font-mono text-lg underline underline-offset-1'>Accounts</h2>
                <ul>
                    {company?.data.accounts.length > 0 ? (
                        company?.data.accounts.map((account, index) => (
                            <li key={index}>{account}</li>
                        ))
                    ) : (
                        <li><strong>Status</strong> No Accounts</li>
                    )}
                </ul>
            </section>
</div>
        <br></br>
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-lg lg:flex">
         <section>
            <h2 className='font-mono text-lg underline underline-offset-1'>Directory</h2>
                            <ul>
                                {directory?.data.individuals.map(individual => (
                                    <Link href={`/individual/${individual.id}`}>
                                <li key={individual.id} className="hover:bg-gray-200 cursor-pointer">
                                <strong>Name:</strong> {individual.first_name} {individual.last_name}
                                </li>
                                </Link>
                                ))}
                            </ul>
         </section>
        </div>
      </main>
    );
  }                                                                                                                                                              