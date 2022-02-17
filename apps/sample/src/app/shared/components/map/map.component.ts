import { DatePipe, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';

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

  constructor(@Inject(PLATFORM_ID) private readonly platformId: any, private datePipe: DatePipe) {
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
        this.initMap(48.864716, 2.349014, 10);
        return;
      }
      if (this.city) {
        if (this.places.length !== 1) {
          this.initMap(this.city.location.coordinates[1], this.city.location.coordinates[0], 13);
        } else {
          this.initMap(this.places[0].location.coordinates[1], this.places[0].location.coordinates[0], 16);
        }
        this.initAllPlacesMarker();
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

  initMarker(latitude: number, longitude: number): any {
    this.icon = {
      icon: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png',
        iconSize: [24, 36],
        iconAnchor: [12, 36],
        popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
      })
    };
    return L.marker([latitude, longitude], this.icon).addTo(this.map);
  }

  initAllPlacesMarker(): void {
    const fg = L.featureGroup().addTo(this.map);
    this.places.forEach((place) => {

      const marker = this.initMarker(place.location.coordinates[1], place.location.coordinates[0]);
      // let infos = `<div style="text-align: center; cursor: pointer; text-align: center; padding: 1em;font-size: 1.15em;">
      // <a  style="color: #000000;" onmouseover='this.style.textDecoration="underline"'
      // onmouseout='this.style.textDecoration="none"' href="controle-technique/${place.localisation.slug}/${place.slugName}" title="Contrôle technique ${place.name}">Contrôle technique ${place.name}</a>
      // <br>
      // </div>`;
      let infos = `<div style="text-align: center; cursor: pointer; text-align: center; padding: 1em;font-size: 1.15em;">${place.district} - ${place.candidate}
      <br>
      </div>`;
      // if (this.isSheet === true) {
      //   if (this.type === 'fuel') {
      //     infos = `<div style="text-align: center; cursor: pointer; text-align: center; padding: 0.5em;font-size: 1.15em;">
      //     Station essence ${place.name}
      //     </div>`;
      //   } else {
      //     infos = `<div style="text-align: center; cursor: pointer; text-align: center; padding: 0.5em;font-size: 1.15em;">
      //     Contrôle technique ${place.name}
      //     </div>`;
      //   }

      // }
      const popup = L.popup({}, marker).setContent(infos);
      marker.bindPopup(popup);
      marker.addTo(fg);
    });
    this.map.fitBounds(fg.getBounds());
  }

  initAllPlacesMarkerFuel(): void {
    const fg = L.featureGroup().addTo(this.map);
    this.places.forEach((place, i) => {

      const marker = this.initMarker(place.location.coordinates[1], place.location.coordinates[0]);
      let infos = `<div style="text-align: center; cursor: pointer; border: 1px solid blue;">
      ${place.name}
      <br>

      </div> `;
      if (this.isSheet === true) {
        const popup = L.popup({}, marker).setContent(infos);
        marker.bindPopup(popup, {autoClose:false}).openPopup();
      } else {
        const popup = L.popup({}, marker).setContent(infos);
        let paneCol = document.getElementsByClassName('leaflet-popup');
        for (let i = 0; i < paneCol.length; i++) {
          let paneToChange = paneCol[i] as HTMLElement;
          if (paneToChange && paneToChange.innerHTML.includes('green')) {
            paneToChange.style.zIndex = '99';
          }
        }
        if (i < 3) {
          marker.bindPopup(popup, {autoClose:false}).openPopup();
        } else {
          marker.bindPopup(popup, {autoClose:false});
        }

      }
      marker.addTo(fg);
    });
    this.map.fitBounds(fg.getBounds());
  }

  initMap(latitude: number, longitude: number, zoom: number): void {
    let latitudePos = 0;
    let longitudePos = 0;

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
