/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const postTemplate = path.resolve("./src/templates/post.js");
const blogTemplate = path.resolve("./src/templates/blog.js");
const shopTemplate = path.resolve("./src/templates/shop.js");
const productTemplate = path.resolve("./src/templates/product.js");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "blog" });
    createNodeField({
      node,
      name: "slug",
      value: slug
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      allContentfulProducts {
        totalCount
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  const { createPage } = actions;
  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach(({ node: post }) => {
    createPage({
      path: `blog${post.fields.slug}`,
      component: postTemplate,
      context: {
        slug: post.fields.slug
      }
    });
  });

  const postsPerPage = 2;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: totalPages }).forEach((_, index) => {
    const currentPage = index + 1;
    const isFirstPage = index === 0;
    const isLastPage = currentPage === totalPages;

    createPage({
      path: isFirstPage ? "/blog" : `/blog/${currentPage}`,
      component: blogTemplate,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        isFirstPage,
        isLastPage,
        currentPage,
        totalPages
      }
    });
  });

  const products = result.data.allContentfulProducts.edges;
  const productsPerPage = 2;
  const totalProducts = Math.ceil(products.length / productsPerPage);
  products.forEach(({ node: product }, index) => {
    const currentProductPage = index + 1;
    const isFirstProductPage = index === 0;
    const isLastProductPage = currentProductPage === totalProducts;

    createPage({
      path: isFirstProductPage
        ? "/products"
        : `/products/${currentProductPage}`,
      component: shopTemplate,
      context: {
        limit: productsPerPage,
        skip: index * productsPerPage,
        isFirstProductPage,
        isLastProductPage,
        totalProducts
      }
    });
  });

  products.forEach(({ node: product }) => {
    createPage({
      path: `products/${product.slug}`,
      component: productTemplate,
      context: {
        slug: product.slug
      }
    });
  });
};
