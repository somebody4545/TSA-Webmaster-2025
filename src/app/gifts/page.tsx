"use client";

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Model = () => {
  const gltf = useLoader(GLTFLoader, '/maitsocard.glb');
  const object = gltf.scene.getObjectByName('Plane');
  const objectRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    if (object) {
      object.rotation.y = 3.14159;
    }
  }, [object]);

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
    <section className="bg-black text-background">
      <div className="h-[80vh] w-screen lg:p-32 py-12 lg:gap-32 flex max-lg:flex-col items-center justify-center">
        <div className='lg:w-1/2 max-lg:px-16'>
          <h1 className="text-4xl leading-none font-heading text-primary mb-4 max-lg:pt-32">Gift Cards</h1>
          <p className="text-lg lg:mr-32">
            Whether it be a birthday, anniversary, or just because, give the gift of a delicious meal with a Maitso gift card.
          </p>
        </div>
        <div className='lg:w-1/2 w-full max-lg:px-8 relative h-full'>
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
  );
};

export default Page;
