export interface DailyMix {
  date: string;
  averageMix: Record<string, number>;
  cleanEnergyPercentage: number;
}

export interface OptimalWindow {
  startTime: string;
  endTime: string;
  averageCleanEnergyPercentage: number;
}
