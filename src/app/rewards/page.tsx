"use client";

import React, { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
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
  getDocs,
} from "firebase/firestore";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import { QrCode } from "lucide-react";

export default function RewardsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [points, setPoints] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [scansToday, setScansToday] = useState(0);
  const [showQR, setShowQR] = useState(false);

  // Function to pre-fill the judges test account
  const fillJudgesAccount = () => {
    setEmail("judges@tsa.com");
    setPassword("judges!");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        // Fetch user's points and scan history
        const userDoc = await getDoc(doc(db, "rewards", user.uid));
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

    const scansRef = collection(db, "scans");
    const q = query(
      scansRef,
      where("userId", "==", userId),
      where("date", "==", today.toISOString().split("T")[0])
    );

    const querySnapshot = await getDocs(q);
    setScansToday(querySnapshot.size);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Initialize user with 2000 points
      await setDoc(doc(db, "rewards", userCredential.user.uid), {
        points: 2000,
        createdAt: serverTimestamp(),
      });
      setPoints(2000);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleScan = async () => {
    if (scansToday >= 3) {
      setError("You have reached your daily scan limit (3 scans per day)");
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      const today = new Date().toISOString().split("T")[0];

      // Record the scan with both timestamp and date
      await addDoc(collection(db, "scans"), {
        userId: user.uid,
        timestamp: serverTimestamp(),
        date: today,
        points: 120,
      });

      // Update user's points
      await updateDoc(doc(db, "rewards", user.uid), {
        points: points + 120,
      });

      setPoints((prev) => prev + 120);
      setScansToday((prev) => prev + 1);
      setShowQR(false);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "An unexpected error occurred");
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
            <motion.h1
              className="text-4xl font-heading text-primary mb-8 leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Rewards
            </motion.h1>
            <motion.p
              className="text-xl text-white mb-4 max-w-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Track your points, scan QR codes, and redeem rewards at our
              restaurants.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl font-bold text-white mt-6"
            >
              Your Points:{" "}
              <span className="text-primary font-bold">{points}</span>
              <br />
              <span className="text-base font-normal">
                Scans Today: {scansToday}/3
              </span>
            </motion.p>
          </div>
          {/* Right: QR code or action */}
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
            {!showQR ? (
              <button
                onClick={() => setShowQR(true)}
                disabled={loading || scansToday >= 3}
                className="w-full bg-primary text-black font-semibold py-4 px-6 rounded-xl hover:bg-primary-darker transition-all duration-300 flex items-center justify-center space-x-2 text-lg shadow-lg disabled:opacity-60 mb-8"
              >
                <span>
                  {loading
                    ? "Processing..."
                    : scansToday >= 3
                      ? "Daily Limit Reached"
                      : "Show QR Code"}
                </span>
              </button>
            ) : (
              <div className="flex flex-col items-center mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-2xl mb-6">
                  <QRCode value={auth.currentUser?.uid || ""} size={200} />
                </div>
                <p className="text-gray-300 mb-6">
                  Show this QR code at the restaurant to earn 120 points!
                </p>
                <button
                  onClick={handleScan}
                  disabled={loading}
                  className="w-full btn btn-primary py-4 px-6 rounded-xl flex items-center justify-center space-x-2 text-lg shadow-lg disabled:opacity-60"
                >
                  <span>{loading ? "Processing..." : "Simulate Scan"}</span>
                </button>
                {error && (
                  <p className="mt-4 text-red-400 text-sm text-center">
                    {error}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        {/* How to Earn Points Section */}
        <section className="w-full bg-background py-16">
          <h2 className="text-3xl font-heading text-center text-primary-darker mb-12">
            How to Earn Points
          </h2>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 justify-center items-stretch px-4">
            {/* Card 1 */}
            <div className="flex-1 bg-background-dim rounded-2xl shadow-md p-8 flex flex-col items-start">
              <div className="w-16 h-16 bg-primary-darker rounded-xl flex items-center justify-center mb-6 shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-14 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-heading mb-2 text-black">
                Sign Up Bonus
              </h3>
              <p className="text-lg text-text">
                Get 2000 points instantly when you create your account!
              </p>
            </div>
            {/* Card 2 */}
            <div className="flex-1 bg-background-dim rounded-2xl shadow-md p-8 flex flex-col items-start">
              <div className="w-16 h-16 bg-primary-darker rounded-xl flex items-center justify-center mb-6 shadow">
                <QrCode className="size-14 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-2 text-black">
                Scan QR Codes
              </h3>
              <p className="text-lg text-text">
                Scan your QR code at our restaurants to earn 120 points per
                visit!
              </p>
            </div>
            {/* Card 3 */}
            <div className="flex-1 bg-background-dim rounded-2xl shadow-md p-8 flex flex-col items-start">
              <div className="w-16 h-16 bg-primary-darker rounded-xl flex items-center justify-center mb-6 shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-14 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-heading mb-2 text-black">
                Redeem Points
              </h3>
              <p className="text-lg text-text">
                Use your points to purchase gift cards and exclusive rewards!
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between px-8 py-24 gap-8">
        {/* Left: Heading and Description */}
        <div className="flex-1 flex flex-col justify-center items-start">
          <h1 className="text-4xl font-heading text-primary mb-8 leading-tight">
            Maitso Rewards
          </h1>
          <p className="text-xl text-white mb-4 max-w-xl">
            Join our rewards program to earn points, get exclusive offers, and
            enjoy special benefits at our restaurants.
          </p>

          {/* Judges Test Account Information */}
          <div
            className="mt-8 p-6 border-2 border-primary rounded-lg bg-black/70 cursor-pointer hover:bg-black/90 transition-colors"
            onClick={fillJudgesAccount}
            style={{ boxShadow: '0 0 15px rgba(var(--color-primary-rgb), 0.5)' }}
          >
            <h3 className="font-heading text-primary text-xl mb-2 font-bold">
              FOR TSA JUDGES
            </h3>
            <p className="text-white text-base">
              Please use the following test account (click box to auto-fill):
            </p>
            <div className="mt-3 font-mono text-white text-base">
              <p className="mb-1">
                Email: <span className="text-primary font-bold">judges@tsa.com</span>
              </p>
              <p className="mb-3">
                Password: <span className="text-primary font-bold">judges!</span>
              </p>
            </div>
            <p className="text-white text-sm mt-2 border-t border-gray-700 pt-3">
              Judges are also welcome to create their own accounts using the Sign Up button to experience the full rewards program workflow.
            </p>
          </div>
        </div>
        {/* Right: Form */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
          <form onSubmit={handleSignUp} className="w-full space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background text-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background text-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary text-black font-semibold py-4 px-6 rounded-xl hover:bg-primary-darker transition-all duration-300 flex items-center justify-center space-x-2 text-lg disabled:opacity-60"
              >
                <span>{loading ? "Processing..." : "Sign Up"}</span>
              </button>
              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="flex-1 bg-[#222] text-white font-semibold py-4 px-6 rounded-xl hover:bg-[#444] transition-all duration-300 flex items-center justify-center space-x-2 text-lg border border-[#444] disabled:opacity-60"
              >
                <span>{loading ? "Processing..." : "Login"}</span>
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
