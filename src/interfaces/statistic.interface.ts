export interface IStatisticData {
  mId: number;
  mCondition: {
    icon: string;
    text: string;
  };
  mTemperature: number;
  mFFMC: number;
  mBUI: number;
  mFWI: number;
  mISI: number;
  mHumidity: number;
  mWindSpeed: number;
  mRainfall: number;
  mFireRisk?: number;
  mCreatedAt: Date;
}