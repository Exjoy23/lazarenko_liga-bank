import React, { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import styles from './map.module.scss';
import 'leaflet/dist/leaflet.css';
import icon from '../../../assets/img/location.svg';

const CITIES = [
  { lat: 55.7522, lng: 37.6156 },
  { lat: 55.7887, lng: 49.1221 },
  { lat: 51.5406, lng: 46.0086 },
  { lat: 57.1522, lng: 65.5272 },
  { lat: 54.9924, lng: 73.3686 },
];
const DEFAULT_COORD_LAT = 55.7522;
const DEFAULT_COORD_LNG = 52;
const DEFAULT_ZOOM = 5;
const TILE_LAYER_URL =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const MAP_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
const ICON_SIZE_X = 35;
const ICON_SIZE_Y = 40;

const defaultCustomIcon = leaflet.icon({
  iconUrl: icon,
  iconSize: [ICON_SIZE_X, ICON_SIZE_Y],
  iconAnchor: [ICON_SIZE_X / 2, ICON_SIZE_Y],
});

function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = leaflet
      .map(mapRef.current)
      .setView([DEFAULT_COORD_LAT, DEFAULT_COORD_LNG], DEFAULT_ZOOM);

    leaflet
      .tileLayer(TILE_LAYER_URL, {
        attribution: MAP_ATTRIBUTION,
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
    <section className={styles.wrapper} id="map">
      <div className={styles.inner}>
        <h2 className={styles.title}>Отделения Лига Банка</h2>
        <div className={styles.map} ref={mapRef} />
      </div>
    </section>
  );
}

export { Map };
