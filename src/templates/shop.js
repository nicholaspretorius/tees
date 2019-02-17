import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";

export default ({ data, pageContext }) => {
  return (
    <Layout>
      <h1>Shop</h1>
      <h4>
        {data.allContentfulProducts.totalCount === 1 ? "Product" : "Products"}.
      </h4>
      {data.allContentfulProducts.edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={`products/${node.slug}`}>
            <h3>{node.name}</h3>
          </Link>
          <h4>R{node.price}</h4>
          <img src={node.image.fluid.src} alt={node.name} />
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
