import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className="grid grid-cols-2 gap-8 ml-80 mr-80">
      <div className="bg-nuetral p-4 rounded-3xl">
        <h1 className="text-right text-primary font-heading text-4xl leading-tight">
          Healthy Meals For You
        </h1>
        <Image
          src="/img/foodplatter1.png"
          alt="New York"
          className="height-auto rounded-3xl shadow-md"
          width={400}
          height={400}
        />
        <br></br>
        <h1 className="text-right text-2xl font-sans">Ingredient Selection</h1>
        <h1 className="text-right font-body">
          Only the most fresh, locally sourced ingredients make it into our
          delicious meals.
        </h1>
        <br></br>
        <Image
          src="/img/foodplatter2.png"
          alt="New York"
          className="height-auto rounded-3xl shadow-md"
          width={400}
          height={400}
        />
        <br></br>
        <h1 className="text-right text-2xl font-sans">Waste Reduction</h1>
        <h1 className="text-right text-text font-body">
          Eco friendly packaging and customizable portion sizes help us reduce
          waste and environmental footprint.
        </h1>
        <br></br>
        <Image
          src="/img/wastereduction.png"
          alt="New York"
          className="height-auto rounded-3xl shadow-md"
          width={400}
          height={400}
        />
        <br></br>
      </div>
      <div className="bg-nuetral p-4 rounded-lg">
        <h1>
          Vegetarian food has been proven to reduce risk of cancer and other
          diseases, while boosting the immune system. It also helps:
        </h1>
        <br></br>
        <h1>Lower risk of cardiac related issues</h1>
        <h1>Provide more vitamins and minerals</h1>
        <h1 className="text-left text-primary font-heading text-4xl leading-tight">
          Concsious Choices By Us
        </h1>
        <h1 className="text-left text-2xl font-sans">Sustainable Sourcing</h1>
        <h1>
          By partnering with trusted farms and suppliers, we support ethical
          farming practices that prioritize the plants well-being.
        </h1>
        <br></br>
        <Image
          src="/img/sustainablesourcing.png"
          alt="New York"
          className="height-auto rounded-3xl shadow-md"
          width={400}
          height={400}
        />
        <br></br>
        <h1 className="text-left text-2xl font-sans">Energy Efficiency</h1>
        <h1>
          Our kitchen operations are designed to minimize energy waste through
          sustainable appliances and practices to reduce our carbon footprint.
        </h1>
      </div>
    </div>
  );
};

export default Page;
