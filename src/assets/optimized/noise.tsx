import { getImage } from 'astro:assets';
import recycledImg from '../img/recycled-texture.png';
import noiseImg from '../img/noise.png';

let noiseLightSrc: string | undefined = undefined;
let noiseDarkSrc: string | undefined = undefined;

export const getNoiseLightSrc = async (): Promise<string> => {
  if (!noiseLightSrc) {
    noiseLightSrc = (await getImage({ src: recycledImg, format: 'webp', prerender: true })).src;
  }

  return noiseLightSrc;
};

export const getNoiseDarkSrc = async (): Promise<string> => {
  if (!noiseDarkSrc) {
    noiseDarkSrc = (await getImage({ src: noiseImg, format: 'webp', prerender: true })).src;
  }

  return noiseDarkSrc;
};
