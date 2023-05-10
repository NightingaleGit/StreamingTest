import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./pages/Navbar";
import GraphsPage from "./pages/graphs/GraphsPage";
import FormulasPage from "./pages/formulas/FormulasPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      cacheTime: 5000,
    },
  },
});

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="flex-initial">
          <Navbar
            buttons={[
              { tittle: "Graphs", route: "/graphs" },
              { tittle: "Formulas", route: "/formulas" },
            ]}
          />
        </div>

        <Routes>
          <Route path="/formulas/*" element={<FormulasPage />} />
          <Route path="/graphs/*" element={<GraphsPage />} />
          <Route path="/" element={<GraphsPage />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("no container to render to");
}

const root = createRoot(container);
root.render(<App />);
