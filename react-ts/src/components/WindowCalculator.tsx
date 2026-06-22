import React, { useState } from "react";
import { useOptimalWindow } from "../hooks/useEnergyData";

export const WindowCalculator: React.FC = () => {
  const [hours, setHours] = useState<number>(3);
  const { data: result, loading, error, fetchWindow } = useOptimalWindow();

  const handleCalculate = () => {
    if (hours < 1 || hours > 6) {
      return;
    }
    fetchWindow(hours);
  };

  // Konwertujemy ISO timestamp na czytelny format (TZ-aware)
  const formatDateTime = (isoString: string): string => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="p-6 border rounded shadow-sm bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Kalkulator okna ładowania</h2>
      <div className="flex items-center gap-4 mb-6">
        <label className="font-medium" htmlFor="hours-input">
          Czas ładowania (1-6h):
        </label>
        <input
          id="hours-input"
          type="number"
          min="1"
          max="6"
          value={hours}
          onChange={(e) => setHours(Math.max(1, Math.min(6, Number(e.target.value) || 1)))}
          className="border p-2 rounded w-20"
        />
        <button
          onClick={handleCalculate}
          disabled={loading || hours < 1 || hours > 6}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Obliczanie..." : "Oblicz"}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {result && (
        <div className="bg-white p-4 rounded border border-green-200">
          <p className="mb-2">
            <strong>Początek:</strong> {formatDateTime(result.startTime)}
          </p>
          <p className="mb-2">
            <strong>Koniec:</strong> {formatDateTime(result.endTime)}
          </p>
          <p>
            <strong>Średni udział czystej energii:</strong>{" "}
            <span className="text-green-600 font-bold">
              {result.averageCleanEnergyPercentage.toFixed(2)}%
            </span>
          </p>
        </div>
      )}
    </div>
  );
};
