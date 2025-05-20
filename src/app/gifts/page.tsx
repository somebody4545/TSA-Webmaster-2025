"use client";

import React, { useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const GiftCardModel = () => {
  const gltf = useLoader(GLTFLoader, "/maitsocard.glb");
  const cardObject = gltf.scene.getObjectByName("Plane");
  const modelRef = React.useRef<THREE.Object3D>(null);

  React.useEffect(() => {
    if (cardObject) {
      cardObject.rotation.y = Math.PI;
    }
  }, [cardObject]);

  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * Math.PI * 0.15;
    }
  });

  return (
    <group>
      {cardObject && <primitive ref={modelRef} object={cardObject} />}
    </group>
  );
};

interface GiftCardProps {
  image: string;
  title: string;
  priceRange: string;
  pointsPrice: number;
  onPurchase: (points: number) => void;
  userPoints: number;
}

const GiftCardItem: React.FC<GiftCardProps> = ({
  image,
  title,
  priceRange,
  pointsPrice,
  onPurchase,
  userPoints,
}) => {
  const canAfford = userPoints >= pointsPrice;

  return (
    <div className="w-full lg:w-1/3 p-4">
      <div className="rounded-xl bg-background-dimmer p-8 h-full flex flex-col justify-between">
        <motion.img
          src={image}
          alt={title}
          className="w-full aspect-square"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        <motion.h3
          className="text-xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {title} <span className="text-nowrap">{priceRange}</span>
        </motion.h3>
        <div className="mt-2 text-sm text-gray-600">
          <p>Points Price: {pointsPrice} points</p>
          <p>Your Points: {userPoints}</p>
        </div>
        <motion.button
          className={`btn btn-primary btn-shine mt-4 rounded-full max-w-max shadow-md ${
            canAfford ? "" : "select-disabled"
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          onClick={() => canAfford && onPurchase(pointsPrice)}
        >
          {canAfford ? "Purchase with Points" : "Not Enough Points"}
        </motion.button>
      </div>
    </div>
  );
};

const GiftsPage = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = auth.currentUser;
      if (user) {
        setIsLoggedIn(true);
        const userDoc = await getDoc(doc(db, "rewards", user.uid));
        if (userDoc.exists()) {
          setUserPoints(userDoc.data().points);
        }
      }
    };
    checkAuth();
  }, []);

  const handlePurchase = async (points: number) => {
    // Implement purchase logic here
    alert(`Processing purchase for ${points} points...`);
  };

  const giftCards = [
    {
      image: "/img/cards/image.png",
      title: "The Gift of Maitso",
      priceRange: "($5-$50)",
      pointsPrice: 5000,
    },
    {
      image: "/img/cards/veggie.png",
      title: "Veggie Delight",
      priceRange: "($10-$100)",
      pointsPrice: 10000,
    },
    {
      image: "/img/cards/prem.png",
      title: "Premium Card",
      priceRange: "($50-$200)",
      pointsPrice: 50000,
    },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold mb-4 text-primary-darker">
            Sign In Required
          </h1>
          <p className="mb-6 text-text">
            Please sign in to view and purchase gift cards with your rewards
            points.
          </p>

          <Link
            href="/rewards"
            className="btn btn-primary btn-shine rounded-full"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-black text-background">
        <div className="min-h-[90vh] lg:max-h-[750px] w-screen lg:p-32 py-12 lg:gap-32 flex max-lg:flex-col items-center justify-center relative">
          <motion.div
            className="lg:w-1/2 max-lg:px-16"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-4xl leading-none font-heading text-primary mb-4 max-lg:pt-32"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Gift Cards
            </motion.h1>
            <motion.p
              className="text-lg lg:mr-32"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Whether it be a birthday, anniversary, or just because, give the
              gift of a delicious meal with a Maitso gift card.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-xl font-bold text-white mt-6"
            >
              Your Points:{" "}
              <span className="text-primary font-bold">{userPoints}</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-sm"
            >
              Earn more points by scanning QR codes at our restaurants!
            </motion.p>
          </motion.div>

          <motion.div
            className="lg:w-1/2 w-full max-lg:px-8 relative h-full aspect-square"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
              <div className="m-auto dot-matrix-background w-full aspect-square flex items-center justify-center absolute"></div>
              <div className="w-full max-h-full aspect-square flex items-center justify-center">
                <Canvas camera={{ position: [-0.7, 0.25, 0.7], fov: 30 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[0, 5, 5]} intensity={1} />
                  <GiftCardModel />
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableDamping={true}
                    dampingFactor={0.2}
                  />
                  <Environment files="/img/cannon_1k.exr" background={false} />
                </Canvas>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="bg-background text-black min-h-[80vh] w-screen max-w-screen-xl mx-auto flex flex-col">
        <motion.h2
          className="text-3xl font-bold text-center pt-16 px-12 font-heading text-primary-darker"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Purchase Gift Cards
        </motion.h2>
        <motion.div
          className="m-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap">
            {giftCards.map((card, index) => (
              <GiftCardItem
                key={index}
                image={card.image}
                title={card.title}
                priceRange={card.priceRange}
                pointsPrice={card.pointsPrice}
                onPurchase={handlePurchase}
                userPoints={userPoints}
              />
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default GiftsPage;
