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

  posts.forEach((_, index, postsArr) => {
    const totalPages = postsArr.length;
    const postsPerPage = 1;
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
};
