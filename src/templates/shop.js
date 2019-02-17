import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";

export default ({ data, pageContext }) => {
  return (
    <Layout>
      <h1>Tees Shop.</h1>
      <h4>
        {data.allContentfulProducts.totalCount}{" "}
        {data.allContentfulProducts.totalCount === 1 ? " Product" : " Products"}
        .
      </h4>
      {data.allContentfulProducts.edges.map(({ node: product }) => (
        <div key={product.id}>
          <Link
            to={`products/${product.slug}`}
            style={{ textDecoration: "none", color: "darkpurple" }}
          >
            <h3>{product.name}</h3>
          </Link>
          <h4 style={{ fontSize: "1.2rem", fontWeight: 300, color: "#f60" }}>
            R{product.price}
          </h4>
          <img src={product.image.fluid.src} alt={product.name} />
        </div>
      ))}
    </Layout>
  );
};

export const query = graphql`
  {
    allContentfulProducts {
      totalCount
      edges {
        node {
          id
          name
          description
          price
          slug
          private
          image {
            fluid {
              src
            }
          }
        }
      }
    }
  }
`;

// ...GatsbyContentfulFluid_tracedSVG
