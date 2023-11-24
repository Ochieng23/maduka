import React from 'react';

function productRating(data: number[]) {
  if (data.length === 0) {
    return 0;
  }

  const totalRating = data.reduce((acc, rating) => acc + rating, 0);
  const averageRating = totalRating / data.length;

  return averageRating;
}

export default productRating;
