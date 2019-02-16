import React from "react";
import { graphql, StaticQuery, Link } from "gatsby";

import Layout from "../components/layout";

const getBlogData = graphql`
  {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
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
              <Link to={`posts/${node.fields.slug}`}>
                <h3>{node.frontmatter.title}</h3>
              </Link>
              <span>{node.frontmatter.date}</span>
              <p>{node.excerpt}</p>
            </div>
          ))}
        </>
      )}
    />
  </Layout>
);
