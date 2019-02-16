import React from "react";
import { graphql, StaticQuery } from "gatsby";

import Layout from "../components/layout";

const getBlogData = graphql`
  {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
          }
          excerpt
        }
      }
    }
  }
`;

export default () => (
  <Layout>
    <h1 style={{ borderBottom: "1px solid" }}>Tees Blog</h1>

    <StaticQuery
      query={getBlogData}
      render={data => (
        <>
          <h4>{data.allMarkdownRemark.totalCount} Posts.</h4>

          {data.allMarkdownRemark.edges.map(({ node }) => (
            <div key={node.id}>
              <h3>{node.frontmatter.title}</h3>
              <span>{node.frontmatter.date}</span>
              <p>{node.excerpt}</p>
            </div>
          ))}
        </>
      )}
    />
  </Layout>
);
