import React from "react";
// import Raphael from "raphael";
// import 'morris.js/morris.js';
// import Morris from "morris.js/morris.js";
import CanvasJSReact from "../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// var data = [
//     { y: "2014", a: 50, b: 90 },
//     { y: "2015", a: 65, b: 75 },
//     { y: "2016", a: 50, b: 50 },
//     { y: "2017", a: 75, b: 60 },
//     { y: "2018", a: 80, b: 65 },
//     { y: "2019", a: 90, b: 70 },
//     { y: "2020", a: 100, b: 75 },
//     { y: "2021", a: 115, b: 75 },
//     { y: "2022", a: 120, b: 85 },
//     { y: "2023", a: 145, b: 85 },
//     { y: "2024", a: 160, b: 95 },
//   ],
//   config = {
//     data: data,
//     xkey: "y",
//     ykeys: ["a", "b"],
//     labels: ["Total Income", "Total Outcome"],
//     fillOpacity: 0.6,
//     hideHover: "auto",
//     behaveLikeLine: true,
//     resize: true,
//     pointFillColors: ["#ffffff"],
//     pointStrokeColors: ["black"],
//     lineColors: ["gray", "red"],
//   };
//
// config.element = "line-chart";
// Morris.Line(config);

class Spectrum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: null,
    };
    // window.Raphael = Raphael;
  }

  componentDidUpdate() {
    this.props.chart = this.state.chart;
  }

  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "Spectrum",
      },
      axisX: {},
      axisY: {
        includeZero: true,
      },
      data: [
        {
          type: "spline",
          dataPoints: this.props.SpectrumData,
        },
      ],
      exportEnabled: true,
    };

    return (
      <div className="col-md-8">
        <div className="panel panel-primary">
          <div className="panel-heading">Spectrum</div>
          <div className="panel-body">
            {/*<img
              id="SpecImage"
              src={this.props.croppedImageUrl}
              className="img-responsive"
              alt="spectrual line"
            />
            <div id="myfirstchart" style={{ height: "250px" }}></div>
            <canvas id="CanInvis" className="hidden"></canvas>*/}
            {this.props.SpectrumData && (
              <CanvasJSChart
                options={options}
                onRef={(ref) => this.setState({ ref })}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Spectrum;
