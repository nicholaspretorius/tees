import React from "react";

import { graphql, Link } from "gatsby";
import Img from "gatsby-image";

import Layout from "./../components/layout";

export default ({ data }) => {
  const { contentfulProducts: product } = data;
  return (
    <Layout>
      <h1>{product.name}</h1>
      <h4>Price: R{product.price}</h4>
      <button className="snipcart-add-item">Add to Cart</button>
      <p>{product.createdAt}</p>
      <p>{product.description}</p>
      <Img fluid={product.image.fluid} />
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
      createdAt(formatString: "MMMM Do, YYYY, h:mm:ss a")
      image {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`;
