import { DatePipe, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { CANDIDATES_COLORS, CANDIDATES_FRONT } from '../../../sponsorship/containers/sponsorship-candidate/candidates.constants';

declare const L: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() city; // Ville pour le zoom
  @Input() places; // Lieux pour le zoom
  @Input() isSheet; // Pour enlever les liens
  @Input() id; // Id de la map
  @Input() type; // Modification des liens sur la map
  @Output() readonly selectedPlaceEvent: EventEmitter<string> = new EventEmitter<string>(true);
  @Input() tiles; // Fond de carte

  selectedPlace: any;
  isBrowser = isPlatformBrowser(this.platformId);
  map: any;
  icon: any;
  iconCurrentPosition: any;
  tilesTypes = {
    'classic': 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
    'default': 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    'human': 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
  }

  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {
  }

  ngOnInit(): void {
    if (this.tiles) {
      this.tiles = this.tilesTypes[this.tiles];
    }

  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      if (!L) {
        return;
      }
      if (!this.city) {
        this.initMap(10, 48.864716, 2.349014);
        return;
      }
      if (this.city) {
        if (this.places.length === 0) {
          this.initMap(8, this.city.lat, this.city.lon);
        } else {
          this.initMap(16, this.places[0].location.coordinates[1], this.places[0].location.coordinates[0]);
          this.initAllPlacesMarker();
        }
      }
    }
  }

  initMarkerCurrentPosition(latitude: number, longitude: number): any {
    this.iconCurrentPosition = {
      icon: L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    };
    return L.marker([latitude, longitude], this.iconCurrentPosition).addTo(this.map);
  }

  initMarker(latitude: number, longitude: number, color: string): any {
    this.icon = {
      icon: L.divIcon({
        className: 'map-marker marker-color-gray a-class',
        iconSize: [38, 38],
        html:`<span style="color: ${color}" class="fa-solid fa-circle">circle</span>`
      })
    };
    return L.marker([latitude, longitude], this.icon).addTo(this.map);
  }

  initAllPlacesMarker(): void {
    const fg = L.featureGroup().addTo(this.map);
    this.places.forEach((place,) => {
      if (place.location) {
        const marker = this.initMarker(place.location.coordinates[1], place.location.coordinates[0], CANDIDATES_COLORS[place.candidate]);
        let infos = `<div style="text-align: center; cursor: pointer; text-align: center; padding: 1em;font-size: 1.15em;">${place.district} - <span style="font-weight: bold;">${place.candidate}</span>
        <br>
        </div>`;
        const popup = L.popup({}, marker).setContent(infos);
        marker.bindPopup(popup);
        marker.addTo(fg);
      }

    });
    this.map.fitBounds(fg.getBounds());
  }

  selectColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
  }

  initMap(zoom: number, latitude?: number, longitude?: number): void {
    let latitudePos = 46.232193;
    let longitudePos = 2.209667;

    if (latitude && longitude) {
      latitudePos = latitude;
      longitudePos = longitude;
    }
    if (L) {
      this.map = L.map(this.id, {
        center: [latitudePos, longitudePos],
        gestureHandling: true,
        zoom: zoom
      });
      const tiles = L.tileLayer(this.tiles, {
        maxZoom: 16,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      tiles.addTo(this.map);
    }
  }



}
