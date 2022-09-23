import React from "react";
import { PostsContainerPublic, SearchContainer } from "../Components";
import { Footer } from "../Components/GLOBAL";
import { Navigation } from "../Components/Navigation";

const allThePosts = () => (
  <>
    <Navigation />
    <section className="section">
      <SearchContainer />
      <PostsContainerPublic />
    </section>
    <Footer />
  </>
);

export default allThePosts;
