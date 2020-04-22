import React from "react";

class Spectrum extends React.Component {
  render() {
    return (
      <div className="col-md-8">
        <div className="panel panel-primary">
          <div className="panel-heading">Spectrum</div>
          <div className="panel-body">
            <img id="SpecImage" src="" className="img-responsive" />
            <canvas id="CanInvis" className="hidden"></canvas>
          </div>
        </div>
      </div>
    );
  }
}

export default Spectrum;
