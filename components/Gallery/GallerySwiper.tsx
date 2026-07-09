'use client';

import Image from 'next/image';
import { BlossomCarousel, BlossomDots } from '@blossom-carousel/react';
import '@blossom-carousel/react/style.css';
import css from './GallerySwiper.module.css';

type Props = {
  images: {
    thumb: string;
    original: string;
  }[];
};

export default function GallerySwiper({ images }: Props) {
  return (
    <div className={css.gallery}>
      <div className={css.carouselWrapper}>
        <BlossomCarousel id="gallery" className={css.carousel}>
          {images.map((image, index) => (
            <div key={index} data-blossom-slide className={css.slide}>
              <Image
                src={image.original}
                alt={`Photo ${index + 1}`}
                draggable={false}
                fill
                className={css.image}
              />
            </div>
          ))}
        </BlossomCarousel>
      </div>

      <div className={css.dots}>
        <BlossomDots for="gallery">
          {({ index }) => (
            <div className={css.thumb}>
              <Image
                src={images[index].thumb}
                alt={`Thumbnail ${index + 1}`}
                fill
                className={css.image}
              />
            </div>
          )}
        </BlossomDots>
      </div>
    </div>
  );
}
