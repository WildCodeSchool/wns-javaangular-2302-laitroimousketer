import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import L, { Map, Control, DomUtil, ZoomAnimEvent , Layer, MapOptions, tileLayer, latLng } from 'leaflet';
import { MarkerData } from './marker-data.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Input() options: MapOptions= {
                      layers:[tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        opacity: 0.7,
                        maxZoom: 19,
                        detectRetina: true,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      })],
                      zoom:1,
                      center:latLng(0,0)
  };
  @Input() markersData: MarkerData[] = [];
  public map!: Map;
  public zoom!: number;

  constructor() { 
  }

  ngOnInit() {
    if (this.markersData.length > 0) {
      this.addMarkers();
    }
  }

  ngOnDestroy() {
    this.map.clearAllEventListeners;
    this.map.remove();
  };

  onMapReady(map: Map) {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);
  }

  onMapZoomEnd(e: ZoomAnimEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }

  addMarkers() {
    this.markersData.forEach(data => {
      L.marker(data.latLng).addTo(this.map)
        .bindPopup(`<b>${data.title}</b><br>${data.description}`);
    });
  }
}