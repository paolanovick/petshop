import { useEffect } from 'react';

const BASE_URL = 'https://vagabundo.com.ar';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;
const SITE_NAME = 'Pet Shop Vagabundo';

function setMeta(selector, content) {
  const el = document.querySelector(selector);
  if (el) el.content = content;
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function useSEO({ title, description, image, url, type = 'website', price }) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const resolvedImage = image || DEFAULT_IMAGE;
    const resolvedUrl = url ? `${BASE_URL}${url}` : BASE_URL;
    const resolvedDesc =
      description ||
      'Alimentos, accesorios, juguetes, higiene y peluquería para mascotas. Envíos a todo el país.';

    document.title = fullTitle;
    setMeta('meta[name="description"]', resolvedDesc);
    setLink('canonical', resolvedUrl);

    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', resolvedDesc);
    setMeta('meta[property="og:image"]', resolvedImage);
    setMeta('meta[property="og:image:alt"]', fullTitle);
    setMeta('meta[property="og:url"]', resolvedUrl);
    setMeta('meta[property="og:type"]', type === 'product' ? 'product' : 'website');

    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', resolvedDesc);
    setMeta('meta[name="twitter:image"]', resolvedImage);
    setMeta('meta[name="twitter:image:alt"]', fullTitle);

    return () => {
      document.title = `${SITE_NAME} - Todo para tu mascota`;
      setMeta('meta[name="description"]', 'Alimentos, accesorios, juguetes, higiene y peluquería para mascotas. Envíos a todo el país.');
      setLink('canonical', BASE_URL + '/');
      setMeta('meta[property="og:title"]', `${SITE_NAME} - Todo para tu mascota`);
      setMeta('meta[property="og:description"]', 'Alimentos, accesorios, juguetes, higiene y peluquería para tu mejor amigo. Envíos a todo el país.');
      setMeta('meta[property="og:image"]', DEFAULT_IMAGE);
      setMeta('meta[property="og:image:alt"]', `${SITE_NAME} - Productos para mascotas`);
      setMeta('meta[property="og:url"]', BASE_URL + '/');
      setMeta('meta[property="og:type"]', 'website');
      setMeta('meta[name="twitter:title"]', `${SITE_NAME} - Todo para tu mascota`);
      setMeta('meta[name="twitter:description"]', 'Alimentos, accesorios, juguetes, higiene y peluquería para tu mejor amigo. Envíos a todo el país.');
      setMeta('meta[name="twitter:image"]', DEFAULT_IMAGE);
      setMeta('meta[name="twitter:image:alt"]', `${SITE_NAME} - Productos para mascotas`);
    };
  }, [title, description, image, url, type, price]);
}
