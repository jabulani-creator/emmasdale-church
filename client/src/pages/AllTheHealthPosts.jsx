import React from "react";
import { HealthSearchContainer, PublicHealthContainer } from "../Components";
import { Footer } from "../Components/GLOBAL";
import { Navigation } from "../Components/Navigation";

const AllTheHealthPosts = () => (
  <>
    <Navigation />
    <section className="section">
      <HealthSearchContainer />
      <PublicHealthContainer />
    </section>
    <Footer />
  </>
);

export default AllTheHealthPosts;
