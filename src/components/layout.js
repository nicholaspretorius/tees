import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

import Header from "./header";
import "./layout.css";

const getSiteMetaData = graphql`
  {
    site {
      siteMetadata {
        title
        author
        createdAt
      }
    }
  }
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={getSiteMetaData}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0
          }}
        >
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}. Built by{" "}
            {data.site.siteMetadata.author}. Created in{" "}
            {data.site.siteMetadata.createdAt}
          </footer>
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
