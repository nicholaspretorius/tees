import React from "react";

import { graphql, Link } from "gatsby";
import Img from "gatsby-image";

import Layout from "./../components/layout";

const productTemplate = ({ data, location }) => {
  const { contentfulProducts: product } = data;
  return (
    <Layout>
      <h1>{product.name}</h1>
      <h4>Price: R{product.price}</h4>
      <button
        style={{
          background: "darkorange",
          color: "white",
          padding: "0.3em",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        className="snipcart-add-item"
        data-item-id={product.id}
        data-item-price={product.price}
        data-item-image={product.image.file.url}
        data-item-name={product.name}
        data-item-url={location.pathname}
      >
        Add to Cart
      </button>
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
      slug
      createdAt(formatString: "MMMM Do, YYYY, h:mm:ss a")
      image {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid
        }
        file {
          url
        }
      }
    }
  }
`;

export default productTemplate;
