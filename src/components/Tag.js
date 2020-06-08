import React from "react";

class Tag extends React.Component {
  render() {
    return (
      <div className="col-md-4">
        <div className="panel panel-warning">
          <div className="panel-heading">Tag</div>
          <div className="panel-body">
            <form>
              <div className="form-group">
                <select id="lampselect" className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>Incandescent</option>
                  <option>Flourescent</option>
                  <option>Halogen</option>
                  <option>Sun</option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Tag;
