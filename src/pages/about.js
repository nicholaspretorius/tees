import React from "react";
import Layout from "../components/layout";
import { Link, graphql, StaticQuery } from "gatsby";

const getImageData = graphql`
  {
    allFile {
      totalCount
      edges {
        node {
          relativePath
          absolutePath
          extension
          size
        }
      }
    }
  }
`;

export default () => (
  <Layout>
    <h1>About</h1>

    <StaticQuery
      query={getImageData}
      render={data => (
        <table>
          <thead>
            <tr>
              <th>Relative Path</th>
              <th>Extension</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {data.allFile.edges.map(({ node }, index) => (
              <tr key={index}>
                <td>{node.relativePath}</td>
                <td>{node.extension}</td>
                <td>{node.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    />

    <Link to="/page-2">Page 2</Link>
  </Layout>
);
