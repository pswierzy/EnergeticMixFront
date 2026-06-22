import React from "react";
import { useDailyMix } from "./hooks/useEnergyData";
import { MixCharts } from "./components/MixCharts";
import { WindowCalculator } from "./components/WindowCalculator";

const App: React.FC = () => {
  // Pobieramy dane dotyczące miksu energetycznego z backendu
  const { data, loading, error } = useDailyMix();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-6">Energia w UK</h1>

      {loading && <p className="text-center">Ładowanie danych...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && data.length > 0 && <MixCharts data={data} />}

      <WindowCalculator />
    </div>
  );
};

export default App;
