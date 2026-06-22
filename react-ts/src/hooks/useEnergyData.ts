import { useState, useEffect } from "react";
import axios from "axios";
import type { DailyMix, OptimalWindow } from "../types";

// URL API pobierana z env zmiennej, fallback na localhost dla dev
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/energy";

export const useDailyMix = () => {
  const [data, setData] = useState<DailyMix[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<DailyMix[]>(`${API_BASE_URL}/mix`)
      .then((response) => setData(response.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Błąd pobierania danych"),
      )
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

export const useOptimalWindow = () => {
  const [data, setData] = useState<OptimalWindow | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWindow = async (hours: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<OptimalWindow>(
        `${API_BASE_URL}/optimal-window?hours=${hours}`,
      );
      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Błąd wyznaczania okna");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchWindow };
};
