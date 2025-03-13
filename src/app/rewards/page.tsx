'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import Link from 'next/link';
import crypto from 'crypto';

export default function RewardsPage() {
    const [hash, setHash] = useState('');

    useEffect(() => {
        const id = '23723';
        const salt = crypto.randomBytes(16).toString('hex');
        const generatedHash = crypto.createHash('sha256').update(id + salt).digest('hex');
        setHash(generatedHash);
    }, []);

    return (
        <div className="bg-background-dimmer w-full p-16">
            <div className='min-h-[400px] h-max bg-background m-16 rounded-xl p-8'>
                <h1 className='px-16 text-primary max-md:text-2xl text-3xl text-center font-heading py-8'>Maitso Rewards</h1>
                <div className="flex max-lg:flex-col justify-between items-center">
                    <div className="flex-1 px-16">
                        <p className='text-center text-xl pb-5'>Your Points: <span className='text-primary'>1000</span></p>
                        <h2 className="text-primary text-xl font-heading text-center">How it works</h2>
                        <p className="text-center">Earn points for every purchase and redeem them for free food and drinks.</p>
                        <div className="flex justify-center mt-8">
                            {/* insert carousel */}
                    </div>
                    </div>
                    <div className="max-lg:hidden w-px bg-gray-300 h-full mx-4"></div>
                    <div className="flex-1">
                        {hash && <QRCode value={hash} size={256} className='mx-auto' />}
                        <p className="text-center text-black text-lg font-heading mt-4">Scan at register.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
