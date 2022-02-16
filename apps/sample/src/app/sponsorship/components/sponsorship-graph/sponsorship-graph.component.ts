import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5locales_fr_FR from "@amcharts/amcharts5/locales/fr_FR";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
@Component({
  selector: 'app-sponsorship-graph',
  templateUrl: './sponsorship-graph.component.html',
  styleUrls: ['./sponsorship-graph.component.scss']
})
export class SponsorshipGraphComponent implements OnInit {

  isBrowser = isPlatformBrowser(this.platformId);
  @Input() data;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) { }

  ngOnInit(): void {
    // this.data.forEach((item) => {
    //   const date = new Date(item.date);
    //   date.toLocaleString('fr-FR');
    //   console.log(date);
    //   item.date = date;
    // });
    this.createSeries('timeline', 'value')

  }

  // Create series
  createSeries(name, field) {
    let root = am5.Root.new("graph-france");
    root.locale = am5locales_fr_FR;
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
        layout: root.verticalLayout,
        maxTooltipDistance: 0
      })
    );

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {})
      })
    );

    xAxis.get("dateFormats")["day"] = "dd/MM";
    xAxis.get("periodChangeDateFormats")["day"] = "MMMM";

    var series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: field,
        valueXField: "date",
        fill: am5.color(0x000091),
        stroke: am5.color(0x000091),
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: series.get("fill")
        })
      });
    });

    series.strokes.template.set("strokeWidth", 2);

    series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}")

    series.data.setAll(this.data);
    xAxis.set("tooltip", am5.Tooltip.new(root, {
      themeTags: ["axis"]
    }));

    chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomXY",
      xAxis: xAxis
    }));
  }

}
