export interface IStatisticData {
  mId: number;
  mCondition: {
    icon: string;
    text: string;
  };
  mTemperature: number;
  mFFMC: number;
  mDMC: number;
  mDC: number;
  mISI: number;
  mHumidity: number;
  mWindSpeed: number;
  mRainfall: number;
  mCreatedAt: Date;
}