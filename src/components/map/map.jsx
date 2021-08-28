import React, { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import styles from './map.module.scss';
import 'leaflet/dist/leaflet.css';
import icon from '../../assets/img/location.svg';

const CITIES = [
  { lat: 55.7522, lng: 37.6156 },
  { lat: 55.7887, lng: 49.1221 },
  { lat: 51.5406, lng: 46.0086 },
  { lat: 57.1522, lng: 65.5272 },
  { lat: 54.9924, lng: 73.3686 },
];

const MapConfig = {
  TILE_LAYER:
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  ATTRIBUTION:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: icon,
  iconSize: [35, 40],
  iconAnchor: [17.5, 40],
});

function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = leaflet.map(mapRef.current).setView([55.7522, 52], 5);

    leaflet
      .tileLayer(MapConfig.TILE_LAYER, {
        attribution: MapConfig.ATTRIBUTION,
      })
      .addTo(map);

    const markers = leaflet.layerGroup();

    markers.addTo(map);

    CITIES.forEach(({ lat, lng }) => {
      leaflet
        .marker(
          {
            lat,
            lng,
          },
          {
            icon: defaultCustomIcon,
          },
        )
        .addTo(markers);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className={styles.wrapper} id="map">
      <div className={styles.inner}>
        <h2 className={styles.title}>Отделения Лига Банка</h2>
        <div className={styles.map} ref={mapRef} />
      </div>
    </div>
  );
}

export { Map };
