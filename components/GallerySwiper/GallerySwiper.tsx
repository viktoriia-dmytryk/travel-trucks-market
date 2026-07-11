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
                fill
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 1439px) 100vw, 638px"
                className={css.image}
              />
            </div>
          ))}
        </BlossomCarousel>
      </div>

      <div className={css.dots}>
        <BlossomDots for="gallery">
          {({ index, active }) => (
            <div className={css.thumb} data-active={active}>
              <Image
                src={images[index].thumb}
                alt={`Thumbnail ${index + 1}`}
                fill
                draggable={false}
                className={css.image}
                sizes="(max-width: 1439px) 25vw, 136px"
              />
            </div>
          )}
        </BlossomDots>
      </div>
    </div>
  );
}
