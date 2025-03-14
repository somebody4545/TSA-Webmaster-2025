'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import Link from 'next/link';
import crypto from 'crypto';

export default function RewardsPage() {
    const [hash, setHash] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const id = '23723';
        const salt = crypto.randomBytes(16).toString('hex');
        const generatedHash = crypto.createHash('sha256').update(id + salt).digest('hex');
        setHash(generatedHash);
    }, []);

    const handleLogin = () => {
        if (username === 'judge' && password === 'password123') {
            setIsLoggedIn(true);
        } else {
            alert('Invalid credentials');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background-dimmer">
                <div className="bg-background p-8 rounded-xl shadow-lg w-[80%] max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-primary font-heading">Log in to access rewards</h2>
                    <div className='bg-background-dim p-2 m-2 mb-4'>
                        <p className="text-center">Username: judge</p>
                        <p className="text-center">Password: password123</p>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <button
                        onClick={handleLogin}
                        className="btn btn-primary btn-shine w-full"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background-dimmer w-full lg:py-16 max-s">
            <div className='min-h-[400px] h-max bg-background md:m-16 rounded-xl p-8'>
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
                    <div className="max-lg:hidden w-1 rounded-full bg-background-dim h-64 mx-4"></div>
                    <div className="flex-1">
                        {hash && <QRCode value={hash} size={256} className='mx-auto' />}
                        <p className="text-center text-black text-lg font-heading mt-4">Scan at register.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
