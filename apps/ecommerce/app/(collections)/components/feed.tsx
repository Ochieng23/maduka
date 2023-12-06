import React from 'react';

interface FeedType {
  id:number,
title: string,
description: string
colors: string[],
quantity: number,
images: string[],
price: number

}

// Example of Feed component definition
const Feed: React.FC<FeedType> = ({ title, description, colors, quantity, images, price }) => {
  return (
    // <div>
    //   <p>Title: {title}</p>
    //   <p>Description: {description}</p>
    //   <p>Colors: {colors}</p>
    //   <p>Quantity: {quantity}</p>
    //   {/* Additional rendering logic for images */}
    //   {images.map((image, index) => (
    //     <img key={index} src={image} alt={`Image ${index}`} />
    //   ))}
    //   <p>Price: {price}</p>
    // </div>


    <div className="bg-white">
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">shop the collection</h2>

    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {/* Display a single product */}
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={images[0]}
            alt={''}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={''}>
                <span aria-hidden="true" className="absolute inset-0" />
                {title}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{colors}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{price}</p>
        </div>
      </div>
    </div>
  </div>
</div>




  );
};

export default Feed;
