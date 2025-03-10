"use client";

import { createRoot } from 'react-dom/client';
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Model = () => {
  const gltf = useLoader(GLTFLoader, '/maitsocard.glb');
  const object = gltf.scene.getObjectByName('Plane');
  const objectRef = useRef<THREE.Object3D>(null);
  object.rotation.y = 3.14159;
  useFrame((state, delta) => {
    if (objectRef.current) {
      objectRef.current.rotation.y += delta * Math.PI * 0.1; // Adjust the speed as needed
    }
  });

  return (
    <group>
      {object && <primitive ref={objectRef} object={object} />}
    </group>
  );
};

const Page = () => {
  return (
    <>
      <section className="bg-black text-background">
        <div className="min-h-[80vh] lg:max-h-[750px] w-screen lg:p-32 py-12 lg:gap-32 flex max-lg:flex-col items-center justify-center">
          <div className='lg:w-1/2 max-lg:px-16'>
            <h1 className="text-4xl leading-none font-heading text-primary mb-4 max-lg:pt-32">Gift Cards</h1>
            <p className="text-lg lg:mr-32">
              Whether it be a birthday, anniversary, or just because, give the gift of a delicious meal with a Maitso gift card.
            </p>
            <p className='font-bold pt-8'>
              3d card is interactive! Click and drag to rotate.
            </p>
          </div>
          <div className='lg:w-1/2 w-full max-lg:px-8 relative h-full aspect-square'>
            <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center'>
              <div className='m-auto dot-matrix-background w-full aspect-square flex items-center justify-center absolute'></div>
              <div className='w-full max-h-full aspect-square flex items-center justify-center'>
                <Canvas camera={{ position: [-0.7, 0.25, 0.7], fov: 30 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[0, 5, 5]} intensity={1} />
                  <Model />
                  <OrbitControls enableZoom={false} enablePan={false} enableDamping={true} dampingFactor={0.2} />
                  <Environment files="/img/cannon_1k.exr" background={false} />
                </Canvas>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-background text-black min-h-[80vh] w-screen max-w-screen-xl mx-auto flex flex-col">
        <h2 className='text-3xl font-bold text-center pt-16'>Purchase Gift Cards</h2>
        <div className='m-16'>
          <div className='max-lg:p-8 rounded-xl bg-background-dimmer w-full lg:h-[16rem] flex max-lg:flex-col justify-stretch gap-8'>
            <div className='h-full flex flex-col justify-center pl-16 '>
              <h3 className='text-2xl font-bold max-lg:pt-8'>
                LIMITED <span className='font-normal'>Holiday Card</span>
              </h3>
              <button className="btn btn-primary btn-shine mt-4 rounded-full select-disabled max-w-max shadow-md">
                Out of Stock
              </button>
            </div>
            {/* this image should overflow its space by 10px, visible overflow */}
            <img src="/img/cards/holiday.png" className='lg:h-[114%] relative lg:top-[-7%] lg:ml-auto aspect-video object-contain ' />
          </div>
        </div>
        <div className='m-16 mt-8'>
          <div className='flex flex-wrap'>
            <div className='w-full lg:w-1/3 p-4'>
              <div className='rounded-xl bg-background-dimmer p-8 h-full flex flex-col justify-between'>
                <img src="/img/cards/image.png" alt="" className='w-full aspect-square' />
                <h3 className='text-xl font-bold'>The Gift of Maitso <span className='text-nowrap'>($5-$50)</span></h3>
                <button className="btn btn-primary btn-shine select-disabled mt-4 rounded-full max-w-max shadow-md">
                  Out of Stock
                </button>
              </div>
            </div>
            <div className='w-full lg:w-1/3 p-4'>
              <div className='rounded-xl bg-background-dimmer p-8 h-full flex flex-col justify-between'>
                <img src="/img/cards/veggie.png" alt="" className='w-full aspect-square' />
                <h3 className='text-xl font-bold'>Veggie Delight <span className='text-nowrap'>($10-$100)</span></h3>
                <button className="btn btn-primary btn-shine mt-4 select-disabled rounded-full max-w-max shadow-md">
                  Out of Stock
                </button>
              </div>
            </div>
            <div className='w-full lg:w-1/3 p-4'>
              <div className='rounded-xl bg-background-dimmer p-8 h-full flex flex-col justify-between'>
                <img src="/img/cards/prem.png" alt="" className='w-full aspect-square' />
                <h3 className='text-xl font-bold'>Premium Card <span className='text-nowrap'>($50-$200)</span></h3>
                <button className="btn btn-primary btn-shine mt-4 select-disabled rounded-full max-w-max shadow-md">
                  Out of Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
