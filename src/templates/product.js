import React from "react";

import { graphql, Link } from "gatsby";

import Layout from "./../components/layout";

export default ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <h1>Hello: {data}</h1>
    </Layout>
  );
};
