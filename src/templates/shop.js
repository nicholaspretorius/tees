import React from "react";
import { graphql, Link } from "gatsby";
import netlifyIdentity from "netlify-identity-widget";

import Layout from "../components/layout";

class Products extends React.Component {
  state = {
    products: []
  };

  componentDidMount() {
    this.getProducts();
    netlifyIdentity.on("login", user => this.getProducts(user));
    netlifyIdentity.on("logout", () => this.getProducts());
  }

  getProducts = user => {
    console.log("Current user: ", user);

    const allProducts = this.props.data.allContentfulProducts.edges;

    const products =
      netlifyIdentity.currentUser() !== null
        ? allProducts
        : allProducts.filter(({ node: product }) => !product.private);

    this.setState({ products });
  };

  render() {
    const { products } = this.state;
    return (
      <Layout>
        <h1>Tees Shop.</h1>
        <h4>
          {products.totalCount}{" "}
          {products.totalCount === 1 ? " Product" : " Products"}.
        </h4>
        {products.map(({ node: product }) => (
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
  }
}

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

export default Products;
