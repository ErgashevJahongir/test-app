import Layout from "./components/Layout";
import "./App.css";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import WeatherApp from "./WeatherApp";

function App() {
  return (
    <Suspense fallback={"Loading"}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<WeatherApp />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
