import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Youth, Children, GeneralMinistry } from "./Components/MINISTRIES";
import {
  Error,
  Register,
  Landing,
  Home,
  About,
  New,
  Ministries,
  Media,
  Contact,
  Resources,
  SinglePost,
  OurBeliefs,
  OurHistory,
  AllThePosts,
  AddReview,
} from "./pages";

import {
  AddBulleting,
  AddElder,
  AddEvent,
  AddHealth,
  AddImages,
  AddLeader,
  AddPastor,
  AddPost,
  AddWorker,
  AllEvents,
  AllHealth,
  AllPost,
  EditEvent,
  EditPost,
  Profile,
  ProtectedRoute,
  Request,
  SharedLayout,
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Request />} />
          <Route path="all-posts" element={<AllPost />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="edit-post/:postId" element={<EditPost />} />
          <Route path="all-events" element={<AllEvents />} />
          <Route path="add-event" element={<AddEvent />} />
          <Route path="edit-event/:eventId" element={<EditEvent />} />
          <Route path="all-health" element={<AllHealth />} />
          <Route path="add-health" element={<AddHealth />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-bulleting" element={<AddBulleting />} />
          <Route path="add-images" element={<AddImages />} />
          <Route path="add-position" element={<AddLeader />} />
          <Route path="add-worker" element={<AddWorker />} />
          <Route path="add-pastor" element={<AddPastor />} />
          <Route path="add-elder" element={<AddElder />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/about/our-beliefs" element={<OurBeliefs />} />
        <Route path="about/our-history" element={<OurHistory />} />

        <Route path="/ministries" element={<Ministries />} />
        <Route path="/ministries/youth" element={<Youth />} />
        <Route path="/ministries/children" element={<Children />} />

        {/* <Route path="/ministries" element={<Ministries />} />
        <Route path="/ministries/youth" element={<Youth />} />
        <Route path="/ministries/children" element={<Children />} /> */}

        <Route path="/" exact element={<Home />} />
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/all-articles" element={<AllThePosts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/new" element={<New />} />
        <Route
          path="/ministries/communication"
          element={<GeneralMinistry title="COMMUNICATION" />}
        />
        <Route path="/media" element={<Media />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/add-review" element={<AddReview />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
