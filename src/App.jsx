import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import WeatherApp from "./WeatherApp";
import Loading from "./components/Loading";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<WeatherApp />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
