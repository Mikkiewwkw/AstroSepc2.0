import React from "react";
import { Link } from "react-router-dom";

class NavItem extends React.Component {
  render() {
    const { sectionName, sectionLink } = this.props;
    return (
      <li className="nav-item p-1">
        <Link to={sectionLink}>{sectionName}</Link>
      </li>
    );
  }
}

class Nav extends React.Component {
  render() {
    const left_title = (
      <li className="text-center">
        <Link to="/">
          <h1>AstroSpec2</h1>
        </Link>
      </li>
    );
    return (
      <nav className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
        <div className="sidebar-sticky">
          <div className="sidebar-inner">
            {/*<ul
              className="nav flex-column nav-pills nav-stacked"
              data-spy="affix"
              data-offset-top="205"
            >*/}
            <ul className="nav flex-column nav-pills nav-stacked">
              {/*<li className="text-center">
                <a href="../public/index.html">
                  <h1>AstroSpec2</h1>
                </a>
              </li>*/}
              {/*<NavItem
                sectionName="Dashboard"
                sectionLink="../public/index.html"
              />
              <NavItem
                sectionName="Images"
                sectionLink="../public/images.html"
              />
              <NavItem sectionName="Documents" />*/}
              {left_title}
              <NavItem sectionLink="/" sectionName="Dashboard" />
              <NavItem sectionLink="/images" sectionName="Images" />
              <NavItem sectionLink="/document" sectionName="Document" />
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
