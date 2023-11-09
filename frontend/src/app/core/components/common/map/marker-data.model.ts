import { LatLngExpression } from "leaflet";

export interface MarkerData {
  latLng: LatLngExpression;
  title: string;
  description: string;
}
