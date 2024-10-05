import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import SignInPage from "./Pages/signInPage";
import SignUpPage from "./Pages/signup";
import RecipesPage from "./Pages/dashboard";
import RecipeDetailPage from "./Pages/recipe-detail";
import PublishRecipePage from "./Pages/publish-recepie";
import ProfilePage from "./Pages/profile";
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />, // Home page at the root path
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/home",
    element: <RecipesPage />,
  },
  {
    path: "/recipe/:recipeId",
    element: <RecipeDetailPage />,
  },
  {
    path: "/publish",
    element: <PublishRecipePage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);

export default appRouter;
