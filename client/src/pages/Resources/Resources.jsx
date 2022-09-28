import { PageHero } from "../../Components/GLOBAL";
import {
  BiblePromise,
  Footer,
  SabbathPodcast,
  Resource,
  LatestResource,
} from "../../Components/RESOURCES";
import { Navigation } from "../../Components/Navigation";
export const Resources = () => (
  <>
    <Navigation />
    <PageHero title="RESOURCES" />
    <BiblePromise />
    <SabbathPodcast />
    <Resource />
    <LatestResource />
    <Footer />
  </>
);
