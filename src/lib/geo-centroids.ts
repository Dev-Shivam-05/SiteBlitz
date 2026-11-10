/* Approximate coordinates for the admin Live globe (spec v4 row 13). Visitors are stored with a country code and
   a city name only (no coordinates are collected), so a dot is placed at the city when it is in this table and at
   the country's rough centre otherwise. Visual placement only, accurate to a few tens of kilometres. */

export const COUNTRY_CENTROIDS: Record<string, [number, number]> = {
  IN: [22.0, 79.0], US: [39.8, -98.6], GB: [54.0, -2.0], CA: [56.0, -106.0], AU: [-25.3, 133.8],
  AE: [24.0, 54.0], SG: [1.35, 103.82], DE: [51.2, 10.4], FR: [46.6, 2.4], NL: [52.2, 5.3],
  IE: [53.4, -8.2], SA: [24.0, 45.0], QA: [25.3, 51.2], KW: [29.3, 47.6], OM: [21.0, 57.0],
  BH: [26.0, 50.55], NP: [28.4, 84.1], BD: [23.7, 90.4], LK: [7.9, 80.8], PK: [30.4, 69.3],
  CN: [35.9, 104.2], JP: [36.2, 138.3], KR: [36.5, 127.9], ID: [-2.5, 118.0], MY: [4.2, 102.0],
  TH: [15.9, 100.9], VN: [14.1, 108.3], PH: [12.9, 121.8], HK: [22.3, 114.2], TW: [23.7, 121.0],
  NZ: [-41.0, 174.0], ZA: [-30.6, 22.9], NG: [9.1, 8.7], KE: [0.0, 38.0], EG: [26.8, 30.8],
  BR: [-14.2, -51.9], MX: [23.6, -102.6], AR: [-38.4, -63.6], CO: [4.6, -74.3], CL: [-35.7, -71.5],
  PE: [-9.2, -75.0], ES: [40.5, -3.7], IT: [41.9, 12.6], PT: [39.4, -8.2], SE: [60.1, 18.6],
  NO: [60.5, 8.5], FI: [61.9, 25.7], DK: [56.3, 9.5], PL: [51.9, 19.1], CH: [46.8, 8.2],
  AT: [47.5, 14.6], BE: [50.5, 4.5], CZ: [49.8, 15.5], RO: [45.9, 25.0], GR: [39.1, 21.8],
  HU: [47.2, 19.5], RU: [61.5, 105.3], UA: [48.4, 31.2], TR: [39.0, 35.2], IL: [31.0, 34.9],
  IR: [32.4, 53.7], IQ: [33.2, 43.7], AF: [33.9, 67.7], MM: [21.9, 96.0], KH: [12.6, 105.0],
};

/** Keys are lower-case city names as visitors' geo headers spell them. */
export const CITY_COORDS: Record<string, [number, number]> = {
  ahmedabad: [23.02, 72.57], surat: [21.17, 72.83], vadodara: [22.31, 73.18], rajkot: [22.3, 70.8],
  navsari: [20.95, 72.92], valsad: [20.61, 72.93], bharuch: [21.71, 72.98], gandhinagar: [23.22, 72.65],
  bhavnagar: [21.76, 72.15], jamnagar: [22.47, 70.06], anand: [22.56, 72.95], junagadh: [21.52, 70.46],
  vapi: [20.37, 72.9], silvassa: [20.27, 73.01], daman: [20.42, 72.83], mumbai: [19.08, 72.88],
  thane: [19.22, 72.98], pune: [18.52, 73.86], nashik: [20.0, 73.79], nagpur: [21.15, 79.09],
  delhi: [28.61, 77.21], "new delhi": [28.61, 77.21], noida: [28.54, 77.39], gurgaon: [28.46, 77.03],
  gurugram: [28.46, 77.03], bengaluru: [12.97, 77.59], bangalore: [12.97, 77.59], mysuru: [12.3, 76.64],
  mysore: [12.3, 76.64], hyderabad: [17.39, 78.49], chennai: [13.08, 80.27], coimbatore: [11.02, 76.96],
  kochi: [9.93, 76.27], kolkata: [22.57, 88.36], jaipur: [26.91, 75.79], jodhpur: [26.24, 73.02],
  udaipur: [24.59, 73.71], lucknow: [26.85, 80.95], kanpur: [26.45, 80.33], indore: [22.72, 75.86],
  bhopal: [23.26, 77.41], patna: [25.59, 85.14], chandigarh: [30.73, 76.78], ludhiana: [30.9, 75.86],
  visakhapatnam: [17.69, 83.22], panaji: [15.49, 73.83], dubai: [25.2, 55.27], london: [51.51, -0.13],
  "new york": [40.71, -74.01], singapore: [1.35, 103.82], toronto: [43.65, -79.38], sydney: [-33.87, 151.21],
  "san francisco": [37.77, -122.42],
};

export function locate(city?: string, countryCode?: string): [number, number] | null {
  const c = city?.trim().toLowerCase();
  if (c && CITY_COORDS[c]) return CITY_COORDS[c];
  const k = countryCode?.trim().toUpperCase();
  return (k && COUNTRY_CENTROIDS[k]) || null;
}
