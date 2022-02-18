import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_franceDepartmentsHigh from '@amcharts/amcharts5-geodata/franceDepartmentsHigh';
import { IEntitySettings } from '@amcharts/amcharts5/.internal/core/util/Entity';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sponsorship-map',
  templateUrl: './sponsorship-map.component.html',
  styleUrls: ['./sponsorship-map.component.scss']
})
export class SponsorshipMapComponent implements OnInit {

  isBrowser = isPlatformBrowser(this.platformId);
  @Input() data;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) { }

  ngOnInit(): void {
    this.initMainMap();
  }

  private initMainMap(): void {
    let root = am5.Root.new("map-france");
    root.fps = 30;
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        projection: am5map.geoMercator()
      })
    );
    // Créer les polygones des départements
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_franceDepartmentsHigh,
        fill: am5.color(0XE5E5E5),
        stroke: am5.color(0xffffff),
      })
    );

    // Créer le template pour les circles
    let circleTemplate = am5.Template.new({
      tooltipText: "{name}: {value} parrainages"
    } as IEntitySettings);

    // Créer les cercles
    let pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        polygonIdField: "code",
        valueField: "value",
        calculateAggregates: true
      })
    );
    pointSeries.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 10,
          fill: am5.color(0x000091),
          opacity: 0.5,
          templateField: "circleTemplate"
        }, circleTemplate as am5.Template<am5.Circle>)
      });
    });

    // Créer la heatmap
    pointSeries.set("heatRules", [{
      target: circleTemplate,
      dataField: "value",
      min: 3,
      max: 30,
      key: "radius"
    }]);
    pointSeries.data.setAll(this.data);
  }



}
