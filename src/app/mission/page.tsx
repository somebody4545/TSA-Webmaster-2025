import React from "react";
import Image from "next/image";
import {
  Citrus,
  Tractor,
  Truck,
  Quote as QuoteIcon,
  CarTaxiFront,
  Bike,
  ChefHat,
  CookingPot,
  Salad,
  Users,
  Utensils,
} from "lucide-react";

const MissionPage = () => {
  return (
    <div className="min-h-screen">
      <div className="relative w-full h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('img/farmtofork.webp')" }}
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            aria-hidden="true"
          ></div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            From <span className="text-primary">Farm</span> to{" "}
            <span className="text-primary">Fork</span>
          </h1>
        </div>
      </div>

      <div className="py-12 px-4 bg-background">
        <div className="container mx-auto px-3">
          <div className="flex justify-center mb-12">
            <div className="flex flex-col md:flex-row w-full md:w-11/12 max-w-6xl gap-6">
              <div className="p-6rounded-lg w-full md:w-2/5 md:h-80 flex flex-col justify-center">
                <h3 className="text-3xl font-heading font-bold mb-3 text-primary-darker">
                  Local Farms
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Tractor
                      className="h-12 w-12 text-primary-darker mt-0.5 mr-2 flex-shrink-0"
                      strokeWidth={1.2}
                    />
                    <p className="text-text font-body">
                      We partner with local farmers to ensure you get to enjoy
                      the freshest, most flavorful vegetables and fruits.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Citrus
                      className="h-12 w-12 text-primary-darker mt-0.5 mr-2 flex-shrink-0"
                      strokeWidth={1.2}
                    />
                    <p className="text-text font-body">
                      We prioritize seasonal produce to ensure peak flavor and
                      nutrition.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Users
                      className="h-12 w-12 text-primary-darker mt-0.5 mr-2 flex-shrink-0"
                      strokeWidth={1.2}
                    />
                    <p className="text-text font-body">
                      We support environmentally friendly farming practices that
                      strengthen our local food community.
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:w-3/5 items-center justify-center">
                <div className="w-full h-80">
                  <Image
                    src="/img/farmer.jpg"
                    alt="Farm image"
                    width={480}
                    height={270}
                    className="rounded-lg shadow-md object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-12">
            <div className="w-full md:w-4/5 max-w-4xl text-center">
              <div className="text-3xl font-heading font-bold text-primary-darker">
                Our Partners
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-12">
            <div className="w-full md:w-11/12 max-w-6xl">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <a
                    key={index}
                    href={`/img/partner${index}`}
                    className="block"
                  >
                    <div className="aspect-9:16 bg-background-dim rounded-lg shadow-sm flex items-center justify-center transition-transform hover:scale-105">
                      <Image
                        src={`/img/partner${index}.png`}
                        alt={`Partner ${index} logo`}
                        width={200}
                        height={200}
                        className="object-contain"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full h-screen relative overflow-hidden">
            <div className="absolute inset-0"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-xl md:text-xl lg:text-2xl font-heading font-bold text-primary-darker mb-4 max-w-2xl sm:max-w-2xl text-center">
                Since emissions from transportations account for{" "}
                <span className="text-black font-bold">28%</span> of greenhouse
                gas emissions we use...
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-20 mt-16">
            <div className="flex flex-col items-center">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-heading font-bold text-primary-darker">
                  Sustainable Transportation
                </h3>
              </div>
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="h-48 md:h-64 relative rounded-lg overflow-hidden">
                    <Image
                      src="/img/bikedelivery.jpg"
                      alt="Eco-friendly Transport"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-lg md:text-2xl font-heading font-bold text-white">
                        Bike Delivery
                      </p>
                    </div>
                  </div>
                  <div className="h-48 md:h-64 relative rounded-lg overflow-hidden">
                    <Image
                      src="/img/robotdelivery.jpg"
                      alt="Electric Vehicles"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-lg md:text-2xl font-heading font-bold text-white">
                        EVs & Robot Delivery
                      </p>
                    </div>
                  </div>
                  <div className="h-48 md:h-64 relative rounded-lg overflow-hidden">
                    <Image
                      src="/img/greenfreight.jpg"
                      alt="Bicycle Couriers"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-lg md:text-2xl font-heading font-bold text-white">
                        Green Freight
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="h-48 md:h-64 relative rounded-lg overflow-hidden bg-background-dim">
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="absolute inset-0 flex items-start p-6">
                      <div className="flex items-start">
                        <ChefHat
                          className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0"
                          strokeWidth={1.5}
                        />
                        <p className="text-lg font-heading font-bold text-white">
                          World Cuisine
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="h-48 md:h-64 relative rounded-lg overflow-hidden bg-background-dim">
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="absolute inset-0 flex items-start p-6">
                      <div className="flex items-start">
                        <CookingPot
                          className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0"
                          strokeWidth={1.5}
                        />
                        <p className="text-lg font-heading font-bold text-white">
                          Cooking Techniques
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="h-48 md:h-64 relative rounded-lg overflow-hidden bg-background-dim">
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="absolute inset-0 flex items-start p-6">
                      <div className="flex items-start">
                        <Utensils
                          className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0"
                          strokeWidth={1.5}
                        />
                        <p className="text-lg font-heading font-bold text-white">
                          Cultural Stories
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="py-8 bg-primary-darker">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-3 flex justify-center">
              <QuoteIcon className="w-10 h-10 text-background-dim" />
            </div>
            <div className="text-lg md:text-xl font-body font-bold italic text-white">
              "Nothing will benefit human health and increase chances for
              survival of life on Earth as much as the evolution to a vegetarian
              diet."
              <div className="text-sm text-background-dim mt-3">
                — Albert Einstein
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Our Commitments Section */}
      <div className="relative">
        {/* Full-width pig image */}
        <div className="relative w-full h-screen">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/api/placeholder/1200/800')" }}
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-40"
              aria-hidden="true"
            ></div>
          </div>

          {/* Our Commitments Heading */}
          <div className="absolute top-0 left-0 w-full py-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white text-center">
              Our Commitments
            </h2>
          </div>

          {/* Commitment cards without animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                {/* Card 1: Global Cuisines */}
                <div className="w-full md:w-1/3 bg-background-dim rounded-lg shadow-xl overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Image
                        src="/api/placeholder/60/60"
                        alt="Globe icon"
                        width={60}
                        height={60}
                        className="h-12 w-12"
                      />
                      <h3 className="text-xl font-heading font-bold ml-4 text-primary-darker">
                        Authentic Global Cuisines
                      </h3>
                    </div>
                    <div className="text-text font-body">
                      <p>
                        We showcase authentic dishes from across the world,
                        respecting traditional techniques while incorporating
                        local, sustainable ingredients. Each dish tells a
                        cultural story.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2: Food Waste */}
                <div className="w-full md:w-1/3 bg-background-dim rounded-lg shadow-xl overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Image
                        src="/api/placeholder/60/60"
                        alt="Food waste icon"
                        width={60}
                        height={60}
                        className="h-12 w-12"
                      />
                      <h3 className="text-xl font-heading font-bold ml-4 text-primary-darker">
                        Minimizing Food Waste
                      </h3>
                    </div>
                    <div className="text-text font-body">
                      <p>
                        We partner with food security organizations to ensure
                        leftover food goes to those in need. Our prep techniques
                        maximize ingredient usage while minimizing waste.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3: Sustainable Sourcing */}
                <div className="w-full md:w-1/3 bg-background-dim rounded-lg shadow-xl overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Image
                        src="/api/placeholder/60/60"
                        alt="Sustainability icon"
                        width={60}
                        height={60}
                        className="h-12 w-12"
                      />
                      <h3 className="text-xl font-heading font-bold ml-4 text-primary-darker">
                        Sustainable Sourcing
                      </h3>
                    </div>
                    <div className="text-text font-body">
                      <p>
                        We carefully select ingredients that are organic, local,
                        and in season. Our packaging is 100% compostable or
                        recyclable. We prioritize vendors who share our
                        environmental values.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionPage;
