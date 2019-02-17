import React from "react";

import { graphql, Link } from "gatsby";

import Layout from "./../components/layout";

export default ({ data }) => {
  const { contentfulProducts: product } = data;
  return (
    <Layout>
      <h1>{product.name}</h1>
      <h4>Price: R{product.price}</h4>
      <img src={product.image.fluid.src} alt={product.name} />
      <Link to="/products">Back to Shop</Link>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    contentfulProducts(slug: { eq: $slug }) {
      id
      name
      price
      description
      image {
        fluid {
          src
        }
      }
    }
  }
`;
