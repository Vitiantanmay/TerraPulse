
import L from 'leaflet';

export const createGlowIcon = (color: string, size: number, content: string = '') => {
  return L.divIcon({
    html: `
      <div class="relative flex items-center justify-center" style="width: ${size}px; height: ${size}px;">
        <div class="absolute inset-0 rounded-full animate-pulse" style="background-color: ${color}; opacity: 0.5; filter: blur(5px);"></div>
        <div class="absolute inset-0 rounded-full" style="background-color: ${color};"></div>
        <div class="absolute text-white text-xs font-bold">${content}</div>
      </div>
    `,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};
