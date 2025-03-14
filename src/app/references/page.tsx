'use client';


export default function ReferencesPage() {

  const devReferences = [
    'https://images.search.yahoo.com/yhs/search;_ylt=AwrO88ctYNNnM5gaVRYPxQt.;_ylu=Y29sbwNncTEEcG9zAzEEdnRpZAMEc2VjA3BpdnM-?p=medeterrain+bowl+with+falafel+and+hummus&type=f2%3A%3B.6850610d4680680b2811f3dcdca6be379af%3B5.ac48522a20946644e52a8ef8e64166f19c0ca9cd289975659b0570f139cfd1da05e084af6b3ead9e7484e&param2=9dUI1n2R0BLDxNuWfiP4aWyjOZc2NBa%2Bx2opBYQCDMSB7nBAfwbAzkkglZNKi5o21u72Jm8TatlnU7NDGbP7F8Lft0aXvravgWuUt1wLTDRGoZDy1s38eFH2mqhQf7J35YCbQdFh0U0Q40PE25%2BEeG%2Bt%2By660cfFWnTypqgOdcCEXC2uDPVhO6ZO8CKE5Qro4MNRwFCkFSy1X1TZ2UTu%2F3A%2BJSOCQl%2B5Q5JWhgl9WRt6tyFG7v%2FQyqB5FR%2B8KC6ToDAkco0HRdyILKw8C1uY5dmIvHBXEmDvakUhmSBzvO3cM7WlfGijvf2NVq%2BHu04%2B&param3=HpCyCT2cXaKG4CVDR00rqgObRQahimQNt2d5ZCR7Jy3IZoD3T11qaq2nywASZYgK9bd5KghnciAqZV%2B9Ws3loRegxAcUoqol5jxVERvGoNt7BjwAt8Xs1AesGK0%2Fyuer4XzWPza6EB6If5O70BgZ%2BIdmqy99R%2B1PI2bwurxFd%2FalDeX4F4bJ6JIQtw70OJItguI96yXL94Kn1XFBxRdBUDePB%2Bjy5b02bbFeHyDuLUUT2Rx8Wry9OzosRkZBkIB86Riv9e3FQadcFgMACZuZFnY%2B3HEHVJkxJ9sqvDKiaSR9ufLmB%2BSczl3gO0VwlOmac3cLZ0hHuDoVweMizPMpoA%3D%3D&hsimp=yhs-syn_launcham&hspart=iba&ei=UTF-8&fr=yhs-iba-syn_launcham#id=19&iurl=https%3A%2F%2Ffeelgoodfoodie.net%2Fwp-content%2Fuploads%2F2020%2F08%2FMediterranean-Hummus-Bowl-7-736x1104.jpg&action=click',
		'https://unsplash.com/photos/landscape-photo-of-new-york-empire-state-building-5omwAMDxmkU',
		'https://unsplash.com/photos/cloud-gate-in-city-during-daytime-cfmSStcrDn4?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash',
		'https://unsplash.com/photos/green-palm-tree-and-city-view-UZVlSjrIJ3o?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash',
		'https://unsplash.com/photos/high-rise-buildings-during-daytime-UmEYn_GYqFo?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash'
  ];

  return (
    <div className="container p-4 w-screen px-8">
      <h1 className="text-2xl font-bold mb-4">References</h1>
      <div>
        <h2 className="text-xl font-semibold mb-2">Code Stack</h2>
        <p>This website utilizes NextJS, a modern framework built on top of ReactJS optimized for efficiency and fast render times. On top of this, this website utilizes TailwindCSS, a framework allowing for shorthand CSS to be written directly in components, as well as DaisyUI, a TailwindCSS addition with accessible and responsive class names for standard components. This site follows WCAG accessibility guidelines for color contrast, with small text at a AAA contrast ratio, and header text with at least a AA contrast ratio.</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Image Links</h2>
        <ul className="list-disc pl-5">
          {devReferences.map((link, index) => (
            <li key={index} className="mb-1 break-words">
              <a 
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline break-words"
              >
              {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}