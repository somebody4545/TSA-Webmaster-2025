import React from 'react'

const Page = () => {
  return (
    <section className="bg-black text-background">
      <div className="container mx-auto h-[80vh] lg:p-12 py-12 gap-32 flex max-lg:flex-col items-center justify-center w-screen">
        <div className='w-1/2'>
            <h1 className="text-4xl leading-none font-heading text-primary mb-4">Gift Cards</h1>
            <p className="text-lg lg:mr-32">Whether it be a birthday, anniversary, or just because, give the gift of a delicious meal with a Maitso gift card.</p>
        </div>
        <div className='w-1/2 relative h-full'>
        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center'>
            <div className='m-auto dot-matrix-background w-full aspect-square flex items-center justify-center'>
            </div>
        </div>
        </div>
    
      </div>
    </section>
  )
}

export default Page;