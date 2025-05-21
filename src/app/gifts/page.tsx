"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const GiftCardModel = () => {
  const gltf = useLoader(GLTFLoader, '/maitsocard.glb');
  const cardObject = gltf.scene.getObjectByName('Plane');
  const modelRef = useRef<THREE.Object3D>(null);

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
  cardType: string;
}

const GiftCardItem: React.FC<GiftCardProps> = ({ image, title, priceRange, cardType }) => {
  const [amount, setAmount] = React.useState('50');
  
  return (
    <div className='w-full lg:w-1/3 p-4'>
      <div className='rounded-xl bg-background-dimmer p-8 h-full flex flex-col justify-between'>
        <motion.img
          src={image}
          alt={title}
          className='w-full aspect-square'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        <motion.h3
          className='text-xl font-bold'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {title} <span className='text-nowrap'>{priceRange}</span>
        </motion.h3>
        
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <label htmlFor={`amount-${cardType}`} className="block text-sm px-1 font-medium mb-2">
            Select Amount:
          </label>
          <select 
            id={`amount-${cardType}`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 px-4 mb-3 rounded-full border border-gray-300 bg-background appearance-none select focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {cardType === 'standard' && (
              <>
                <option value="5">$5</option>
                <option value="10">$10</option>
                <option value="25">$25</option>
                <option value="50">$50</option>
              </>
            )}
            {cardType === 'veggie' && (
              <>
                <option value="10">$10</option>
                <option value="25">$25</option>
                <option value="50">$50</option>
                <option value="100">$100</option>
              </>
            )}
            {cardType === 'premium' && (
              <>
                <option value="50">$50</option>
                <option value="100">$100</option>
                <option value="150">$150</option>
                <option value="200">$200</option>
              </>
            )}
          </select>
        </motion.div>
        
        <form action="/api/checkout_sessions" method="POST">
          <input type="hidden" name="cardType" value={cardType} />
          <input type="hidden" name="amount" value={amount} />
          <motion.button
            type="submit"
            role="link"
            className="btn btn-primary btn-shine mt-4 rounded-full max-w-max shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Purchase
          </motion.button>
        </form>
      </div>
    </div>
  );
};

const GiftsPage = () => {
  const giftCards = [
    { image: "/img/cards/image.png", title: "The Gift of Maitso", priceRange: "($5-$50)", cardType: "standard" },
    { image: "/img/cards/veggie.png", title: "Veggie Delight", priceRange: "($10-$100)", cardType: "veggie" },
    { image: "/img/cards/prem.png", title: "Premium Card", priceRange: "($50-$200)", cardType: "premium" }
  ];

  return (
    <>
      <section className="bg-black text-background">
        <div className="min-h-[90vh] lg:max-h-[750px] w-screen lg:p-32 py-12 lg:gap-32 flex max-lg:flex-col items-center justify-center relative">
          <motion.div
            className='lg:w-1/2 max-lg:px-16'
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
              Whether it be a birthday, anniversary, or just because, give the gift of a delicious meal with a Maitso gift card.
            </motion.p>
            <motion.p
              className='font-bold pt-8'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              3D card is interactive! Click and drag to rotate.
            </motion.p>
          </motion.div>
          <motion.div
            className="absolute bottom-8 animate-bounce cursor-pointer text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              });
            }}
          >
            <p className="text-sm text-center">Scroll Down</p>
            <div className="flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </motion.div>

          <motion.div
            className='lg:w-1/2 w-full max-lg:px-8 relative h-full aspect-square'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center'>
              <div className='m-auto dot-matrix-background w-full aspect-square flex items-center justify-center absolute'></div>
              <div className='w-full max-h-full aspect-square flex items-center justify-center'>
                <Canvas camera={{ position: [-0.7, 0.25, 0.7], fov: 30 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[0, 5, 5]} intensity={1} />
                  <GiftCardModel />
                  <OrbitControls enableZoom={false} enablePan={false} enableDamping={true} dampingFactor={0.2} />
                  <Environment files="/img/cannon_1k.exr" background={false} />
                </Canvas>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="bg-background text-black min-h-[80vh] w-screen max-w-screen-xl mx-auto flex flex-col">
        <motion.h2
          className='text-3xl font-bold text-center pt-16 px-12 font-heading text-primary-darker'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Purchase Gift Cards
        </motion.h2>
        <motion.div
          className='m-16'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className='max-lg:py-8 rounded-xl bg-background-dimmer w-full lg:h-[16rem] flex max-lg:flex-col justify-stretch gap-8'>
            <div className='h-full flex flex-col justify-center lg:pl-16 max-lg:px-8'>
              <motion.h3
                className='text-2xl font-bold max-lg:pt-8'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                LIMITED DROP <span className='font-normal'>Holiday Card</span>
              </motion.h3>
              <motion.button
                className="btn btn-primary hover:bg-background-dimmer mt-4 rounded-full select-disabled max-w-max shadow-md flex flex-col gap-1"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Out of Stock
                <p className='text-sm font-normal text-center'>Next drop 4th of July</p>
              </motion.button>
            </div>
            <motion.img
              src="/img/cards/holiday.png"
              className='lg:h-[114%] relative lg:top-[-7%] lg:ml-auto aspect-video object-contain'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            />
          </div>
        </motion.div>
        <motion.div
          className='m-16 mt-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className='flex flex-wrap'>
            {giftCards.map((card, index) => (
              <GiftCardItem
                key={index}
                image={card.image}
                title={card.title}
                priceRange={card.priceRange}
                cardType={card.cardType}
              />
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default GiftsPage;