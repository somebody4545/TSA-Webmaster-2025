'use client';

import React, { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import QRCode from 'react-qr-code';

export default function RewardsPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [points, setPoints] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [scansToday, setScansToday] = useState(0);
    const [showQR, setShowQR] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsLoggedIn(true);
                // Fetch user's points and scan history
                const userDoc = await getDoc(doc(db, 'rewards', user.uid));
                if (userDoc.exists()) {
                    setPoints(userDoc.data().points);
                }
                // Check today's scans
                await checkTodayScans(user.uid);
            } else {
                setIsLoggedIn(false);
                setPoints(0);
                setScansToday(0);
            }
        });

        return () => unsubscribe();
    }, []);

    const checkTodayScans = async (userId: string) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const scansRef = collection(db, 'scans');
        const q = query(
            scansRef,
            where('userId', '==', userId),
            where('date', '==', today.toISOString().split('T')[0])
        );

        const querySnapshot = await getDocs(q);
        setScansToday(querySnapshot.size);
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Initialize user with 2000 points
            await setDoc(doc(db, 'rewards', userCredential.user.uid), {
                points: 2000,
                createdAt: serverTimestamp()
            });
            setPoints(2000);
        } catch (err) {
            const error = err as Error;
            setError(error.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            const error = err as Error;
            setError(error.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            const error = err as Error;
            setError(error.message || 'An unexpected error occurred');
        }
    };

    const handleScan = async () => {
        if (scansToday >= 3) {
            setError('You have reached your daily scan limit (3 scans per day)');
            return;
        }

        setLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('User not logged in');

            const today = new Date().toISOString().split('T')[0];

            // Record the scan with both timestamp and date
            await addDoc(collection(db, 'scans'), {
                userId: user.uid,
                timestamp: serverTimestamp(),
                date: today,
                points: 120
            });

            // Update user's points
            await updateDoc(doc(db, 'rewards', user.uid), {
                points: points + 120
            });

            setPoints(prev => prev + 120);
            setScansToday(prev => prev + 1);
            setShowQR(false);
        } catch (err) {
            const error = err as Error;
            setError(error.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (isLoggedIn) {
        return (
            <div className="min-h-screen bg-black text-background">
                <div className="min-h-[90vh] w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-8 py-24 gap-8">
                    {/* Left: Dashboard Info */}
                    <div className="flex-1 flex flex-col justify-center items-start">
                        <h1 className="text-7xl md:text-8xl font-extrabold text-[#b6d7a8] mb-8 leading-tight">Your Rewards Dashboard</h1>
                        <p className="text-xl text-white mb-4 max-w-xl">Track your points, scan QR codes, and redeem rewards at our restaurants.</p>
                        <div className="bg-[#e6f4e6] text-[#5b7c5b] rounded-xl px-8 py-6 mb-8 text-xl font-semibold shadow-lg">
                            Your Points: {points}<br />
                            <span className="text-base font-normal text-[#5b7c5b]">Scans Today: {scansToday}/3</span>
                        </div>
                    </div>
                    {/* Right: QR code or action */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
                        {!showQR ? (
                            <button
                                onClick={() => setShowQR(true)}
                                disabled={loading || scansToday >= 3}
                                className="w-full bg-[#b6d7a8] text-black font-semibold py-4 px-6 rounded-xl hover:bg-[#a2c99a] transition-all duration-300 flex items-center justify-center space-x-2 text-lg shadow-lg disabled:opacity-60 mb-8"
                            >
                                <span>{loading ? 'Processing...' : scansToday >= 3 ? 'Daily Limit Reached' : 'Show QR Code'}</span>
                            </button>
                        ) : (
                            <div className="flex flex-col items-center mb-8">
                                <div className="bg-white p-6 rounded-2xl shadow-2xl mb-6">
                                    <QRCode value={auth.currentUser?.uid || ''} size={200} />
                                </div>
                                <p className="text-gray-300 mb-6">Show this QR code at the restaurant to earn 120 points!</p>
                                <button
                                    onClick={handleScan}
                                    disabled={loading}
                                    className="w-full bg-[#b6d7a8] text-black font-semibold py-4 px-6 rounded-xl hover:bg-[#a2c99a] transition-all duration-300 flex items-center justify-center space-x-2 text-lg shadow-lg disabled:opacity-60"
                                >
                                    <span>{loading ? 'Processing...' : 'Simulate Scan'}</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {/* How to Earn Points Section */}
                <section className="w-full bg-[#f4faef] py-16">
                    <h2 className="text-5xl font-extrabold text-center text-[#7ca97c] mb-16">How to Earn Points</h2>
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 justify-center items-stretch px-4">
                        {/* Card 1 */}
                        <div className="flex-1 bg-[#e6f4e6] rounded-2xl shadow-md p-8 flex flex-col items-start">
                            <div className="w-16 h-16 bg-[#b6d7a8] rounded-xl flex items-center justify-center mb-6 shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-black">Sign Up Bonus</h3>
                            <p className="text-lg text-[#5b7c5b]">Get 2000 points instantly when you create your account!</p>
                        </div>
                        {/* Card 2 */}
                        <div className="flex-1 bg-[#e6f4e6] rounded-2xl shadow-md p-8 flex flex-col items-start">
                            <div className="w-16 h-16 bg-[#b6d7a8] rounded-xl flex items-center justify-center mb-6 shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-black">Scan QR Codes</h3>
                            <p className="text-lg text-[#5b7c5b]">Scan your QR code at our restaurants to earn 120 points per visit!</p>
                        </div>
                        {/* Card 3 */}
                        <div className="flex-1 bg-[#e6f4e6] rounded-2xl shadow-md p-8 flex flex-col items-start">
                            <div className="w-16 h-16 bg-[#b6d7a8] rounded-xl flex items-center justify-center mb-6 shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-black">Redeem Points</h3>
                            <p className="text-lg text-[#5b7c5b]">Use your points to purchase gift cards and exclusive rewards!</p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-16">
                        <button
                            onClick={handleLogout}
                            className="w-full max-w-md bg-[#e6f4e6] text-[#5b7c5b] font-semibold py-4 px-6 rounded-xl hover:bg-[#d2e8d2] transition-all duration-300 text-lg shadow-lg border border-[#b6d7a8]"
                        >
                            Logout
                        </button>
                    </div>
                    {error && (
                        <p className="mt-4 text-red-400 text-sm text-center">{error}</p>
                    )}
                </section>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between px-8 py-24 gap-8">
                {/* Left: Heading and Description */}
                <div className="flex-1 flex flex-col justify-center items-start">
                    <h1 className="text-7xl md:text-8xl font-extrabold text-[#b6d7a8] mb-8 leading-tight">Maitso Rewards Program</h1>
                    <p className="text-xl text-white mb-4 max-w-xl">Join our rewards program to earn points, get exclusive offers, and enjoy special benefits at our restaurants.</p>
                </div>
                {/* Right: Form */}
                <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
                    <form onSubmit={handleSignUp} className="w-full space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#e6e6e6] text-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b6d7a8] focus:border-transparent text-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#e6e6e6] text-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b6d7a8] focus:border-transparent text-lg"
                                required
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-[#b6d7a8] text-black font-semibold py-4 px-6 rounded-xl hover:bg-[#a2c99a] transition-all duration-300 flex items-center justify-center space-x-2 text-lg disabled:opacity-60"
                            >
                                <span>{loading ? 'Processing...' : 'Sign Up'}</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleLogin}
                                disabled={loading}
                                className="flex-1 bg-[#222] text-white font-semibold py-4 px-6 rounded-xl hover:bg-[#444] transition-all duration-300 flex items-center justify-center space-x-2 text-lg border border-[#444] disabled:opacity-60"
                            >
                                <span>{loading ? 'Processing...' : 'Login'}</span>
                            </button>
                        </div>
                        {error && (
                            <p className="text-red-400 text-sm text-center">{error}</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
