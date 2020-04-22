import React from "react";

class Tag extends React.Component {
  render() {
    return (
      <div class="col-md-4">
        <div class="panel panel-warning">
          <div class="panel-heading">Tag</div>
          <div class="panel-body">
            <form role="form">
              <div class="form-group">
                <select id="lampselect" class="form-control">
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
