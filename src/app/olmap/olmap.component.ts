import { Component, Input, AfterViewInit, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import olMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import WebGLPointsLayer from 'ol/layer/WebGLPoints';
import { LiteralStyle, SymbolType } from 'ol/style/LiteralStyle';
import { Feature } from 'ol';
import { fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';

// build flat Map
const flatMap = (fn, arr: any[]): any[] => [].concat.apply([], arr.map(fn));

@Component({
  selector: 'app-map',
  templateUrl: './olmap.component.html',
  styleUrls: ['./olmap.component.scss']
})

export class OlMapComponent implements AfterViewInit, OnChanges {

  @ViewChild('map') map: ElementRef<HTMLElement>;
  @Input() data: any[];
  @Input() options: {radiusMarkerKey?: string, center?: number[], zoom?: number};
  @Output() action: EventEmitter<{type: string; payload: any}> = new EventEmitter();
  olMap: olMap;
  markersLayer: any;


  ngOnChanges(changes: SimpleChanges) {
    // only handle change for options
    if (!changes.options || changes.options.firstChange) return;
    this.updateDataMarkers();
  }

  ngAfterViewInit() {
    // init DOM
    setTimeout(() => {
      this.init();
    }, 1000);
  }

  init() {
    const center = fromLonLat(
      this.options.center || [15.322222, -4.325 ]
    );
    this.buildMarkersLayer();
    // build map view
    const view = new View({
      center,
      zoom: this.options.zoom || 5.55,
    });
    // build map
    this.olMap = new olMap({
      view,
      target: this.map.nativeElement,
      controls: [], // add custom controls deh
      layers: [
        // global layer map
        new TileLayer({
          source: new XYZ({
            urls: [
              'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
              'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
              'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            ],
            crossOrigin: 'anonymous',
          }),
        }),
        // markers leyer
        this.markersLayer,
      ],
    });
    // handle event click
    this._addClickEvent();
    // add markers
    this.addFeatures();
  }

  addFeatures() {
    const features = flatMap(x => x.value , this.data || [])
    .map(item => {
      if (!item) return;
      // get position form lat long
      const coords = fromLonLat([
        item.long || item.Long || item.Long_, // use multiple posibilities
        item.lat || item.Lat // use multiple posibilities
      ]);
      if (isNaN(coords[0]) || isNaN(coords[1])) {
        // guard against bad data
        return;
      }
      // build new feature to add with item data
      return new Feature({
        type: 'geoMarker', // add type to identify event
        geometry: new Point(coords),
        ...item
      });
    })
    // exclude undefined
    .filter(Boolean);
    // console.log(features);
    // add all markers to layer source
    this.markersLayer.getSource().addFeatures(features);
  }

  buildMarkersLayer() {
    // build layer Style for marker
    const layerStyle: LiteralStyle = {
      symbol: {
        symbolType: SymbolType.CIRCLE,
        size: ['interpolate', ['linear'], ['get', this.options.radiusMarkerKey], 100, 4, 100000, 80],
        color: 'red',
        rotateWithView: false,
        opacity: [
          'interpolate',
          ['linear'],
          ['get', this.options.radiusMarkerKey ],
          100, 0.5, 100000, 0.75
        ]
      },
    };
    // build layer vector for markers
    this.markersLayer = new WebGLPointsLayer({
      title: 'WebGLPointsLayer',
      source: new VectorSource({
        attributions: 'USGS',
      }),
      style: layerStyle,
    } as any);
  }

  async updateDataMarkers() {
    // TODO: explore ol map doc to fiund better way to update
    // rempve marker layer
    this.olMap.removeLayer(this.markersLayer);
    // rebuild markers
    this.buildMarkersLayer();
    // add upadated data
    this.olMap.addLayer(this.markersLayer);
    // add updated data to layer
    this.addFeatures();
    // force render map
    this.olMap.render();
  }

  private _addClickEvent() {
    // handle map click event
    this.olMap.on('click', async (evt) => {
      // extract ft
      const feature = this.olMap.forEachFeatureAtPixel(evt.pixel, ft => ft);
      // if click on point
      if (!feature) return;
      const payload = feature.getProperties();
      if (!payload) return;
      console.log(payload);
      this.action.emit({
        type: payload.type,
        payload
      });
    });
  }
}
