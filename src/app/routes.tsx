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
import { NoticiaPresentacionSIA } from "./pages/NoticiaPresentacionSIA";
import { NoticiaCongresoIngFisica } from "./pages/NoticiaCongresoIngFisica";
import { NoticiaSimposioMunich } from "./pages/NoticiaSimposioMunich";

export const router = createBrowserRouter(
  [
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
        { path: "noticias/presentacion-oficial-sia-2025", Component: NoticiaPresentacionSIA },
        { path: "noticias/viii-congreso-ingenieria-fisica-2025", Component: NoticiaCongresoIngFisica },
        { path: "noticias/v-simposio-actividades-espaciales-munich-2026", Component: NoticiaSimposioMunich },
        { path: "contacto", Component: ContactPage },
        { path: "hidrochallenge", Component: HidroChallengePage },
      ],
    },
  ]
);
