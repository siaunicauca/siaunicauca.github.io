import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ResearchPage } from "./pages/ResearchPage";
import { PublicationsPage } from "./pages/PublicationsPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { TeamPage } from "./pages/TeamPage";
import { NewsPage } from "./pages/NewsPage";
import { ContactPage } from "./pages/ContactPage";
import { HidroChallengePage } from "./pages/HidroChallengePage";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "investigacion", Component: ResearchPage },
      { path: "publicaciones", Component: PublicationsPage },
      { path: "proyectos", Component: ProjectsPage },
      { path: "equipo", Component: TeamPage },
      { path: "noticias", Component: NewsPage },
      { path: "contacto", Component: ContactPage },
      { path: "hidrochallenge", Component: HidroChallengePage },
    ],
  },
]);
