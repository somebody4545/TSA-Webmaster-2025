'use client';

export default function ReferencesPage() {

  const devReferences = [
		'https://unsplash.com/photos/landscape-photo-of-new-york-empire-state-building-5omwAMDxmkU',
		'https://unsplash.com/photos/cloud-gate-in-city-during-daytime-cfmSStcrDn4?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash',
		'https://unsplash.com/photos/green-palm-tree-and-city-view-UZVlSjrIJ3o?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash',
		'https://unsplash.com/photos/high-rise-buildings-during-daytime-UmEYn_GYqFo?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash',
    'https://unsplash.com/photos/green-vegetable-on-brown-wooden-table-qPcSUERqBAc',
    'https://en.wikipedia.org/wiki/The_Washington_Post#/media/File:The_Logo_of_The_Washington_Post_Newspaper.svg',
    'https://en.wikipedia.org/wiki/Forbes#/media/File:Forbes_logo.svg',
    'https://en.wikipedia.org/wiki/File:The_Guardian_2018.svg',
    'https://en.wikipedia.org/wiki/Today_(American_TV_program)#/media/File:Today_2023.svg',
    'https://en.wikipedia.org/wiki/Los_Angeles_Times#/media/File:Los_Angeles_Times_logo.svg',
    'https://en.wikipedia.org/wiki/File:NewYorkTimes.svg',
    'https://www.pexels.com/photo/an-aerial-shot-of-a-busy-road-7358771/',
    'https://unsplash.com/photos/white-rice-with-sliced-strawberries-and-brown-nuts-on-white-ceramic-plate-5pk7ZB1xyjU',
    'https://www.themediterraneandish.com/wp-content/uploads/2022/09/falafel-bowl-recipe-1.jpg',
    'https://unsplash.com/photos/green-and-brown-vegetable-on-white-ceramic-plate-7GO11y7bznw',
    'https://www.flickr.com/photos/queenkv/13699777484/',
    'https://www.mydarlingvegan.com/korean-barbecue-bowl/',
    'https://unsplash.com/photos/cooked-foods-WmKXu-bzygo',
    'https://unsplash.com/photos/a-blue-bowl-filled-with-vegetables-and-a-wooden-spoon-yhc4pSbl01A',
    'https://unsplash.com/photos/bowl-of-vegetable-salads-IGfIGP5ONV0',
    'https://unsplash.com/photos/noddles-on-black-bowl-V82GYnR98lY',
    'https://unsplash.com/photos/fried-rice-with-green-vegetable-on-brown-ceramic-plate-708OpfCW4H8',
    'https://www.flickr.com/photos/tabocat/50992810931/in/photolist-24Ue6eV-2kG4u8n-2pyTfEx-2oZBuxg-28BRpfm-DGeM4z-SFHFXV-2qM7Db8-2kSefDM-PCFD9y-24JCjhE-2quC5XQ-a13JLH-2ooTnwP-2nxGJT7-2i8qh5c-2i8qh4q-KwaTzB-2omJerY-2pCwbQq-mDpEi-2q37oDg-dbDkCb-2qR2b2F-2oM54dz-8aLTdv-2qR2b2q-2qR39Bv-22AnutA-2iM57jt-7oub6M-27AJFvN-2ibUAzZ-i9jpUs-8aLTT8-QRcGkq-2hacWKp-MjE3wm-a2MMqP-KiJLEE-BJazA1-PoZrDZ-8gnkZY-2np9V9Y-bU1X3i-S4iYd7-2kUtMqw-27whiVj-8aQbCJ',
    'https://www.flickr.com/photos/heatherchristo/32034624680/in/photolist-QNMPRb-5eYg7q-hRP7vp-brqK1j-emvPht-22n6P3p-i3Eyh4-dtoRoP-nmqmLE-GRejzV-dTQm1R-dkR6iG-pZdSn7-pdbfP3-csyccY-aVgR7T-dQVauB-eahAf8-eecBJc-7KccTM-CRDUFt-bzAgqw-ytLAo-mjHrRe-VMRstA-uEi9g-pRjLMp-gSnzJX-Mji2yw-kUDmpn-GVCqUC-uEi9W-ioY33a-RTwxtj-hRQCbx-2758oyn-nrHFx1-aVjajP-aebRu6-hRQ751-okoUiJ-jRHYFv-27axTRD-WrJjEx-5xvunG-WwUk3K-wEHWUf-i6xxo7-Ui833N-jaXCSA',
    'https://purepng.com/photo/4574/food-food-plate-top-view',
    'https://unsplash.com/photos/a-white-plate-topped-with-sliced-tomatoes-and-veggies-zBNb71SxdaA',
    'https://www.freepik.com/premium-photo/multi-generational-farmer-team-holding-wood-boxes-with-fresh-organic-vegetables_14087056.htm',
    'https://www.simplyrecipes.com/collection/whats_in_season_in_january/',
    'https://www.gettyimages.com/detail/photo/collecting-food-for-donation-in-a-homeless-shelter-royalty-free-image/1286048476',
    'https://www.partstown.com/cm/resource-center/guides/gd2/tips-for-an-energy-efficient-kitchen',
    'https://unsplash.com/photos/man-in-white-crew-neck-t-shirt-standing-in-front-of-kitchen-sink-qm6yxe7SjWg',
  ];

  const researchReferences = [
    'https://www.mdanderson.org/publications/focused-on-health/5-benefits-of-a-plant-based-diet.h20-1592991.html',
    'https://www.hitchcockfarms.com/blog/farm-to-table-movement',
    'https://www.sare.org/resources/farm-to-table-building-local-and-regional-food-systems/',
    'https://www.myplate.gov/eat-healthy/what-is-myplate',
    'https://www.w3.org/WAI/WCAG22/quickref/',
    'https://www.nytimes.com/2023/03/14/dining/zero-waste-cooking.html',
    'https://sdgs.un.org/topics/sustainable-transport',
    'https://doublenpotatoes.com/',
    'https://www.helsingjunctionfarms.com/',
    'https://schuhfarmswa.com/',
    'https://www.palousebrand.com/',
    'https://carnationfarms.org/'
  ];

  return (
    <div className="min-h-screen w-full px-4 py-6 md:px-8 lg:px-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">References</h1>
      
      {/* PDF Documents Section */}
      <div className="flex flex-col gap-8 mb-12 w-full">
        <div className="flex justify-center w-full">
          <div className="bg-gray-100 rounded-lg p-4 md:p-6 w-full shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Work Log</h2>
            <div className="h-[500px] md:h-[600px] lg:h-[800px] w-full">
              <iframe
                src="/worklog.pdf"
                className="w-full h-full rounded-lg border border-gray-300"
                title="Work Log PDF"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="bg-gray-100 rounded-lg p-4 md:p-6 w-full shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Copyright Checklist</h2>
            <div className="h-[500px] md:h-[600px] lg:h-[800px] w-full">
              <iframe
                src="/copyright.pdf"
                className="w-full h-full rounded-lg border border-gray-300"
                title="Copyright Checklist PDF"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Code Stack Section */}
      <div className="flex justify-center w-full mb-8">
        <div className="bg-gray-100 rounded-lg p-4 md:p-6 w-full shadow-md">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Code Stack</h2>
          <p className="text-lg md:text-xl leading-relaxed">
            This website utilizes NextJS, a modern framework built on top of ReactJS optimized for efficiency and fast render times. On top of this, this website utilizes TailwindCSS, a framework allowing for shorthand CSS to be written directly in components, as well as DaisyUI, a TailwindCSS addition with accessible and responsive class names for standard components. Non-standard components and the theming of the site are done by the work of our team. This site follows current WCAG accessibility guidelines for color contrast, with small text at a AAA contrast ratio rating, and large text with at least a AA contrast ratio rating. Card renders are made with Twinmotion, Adobe Illustrator, and Blender. Menu page hero is a combination of two other photos, edited in Photoshop.
          </p>
        </div>
      </div>

      {/* Libraries Section */}
      <div className="flex justify-center w-full mb-8">
        <div className="bg-gray-100 rounded-lg p-4 md:p-6 w-full shadow-md">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Additional Libraries Utilized</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ul className="list-disc pl-6 text-lg md:text-xl">
              <li className="mb-3">
                <code className="bg-gray-200 px-2 py-1 rounded">lucide-react</code>: A library of icons for use in React applications.
              </li>
              <li className="mb-3">
                <code className="bg-gray-200 px-2 py-1 rounded">framer-motion</code>: A library for creating animations in React applications.
              </li>
              <li className="mb-3">
                <code className="bg-gray-200 px-2 py-1 rounded">three.js</code> (via <code className="bg-gray-200 px-2 py-1 rounded">react-three-fiber</code>): A library for creating 3D graphics in React applications.
              </li>
              <li className="mb-3">
                <code className="bg-gray-200 px-2 py-1 rounded">react-multi-carousel</code>: A library for creating carousels in React applications.
              </li>
            </ul>
            <ul className="list-disc pl-6 text-lg md:text-xl">
              <li className="mb-3">
                <code className="bg-gray-200 px-2 py-1 rounded">react-circle-flags</code>: A library for displaying flags in React applications.
              </li>
              <li className="mb-3">
                <code className="bg-gray-200 px-2 py-1 rounded">https://randomuser.me/</code>: Used for generating random user images for testimonials, which have a free license for use.
              </li>
              <li className="mb-3">
                <code className="bg-gray-200 px-2 py-1 rounded">Google Maps API</code>: Used for generating maps for the locations page.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Image Links Section */}
      <div className="flex justify-center w-full mb-8">
        <div className="bg-gray-100 rounded-lg p-4 md:p-6 w-full shadow-md">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Image Links</h2>
          <p className="text-lg md:text-xl pb-4">All images rely on either the <span className="font-bold">Unsplash</span> or <span className="font-bold">Creative Commons Sharealike (+ Attribution)</span>, or are otherwise public domain</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {devReferences.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-darker hover:underline break-words text-lg bg-white p-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Research Links Section */}
      <div className="flex justify-center w-full">
        <div className="bg-gray-100 rounded-lg p-4 md:p-6 w-full shadow-md">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Research Links</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {researchReferences.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-darker hover:underline break-words text-lg bg-white p-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}