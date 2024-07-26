import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientLayout from "./layout/ClientLayout";
import DetailMovie from "./components/Detail";
import { MessagesProvider } from "./contexts/MessagesContext";
import Home from "./pages/Home";
import Favorite from "./components/Favorite";
import { LoadingProvider } from "./contexts/LoadingContext";

function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <MessagesProvider>
          <Routes>
            <Route path="/" element={<ClientLayout />}>
              <Route index element={<Home />} />
              <Route path="/favorite" element={<Favorite />} />
            </Route>
            <Route
              path="detail/:mediaType/:movieId"
              element={<DetailMovie />}
            />
          </Routes>
        </MessagesProvider>
      </LoadingProvider>
    </BrowserRouter>
  );
}

export default App;
