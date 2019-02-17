import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";

export default ({ data, pageContext }) => {
  const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext;

  const nextPage = `/blog/${String(currentPage + 1)}`;
  const prevPage =
    currentPage - 1 === 1 ? `/blog` : `/blog/${String(currentPage - 1)}`;

  return (
    <Layout>
      <h1 style={{ borderBottom: "1px solid" }}>Tees Blog</h1>
      <h4>{data.allMarkdownRemark.totalCount} Posts.</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={`blog/${node.fields.slug}`}>
            <h3>{node.frontmatter.title}</h3>
          </Link>
          <span>{node.frontmatter.date}</span>
          <p>{node.excerpt}</p>
        </div>
      ))}

      {/* Pagination Links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          margin: "0 auto",
          maxWidth: 300
        }}
      >
        {!isFirstPage && <Link to={prevPage}>Previous</Link>}
        {Array.from({ length: totalPages }, (_, index) => (
          <Link key={index} to={`/blog/${index === 0 ? "" : index + 1}`}>
            {index + 1}
          </Link>
        ))}
        {!isLastPage && <Link to={nextPage}>Next</Link>}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
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
