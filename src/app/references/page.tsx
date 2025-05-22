'use client';

export default function ReferencesPage() {

  const devReferences = [
    'https://unsplash.com/photos/landscape-photo-of-new-york-empire-state-building-5omwAMDxmkU',
    'https://unsplash.com/photos/cloud-gate-in-city-during-daytime-cfmSStcrDn4?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash',
    'https://unsplash.com/photos/green-palm-tree-and-city-view-UZVlSjrIJ3o?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash',
    'https://unsplash.com/photos/high-rise-buildings-during-daytime-UmEYn_GYqFo?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash',
    'https://unsplash.com/photos/a-pile-of-different-types-of-vegetables-on-a-white-surface-5aJVJvJ9rG8',
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
    'https://unsplash.com/photos/a-white-plate-topped-with-sliced-tomatoes-and-veggies-zBNb71SxdaA',
    'https://www.freepik.com/premium-photo/multi-generational-farmer-team-holding-wood-boxes-with-fresh-organic-vegetables_14087056.htm',
    'https://www.simplyrecipes.com/collection/whats_in_season_in_january/',
    'https://www.gettyimages.com/detail/photo/collecting-food-for-donation-in-a-homeless-shelter-royalty-free-image/1286048476',
    'https://www.partstown.com/cm/resource-center/guides/gd2/tips-for-an-energy-efficient-kitchen',
    'https://unsplash.com/photos/man-in-white-crew-neck-t-shirt-standing-in-front-of-kitchen-sink-qm6yxe7SjWg',
    'https://unsplash.com/photos/a-plate-of-colorful-vegetables-on-a-black-background-SFL6xzPTlx8',
    'https://unsplash.com/photos/baked-bread-sandwich-UcL0oYHsygk',
    'https://unsplash.com/photos/a-plate-of-food-that-includes-pita-bread-tomatoes-and-cucumbers-I593oW2OKjI',
    'https://unsplash.com/photos/white-green-and-red-flower-bouquet-zW8wA4QwS2M',
    'https://unsplash.com/photos/cooked-food-on-black-ceramic-bowl-Grf4cNRwtkU',
    'https://commons.wikimedia.org/wiki/File:Caprese_salad_skewer_appetizers.jpg',
    'https://commons.wikimedia.org/wiki/File:Edamame_on_a_bamboo_bowl_by_yomi955.jpg',
    'https://unsplash.com/photos/green-soup-in-white-ceramic-bowl-9ND-qkGs1_8',
    'https://unsplash.com/photos/fried-food-on-white-ceramic-bowl-pQnsKWk5ljQ',
    'https://unsplash.com/photos/empty-table-and-chairs-inside-building-ZgREXhl8ER0',
    'https://unsplash.com/photos/a-hand-holding-a-wrap-filled-with-lettuce-and-sauce-wqo9gl7UiOc',
    'https://unsplash.com/photos/sliced-lemon-and-green-leaves-on-brown-wooden-chopping-board-xpd-3kwh6ww',
    'https://unsplash.com/photos/sliced-tomato-and-green-vegetable-salad-OgbVYramPh8',
    'https://unsplash.com/photos/a-bowl-of-cereal-with-berries-bananas-and-other-fruits-AqlcqCzF3aQ',
    'https://unsplash.com/photos/a-couple-of-people-sitting-at-a-table-in-a-restaurant-YduJNHSnJUU',
    'https://unsplash.com/photos/long-stem-wine-glass-on-brown-wooden-table-with-chairs-rOqhhJUf7Ew',
    'https://unsplash.com/photos/a-room-filled-with-lots-of-wooden-tables-and-chairs-7CV0-H5qHRk',
    'https://www.freepik.com/free-photo/arrangement-different-foods-ingredients_12690806.htm#fromView=keyword&page=1&position=33&uuid=9fd44e4d-4e7a-4017-aa02-408d08c14d02&query=Mediterranean+Bowl',
    'https://www.pexels.com/search/mediterranean%20bowl/',
    'https://unsplash.com/photos/photo-of-white-building-j5K6ambkGNk',
    'https://unsplash.com/s/photos/walt-disney-concert-hall',
    'https://unsplash.com/photos/group-of-person-on-store-UDNsmriCntM',
    'https://unsplash.com/photos/woman-taking-picture-of-neon-signage-rIfanjzQfeU',
    'https://unsplash.com/photos/worms-view-of-glass-building-6Mhb55ddt9I',
    'https://unsplash.com/photos/a-statue-of-a-lion-qya3dQM0HP0',
    'https://unsplash.com/photos/city-skyline-during-night-time-6MxW0gR6VMo',
    'https://unsplash.com/photos/two-boats-are-docked-in-a-river-in-a-city-2J6a-2ZO_HA',
    'https://unsplash.com/photos/aerial-view-of-city-buildings-during-daytime-FD-gzGKS5sY',
    'https://unsplash.com/photos/a-group-of-people-in-a-park-h9lmvT1D7lc',
    'https://unsplash.com/photos/people-on-street-near-building-EGzyJk2juPo',
    'https://unsplash.com/photos/a-city-square-with-a-fountain-surrounded-by-tall-buildings-Y8RNCrzIeoI',
    'https://unsplash.com/photos/public-market-center-signage-xsqF178XAhk',
    'https://unsplash.com/photos/space-needle-tower-at-night-QfhbK2pY0Ao',
    'https://unsplash.com/photos/a-large-wooden-sculpture-hanging-from-the-ceiling-of-a-building-3zyo0eJF1-A',
    'https://unsplash.com/photos/a-ferris-wheel-sitting-on-top-of-a-pier-next-to-a-body-of-water-Zxzjayu7ON8',
    'https://unsplash.com/photos/cooked-food-in-black-cooking-pot-eEWlcfydzQ4',
    'https://unsplash.com/photos/cooked-food-in-black-cooking-pot-eEWlcfydzQ4',
    'https://unsplash.com/s/photos/stuffed-bell-pepper?license=free',
    'https://unsplash.com/s/photos/mushroom-stroganoff?license=free',
    'https://unsplash.com/photos/pesto-pasta-garnished-with-basil-and-cheese-1aidrXyeuLs',
    'https://unsplash.com/photos/red-liquid-in-clear-drinking-glass-rJJuQjPsSLk',
    'https://unsplash.com/photos/green-liquid-in-clear-drinking-glass-Rd_cmQWnCaM',
    'https://unsplash.com/s/photos/Turmeric-latte',
    'https://unsplash.com/s/photos/matcha-green-tea',
    'https://unsplash.com/photos/strawberry-juice-in-clear-drinking-glass-05PIGVqLvY4',
    'https://unsplash.com/photos/man-in-red-shirt-holding-white-textile-hcET0JIGXoI',
    'https://unsplash.com/photos/man-in-black-nike-jacket-wearing-white-cap-SiQgni-cqFg',
    'https://unsplash.com/photos/a-man-cooking-food-in-a-kitchen-wNQoaYCFcsI',
    'https://canva.com',
    'https://unsplash.com/photos/a-white-trailer-parked-next-to-a-table-and-chairs-RE7R7Aj1aew',
    'https://unsplash.com/photos/grayscale-photo-of-desk-globe-TH7TW20de9s',
    'https://unsplash.com/photos/green-plant-x8ZStukS2PM',
    'https://unsplash.com/photos/grass-field-IQVFVH0ajag',
    'https://unsplash.com/photos/barn-on-green-field-YvvHEQNgMcU',
    'https://unsplash.com/photos/house-and-trees-J82dSkOxvY8',
    'https://unsplash.com/photos/farm-with-cornfield-near-road-during-daytime-HGJqVcbQLgk'
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-10 text-center">References</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
            <h2 className="text-2xl font-heading font-semibold mb-4">Work Log</h2>
            <div className="h-[500px] md:h-[600px] w-full">
              <iframe
                src="/worklog.pdf"
                className="w-full h-full rounded-lg border border-gray-300"
                title="Work Log PDF"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
            <h2 className="text-2xl font-heading font-semibold mb-4">Copyright Checklist</h2>
            <div className="h-[500px] md:h-[600px] w-full">
              <iframe
                src="/copyright.pdf"
                className="w-full h-full rounded-lg border border-gray-300"
                title="Copyright Checklist PDF"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
            <h2 className="text-2xl font-heading font-semibold mb-4">Code Stack</h2>
            <p className="text-base md:text-lg leading-relaxed">
              This website utilizes NextJS, a modern framework built on top of ReactJS optimized for efficiency and fast render times. On top of this, this website utilizes TailwindCSS, a framework allowing for shorthand CSS to be written directly in components, as well as DaisyUI, a TailwindCSS addition with accessible and responsive class names for standard components. Non-standard components and the theming of the site are done by the work of our team. This site follows current WCAG accessibility guidelines for color contrast, with small text at a AAA contrast ratio rating, and large text with at least a AA contrast ratio rating. Card renders are made with Twinmotion, Adobe Illustrator, and Blender. Menu page hero is a combination of two other photos, edited in Photoshop. News and partner logos are created by our team, with partner logos overlayed on photos. Reservations 3d model and svg are made by us. The 3d food pie chart is made by CSS effects, without external libraries. We use Firebase to deal with authentication for rewards, and Stripe to handle gift card orders.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
            <h2 className="text-2xl font-heading font-semibold mb-4">Additional Libraries Utilized</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ul className="list-disc pl-6 text-base md:text-lg">
                <li className="mb-3">
                  <code className="bg-gray-100 px-2 py-1 rounded">lucide-react</code>: A library of icons for use in React applications.
                </li>
                <li className="mb-3">
                  <code className="bg-gray-100 px-2 py-1 rounded">framer-motion</code>: A library for creating animations in React applications.
                </li>
                <li className="mb-3">
                  <code className="bg-gray-100 px-2 py-1 rounded">three.js</code> (via <code className="bg-gray-100 px-2 py-1 rounded">react-three-fiber</code>): A library for creating 3D graphics in React applications.
                </li>
                <li className="mb-3">
                  <code className="bg-gray-100 px-2 py-1 rounded">react-multi-carousel</code>: A library for creating carousels in React applications.
                </li>
              </ul>
              <ul className="list-disc pl-6 text-base md:text-lg">
                <li className="mb-3">
                  <code className="bg-gray-100 px-2 py-1 rounded">react-circle-flags</code>: A library for displaying flags in React applications.
                </li>
                <li className="mb-3">
                  <code className="bg-gray-100 px-2 py-1 rounded">https://randomuser.me/</code>: Used for generating random user images for testimonials, which have a free license for use.
                </li>
                <li className="mb-3">
                  <code className="bg-gray-100 px-2 py-1 rounded">Google Maps API</code>: Used for generating maps for the locations page.
                </li>
                <li className="mb-3">
                  <code className="bg-gray-100 px-2 py-1 rounded">stripe</code>: Used for handling secure payments and checkout flows. We use their industry standard page for checkout, which is PCI compliant.
                </li>
                <li className="mb-3">
                  <code className="bg-gray-100 px-2 py-1 rounded">firebase</code>: Used for authentication and database storage.
                </li>
                <li className="mb-3">
                  <code className="bg-gray-100 px-2 py-1 rounded">vercel</code>: Used for hosting and deploying the website with seamless integration for Next.js applications.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Image Links Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
            <h2 className="text-2xl font-heading font-semibold mb-4">Image Links</h2>
            <p className="text-base md:text-lg pb-4">All images rely on either the <span className="font-bold">Unsplash</span>, <span className="font-bold">Canva License</span>, or <span className="font-bold">Creative Commons Sharealike (+ Attribution)</span> license, or are otherwise public domain.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {devReferences.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-darker hover:underline break-words text-sm md:text-base bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
            <h2 className="text-2xl font-heading font-semibold mb-4">Research Links</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {researchReferences.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-darker hover:underline break-words text-sm md:text-base bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}