import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientLayout from "./layout/ClientLayout";
import DetailMovie from "./pages/MovieDetail";
import { MessagesProvider } from "./contexts/MessagesContext";
import Home from "./pages/Home";
import Favorite from "./components/Favorite";
import { LoadingProvider } from "./contexts/LoadingContext";
import { FavoriteProvider } from "@contexts/FavoriteContext";
import SearchProvide from "@contexts/SearchContext";
import SearchResults from "@pages/SearchResults";

function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <MessagesProvider>
          <FavoriteProvider>
            <SearchProvide>
              <Routes>
                <Route path="/" element={<ClientLayout />}>
                  <Route index element={<Home />} />
                  <Route path="/favorite" element={<Favorite />} />
                  <Route
                    path="detail/:mediaType/:movieId"
                    element={<DetailMovie />}
                  />
                  <Route path="search" element={<SearchResults />} />
                </Route>
              </Routes>
            </SearchProvide>
          </FavoriteProvider>
        </MessagesProvider>
      </LoadingProvider>
    </BrowserRouter>
  );
}

export default App;
