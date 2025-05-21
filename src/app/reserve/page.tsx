'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const GltfCamera = () => {
  const { scene, gl, camera } = useThree();
  const gltf = useLoader(GLTFLoader, '/reservations.glb');
  const initialRotationRef = useRef<THREE.Euler | null>(null);

  const { mouse } = useThree();

  useEffect(() => {
    if (gltf.cameras && gltf.cameras.length > 0) {
      const gltfCamera = gltf.cameras[0];
      console.log('Using GLTF camera:', gltfCamera);

      camera.copy(gltfCamera);
      camera.updateProjectionMatrix();

      initialRotationRef.current = camera.rotation.clone();
    }
  }, [gltf, camera]);

  useFrame(() => {
    if (camera && initialRotationRef.current) {
      const offsetX = - mouse.x * 0.02;
      const offsetY = mouse.y * 0.02;

      camera.rotation.x = initialRotationRef.current.x + offsetY;
      camera.rotation.y = initialRotationRef.current.y + offsetX;
    }
  });

  return null;
};

const DiningAreaModel = ({
  selectedLocation,
  setSelectedLocation,
  hoveredLocation,
  setHoveredLocation
}: {
  selectedLocation: string | null,
  setSelectedLocation: (loc: string) => void,
  hoveredLocation: string | null,
  setHoveredLocation: (loc: string | null) => void
}) => {
  const gltf = useLoader(GLTFLoader, '/reservations.glb');
  const modelRef = useRef<THREE.Group>(null);

  // Clone the scene to avoid modifying the original
  const scene = gltf.scene.clone();

  // Process all meshes to set up interactivity
  scene.traverse((node) => {
    if (node instanceof THREE.Mesh) {
      // Check if the node's name matches any of our locations
      if (['indoor', 'booth', 'openair', 'outdoor'].includes(node.name)) {
        // Set the initial material based on whether it's selected or hovered
        if (selectedLocation === node.name) {
          node.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#40b549'),
            transparent: true,
            opacity: 0.6,
            roughness: 0.5,
            metalness: 0,
            emissive: new THREE.Color(0),
            envMapIntensity: 1,
            side: THREE.DoubleSide,
            depthWrite: false,
            depthTest: false // Ensures this material renders first
          });
        } else if (hoveredLocation === node.name) {
          node.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#40b549'),
            transparent: true,
            opacity: 0.3,
            roughness: 0.5,
            metalness: 0,
            emissive: new THREE.Color(0),
            envMapIntensity: 1,
            side: THREE.DoubleSide,
            depthWrite: false,
            depthTest: false // Ensures this material renders first
          });
        } else {
          node.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#40b549'),
            transparent: true,
            opacity: 0.1,
            roughness: 0.5,
            metalness: 0,
            emissive: new THREE.Color(0),
            envMapIntensity: 1,
            side: THREE.DoubleSide,
            depthWrite: false,
            depthTest: false
          });
        }
      }
    }
  });

  const handleMeshClick = (name: string) => {
    setSelectedLocation(name);
  };

  const handlePointerOver = (name: string) => {
    setHoveredLocation(name);
  };

  const handlePointerOut = () => {
    setHoveredLocation(null);
  };

  return (
    <group ref={modelRef}>
      <primitive object={scene} />

      {['indoor', 'booth', 'openair', 'outdoor'].map((location) => {
        const mesh = scene.getObjectByName(location) as THREE.Mesh;
        if (mesh) {
          const geometry = mesh.geometry.clone();
          return (
            <mesh
              key={location}
              name={location}
              geometry={geometry}
              position={mesh.position.clone()}
              rotation={mesh.rotation.clone()}
              scale={mesh.scale.clone()}
              material={new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0.0
              })}
              onClick={() => handleMeshClick(location)}
              onPointerOver={() => handlePointerOver(location)}
              onPointerOut={handlePointerOut}
            />
          );
        }
        return null;
      })}
    </group>
  );
};

// This component simply renders the GLTF scene with its camera
const ModelViewer = ({
  selectedLocation,
  setSelectedLocation,
  hoveredLocation,
  setHoveredLocation
}: {
  selectedLocation: string | null,
  setSelectedLocation: (loc: string) => void,
  hoveredLocation: string | null,
  setHoveredLocation: (loc: string | null) => void
}) => {
  // Calculate normalized mouse position from mousePosition state
  const [normalizedMouse, setNormalizedMouse] = useState({ x: 0, y: 0 });

  // Access mousePosition from the parent component's state
  const { mousePosition } = useThree((state) => ({
    mousePosition: state.mouse
  }));

  // Update normalized mouse position when mouse moves
  useEffect(() => {
    // React Three Fiber already normalizes mouse coordinates to [-1, 1]
    setNormalizedMouse({
      x: mousePosition.x,
      y: mousePosition.y
    });
  }, [mousePosition]);

  return (
    <>
      <GltfCamera />
      <DiningAreaModel
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        hoveredLocation={hoveredLocation}
        setHoveredLocation={setHoveredLocation}
      />
    </>
  );
};

const LocationMap = ({
  selectedLocation,
  setSelectedLocation
}: {
  selectedLocation: string | null,
  setSelectedLocation: (location: string) => void
}) => {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [view3D, setView3D] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const locations = {
    indoor: { name: "Indoor Dining", description: "Elegant indoor dining space with ambient lighting and plant decor." },
    booth: { name: "Private Booth", description: "Private booths for a more intimate dining experience." },
    openair: { name: "Open Air Seating", description: "Covered open-air section with natural ventilation." },
    outdoor: { name: "Outdoor Patio", description: "Garden patio seating surrounded by our herb garden." },
  };

  // Now this will update the parent component's state
  const handleLocationClick = (location: string) => {
    setSelectedLocation(location);
  };

  // Updated to track mouse position globally
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    // Add event listener to the window
    window.addEventListener('mousemove', handleGlobalMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  // Effect to handle view transition
  const handleViewToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setView3D(!view3D);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  // Update the cursor styling logic to only hide when hoveredLocation is active
  useEffect(() => {
    // Add a style tag to handle cursor hiding
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      #indoor:hover, #booth:hover, #openair:hover, #outdoor:hover {
        cursor: ${hoveredLocation ? 'none' : 'pointer'} !important;
      }
      .canvas-container {
        cursor: ${hoveredLocation ? 'none' : 'default'} !important;
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, [hoveredLocation]); // Add hoveredLocation as dependency

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-black">Floor Plan</h3>
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${!view3D ? 'font-medium text-primary-darker' : 'text-gray-500'}`}>2D</span>
          <button
            onClick={handleViewToggle}
            className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            style={{ backgroundColor: view3D ? '#a1cc80' : '#d1d5db' }}
          >
            <span
              className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${view3D ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
          <span className={`text-sm ${view3D ? 'font-medium text-primary-darker' : 'text-gray-500'}`}>3D</span>
        </div>
      </div>

      <div className="transition-all duration-600 ease-in-out">
        {isTransitioning ? (
          <div className="w-full h-[400px] bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : view3D ? (
          <div
            ref={canvasRef}
            className="w-full h-[400px] bg-gray-800 rounded-lg overflow-hidden transition-opacity duration-300 ease-in-out canvas-container"
          >
            <Canvas>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <spotLight position={[0, 10, 0]} intensity={0.5} />
              <ModelViewer
                selectedLocation={selectedLocation}
                setSelectedLocation={handleLocationClick}
                hoveredLocation={hoveredLocation}
                setHoveredLocation={setHoveredLocation}
              />
              <Environment preset="city" />
            </Canvas>
          </div>
        ) : (
          <div
            className="w-full h-[400px] bg-gray-800 rounded-lg overflow-hidden transition-opacity duration-300 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-10 -50 510  500"
              className="w-full max-w-2xl mx-auto transition-opacity duration-300 ease-in-out"
            >
              <defs>
                <style>
                  {`.cls-1 { fill: #fff; }
                .cls-2 { fill: #636466; }
                .cls-3 { fill: #231f20; }
                .cls-4 { fill: #d6d6d6; opacity: .0; }
                .cls-5 { fill: #40b549; opacity: .52; }
                .location-hover { fill: #40b549; opacity: 0.7; }
                .location-selected { fill: #40b549; opacity: 0.9; }`}
                </style>
              </defs>
              <g id="Layer_2" data-name="Layer 2">
                <rect className="cls-3" x="18.81" y="15.47" width="282.89" height="261.45" />
                <rect className="cls-4" x="45.68" y="276.91" width="334.72" height="128.26" />
                <rect className="cls-2" x="301.7" y="15.47" width="175.66" height="261.45" />
                <circle className="cls-1" cx="148.51" cy="314.7" r="10.21" />
                <circle className="cls-1" cx="190" cy="314.7" r="10.21" />
                <circle className="cls-1" cx="237.74" cy="317.77" r="10.21" />
                <circle className="cls-1" cx="273.23" cy="323.64" r="10.21" />
                <circle className="cls-1" cx="234.81" cy="364.49" r="10.21" />
                <circle className="cls-1" cx="188.21" cy="368.32" r="10.21" />
                <rect className="cls-1" x="66.04" y="135.98" width="43.4" height="17.11" />
                <rect className="cls-1" x="150.94" y="135.98" width="43.4" height="17.11" />
                <rect className="cls-1" x="150.94" y="177.47" width="43.4" height="17.11" />
                <rect className="cls-1" x="149.66" y="220.23" width="43.4" height="17.11" />
                <rect className="cls-1" x="321.49" y="135.98" width="43.4" height="17.11" transform="translate(198.66 487.72) rotate(-90)" />
                <rect className="cls-1" x="321.49" y="67" width="43.4" height="17.11" transform="translate(267.64 418.74) rotate(-90)" />
                <rect className="cls-1" x="321.49" y="204.96" width="43.4" height="17.11" transform="translate(129.68 556.7) rotate(-90)" />
                <rect className="cls-1" x="363.55" y="135.98" width="43.4" height="17.11" transform="translate(240.72 529.79) rotate(-90)" />
                <rect className="cls-1" x="363.55" y="67" width="43.4" height="17.11" transform="translate(309.7 460.81) rotate(-90)" />
                <rect className="cls-1" x="363.55" y="204.96" width="43.4" height="17.11" transform="translate(171.74 598.77) rotate(-90)" />
                <rect className="cls-1" x="405.51" y="135.98" width="43.4" height="17.11" transform="translate(282.68 571.74) rotate(-90)" />
                <rect className="cls-1" x="405.51" y="67" width="43.4" height="17.11" transform="translate(351.66 502.77) rotate(-90)" />
                <rect className="cls-1" x="405.51" y="204.96" width="43.4" height="17.11" transform="translate(213.7 640.72) rotate(-90)" />
                <rect className="cls-1" x="238.81" y="22.19" width="52.74" height="63.32" />
                <rect className="cls-1" x="240.01" y="124.83" width="52.74" height="63.32" />
                <rect className="cls-1" x="240.01" y="191.81" width="52.74" height="63.32" />
              </g>
              <g id="Boxes">
                <rect
                  id="indoor"
                  className={selectedLocation === "indoor" ? "location-selected" : hoveredLocation === "indoor" ? "location-hover" : "cls-5"}
                  x="53.53" y="105.85" width="142.98" height="137.87"
                  onClick={() => handleLocationClick("indoor")}
                  onMouseEnter={() => setHoveredLocation("indoor")}
                  onMouseLeave={() => setHoveredLocation(null)}
                  style={{ cursor: "pointer" }}
                />
                <rect
                  id="booth"
                  className={selectedLocation === "booth" ? "location-selected" : hoveredLocation === "booth" ? "location-hover" : "cls-5"}
                  x="226.89" y="20.06" width="67.66" height="244.09"
                  onClick={() => handleLocationClick("booth")}
                  onMouseEnter={() => setHoveredLocation("booth")}
                  onMouseLeave={() => setHoveredLocation(null)}
                  style={{ cursor: "pointer" }}
                />
                <rect
                  id="openair"
                  className={selectedLocation === "openair" ? "location-selected" : hoveredLocation === "openair" ? "location-hover" : "cls-5"}
                  x="315.11" y="29.26" width="140.3" height="217.53"
                  onClick={() => handleLocationClick("openair")}
                  onMouseEnter={() => setHoveredLocation("openair")}
                  onMouseLeave={() => setHoveredLocation(null)}
                  style={{ cursor: "pointer" }}
                />
                <rect
                  id="outdoor"
                  className={selectedLocation === "outdoor" ? "location-selected" : hoveredLocation === "outdoor" ? "location-hover" : "cls-5"}
                  x="73" y="286.11" width="271.09" height="104.68"
                  onClick={() => handleLocationClick("outdoor")}
                  onMouseEnter={() => setHoveredLocation("outdoor")}
                  onMouseLeave={() => setHoveredLocation(null)}
                  style={{ cursor: "pointer" }}
                />
              </g>
            </svg>
          </div>
        )}
      </div>

      {hoveredLocation && (
        <div
          className="fixed pointer-events-none w-max bg-background text-black px-2 py-1 rounded-md text-sm font-medium shadow-md z-50"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            opacity: hoveredLocation ? 1 : 0,
            animation: 'tooltipExpand 0.2s ease-out'
          }}
        >
          {locations[hoveredLocation as keyof typeof locations].name}
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-lg text-gray-600">
          {view3D ? "Rotate the model to explore and click on a section to select" : "Click on a section to select your preferred dining area"}
        </p>

        <motion.div
          className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-center"
          style={{ minHeight: 120 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center w-full">
            <h3 className="text-lg font-medium text-primary-darker">
              {selectedLocation
                ? locations[selectedLocation as keyof typeof locations].name
                : "Click a section to select"}
            </h3>
            <p className="mt-1 text-gray-600">
              {selectedLocation
                ? locations[selectedLocation as keyof typeof locations].description
                : "Choose your preferred dining area by clicking on the map above."}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    location: '',
    message: '',
    restaurant: 'LA' // Default to LA location
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setFormData(prev => ({
      ...prev,
      location
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!formData.location) {
      setError('Please select a dining area on the map');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        location: '',
        message: '',
        restaurant: 'LA'
      });
      setSelectedLocation(null);

    } catch (err) {
      setError('Failed to submit the reservation request. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const locationMap = {
    indoor: "Indoor Dining",
    booth: "Private Booth",
    openair: "Open Air Seating",
    outdoor: "Outdoor Patio"
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-heading font-bold text-black  sm:text-4xl">
          Reservations
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Choose your preferred dining area and make a reservation at Maitso.
        </p>
      </div>

      {submitSuccess ? (
        <div className="bg-green-50 p-8 rounded-lg text-center max-w-md mx-auto border">
          <h2 className="text-xl font-medium text-green-800">Thank you for your reservation request!</h2>
          <p className="mt-2 text-green-700">We'll confirm your reservation shortly via email or phone.</p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="mt-6 inline-flex items-center px-4 py-2 btn btn-primary btn-shine rounded-full"
          >
            Make another reservation
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-heading font-semibold text-black mb-6">Select Your Dining Area</h2>
            <div className="bg-white p-6 rounded-lg shadow-md flex-1">
              <LocationMap
                selectedLocation={selectedLocation}
                setSelectedLocation={handleLocationSelect}
              />
            </div>
          </div>

          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-heading font-semibold text-black mb-6">Reservation Details</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md flex-1 flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 flex-1">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="restaurant" className="block text-sm font-medium text-gray-700 mb-2">
                    Restaurant Location
                  </label>
                  <select
                    name="restaurant"
                    id="restaurant"
                    required
                    value={formData.restaurant}
                    onChange={handleChange}
                    className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md"
                  >
                    <option value="LA">Los Angeles</option>
                    <option value="NY">New York</option>
                    <option value="Chicago">Chicago</option>
                    <option value="Seattle">Seattle</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <select
                    name="time"
                    id="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md"
                  >
                    <option value="">Select a time</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="1:30 PM">1:30 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="5:30 PM">5:30 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                    <option value="6:30 PM">6:30 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                    <option value="7:30 PM">7:30 PM</option>
                    <option value="8:00 PM">8:00 PM</option>
                    <option value="8:30 PM">8:30 PM</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    id="guests"
                    required
                    value={formData.guests}
                    onChange={handleChange}
                    className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num.toString()}>
                        {num} {num === 1 ? 'person' : 'people'}
                      </option>
                    ))}
                    <option value="9+">9+ people (large group)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Dietary restrictions, special occasions, etc."
                    className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <input
                type="hidden"
                name="location"
                value={selectedLocation || ''}
              />

              {error && (
                <div className="mt-6 text-red-600 text-sm bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary btn btn-shine inline-flex items-center justify-center px-6 py-4 border border-transparent rounded-full shadow-sm text-base font-medium"
                >
                  {isSubmitting ? 'Processing...' : 'Reserve a Table'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary-darker mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">Phone</h3>
          <p className="mt-2 text-gray-600">(123) 456-7890</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary-darker mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">Email</h3>
          <p className="mt-2 text-gray-600">hello@maitso.com</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary-darker mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">Hours</h3>
          <p className="mt-2 text-gray-600">Mon-Fri: 11am - 10pm<br />Sat-Sun: 10am - 11pm</p>
        </div>
      </div> */}
    </div>
  );
}
