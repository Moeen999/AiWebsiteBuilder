import { Routes, Route } from "react-router-dom";
import Pricing from "./pages/Pricing";
import Projects from "./pages/Projects";
import MyProjects from "./pages/MyProjects";
import Preview from "./pages/Preview";
import Community from "./pages/Community";
import View from "./pages/View";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/projects", element: <MyProjects /> },
  { path: "/projects/:projectId", element: <Projects /> },
  { path: "/preview/:projectId", element: <Preview /> },
  { path: "/preview/:projectId/:versionId", element: <Preview /> },
  { path: "/community", element: <Community /> },
  { path: "/view/:projectId", element: <View /> },
];

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
};

export default App;
