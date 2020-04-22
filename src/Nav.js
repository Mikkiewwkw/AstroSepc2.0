import React from "react";
// import Scrollspy from "react-scrollspy";

class NavItem extends React.Component {
  render() {
    const { sectionName } = this.props;
    return (
      <li className="nav-item p-1">
        <a href="../public/index.html">
          <span className="title">{sectionName}</span>
        </a>
      </li>
    );
  }
}

class Nav extends React.Component {
  render() {
    return (
      <nav className="col-lg-2 col-md-2 col-sm-2 col-xs-2" role="navagation">
        <div className="sidebar-sticky">
          <div className="sidebar-inner">
            <ul
              className="nav flex-column nav-pills nav-stacked"
              data-spy="affix"
              data-offset-top="205"
            >
              <li className="text-center">
                <a href="../publicindex.html">
                  <h1>AstroSpec2</h1>
                </a>
              </li>
              <NavItem sectionName="Dashboard" />
              <NavItem sectionName="Images" />
              <NavItem sectionName="Documents" />
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
