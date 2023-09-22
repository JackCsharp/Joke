import JokePage from "../Pages/JokePage";
import AboutPage from "../Pages/AboutPage";
import ErrorPage from "../Pages/ErrorPage";
import AuthPage from "../Pages/AuthPage";
import RegisterPage from "../Pages/RegisterPage";
import ProfilePage from "../Pages/ProfilePage";
import HomePage from "../Pages/HomePage";
import JokeDetailsPage from "../Pages/JokeDetailsPage";
import GuildPage from "../Pages/GuildPage";
import GuildDetailsPage from "../Pages/GuildDetailsPage";

export const publicroutes = [
  { path: "/register", element: <RegisterPage />, exact: true },
  { path: "/home", element: <HomePage />, exact: true },
  { path: "*", element: <AuthPage />, exact: true },
];

export const privateroutes = [
  { path: "/about", element: <AboutPage />, exact: true },
  { path: "/register", element: <RegisterPage />, exact: true },
  { path: "/auth", element: <AuthPage />, exact: true },
  { path: "/jokes", element: <JokePage />, exact: true },
  { path: "/joke/:id", element: <JokeDetailsPage />, exact: true },
  { path: "/guilds", element: <GuildPage />, exact: true },
  { path: "/guild/:id", element: <GuildDetailsPage />, exact: true },
  { path: "/home", element: <HomePage />, exact: true },
  { path: "/profile", element: <ProfilePage />, exact: true },
  { path: "*", element: <ErrorPage />, exact: true },

  //   <Route path="/about" element={<AboutPage />} />
  //   <Route path="/" element={<MainPage />} />
  //   <Route path="*" element={<ErrorPage />} />
  //   <Route path="auth" element={<AuthPage />} />
  //   <Route path="register" element={<RegisterPage />} />
];
