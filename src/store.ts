import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IForest, ILatLng, INotification } from "./interfaces";

interface IState {
  center: ILatLng;
  setCenter: (newCenter: ILatLng) => void;
  resetCenter: () => void;

  zoom: number;
  setZoom: (newZoom: number) => void;
  resetZoom: () => void;

  resetMap: () => void;

  forests: IForest[];
  setForests: (forests: IForest[]) => void;
  activeForestIndex: number | null;
  setActiveForestIndex: (index: number | null) => void;
  setActiveForestIndexByForestId: (forestId: string) => void;

  notifications: INotification[];
  unSeenNotificationCount: number;
  clearUnSeenNotificationCount: () => void;
  prependNotifications: (newNotifications: INotification[]) => void;
  appendNotifications: (newNotifications: INotification[]) => void;
  clearNotifications: () => void;
}

const FOREST_ZOOM_VALUE = {
  DEFAULT: 2,
  ON_ACTIVE: 12 
};

const CENTER_VALUE = {
  DEFAULT: { lat: 0, lng: 0 }
}

export const useStateStore = create(
  devtools<IState>(
    (set) => ({
      center: { ...CENTER_VALUE.DEFAULT },
      setCenter: (newCenter) => set(state => ({ ...state, center: { ...newCenter } })),
      resetCenter: () => set(state => ({ ...state, center: { ...CENTER_VALUE.DEFAULT } })),

      zoom: FOREST_ZOOM_VALUE.DEFAULT,
      setZoom: (newZoom) => set(state => ({ ...state, zoom: newZoom })),
      resetZoom: () => set(state => ({ ...state, zoom: FOREST_ZOOM_VALUE.DEFAULT })),

      resetMap: () => set(state => ({
        ...state,
        center: { ...CENTER_VALUE.DEFAULT },
        zoom: FOREST_ZOOM_VALUE.DEFAULT,
        activeForestIndex: null
      })),

      forests: [],
      activeForestIndex: null,
      setForests: (newForests) => set(state => ({ ...state, forests: [...newForests] })),
      setActiveForestIndex: (newIndex) => set(state => {
        if (newIndex === null) {
          return { ...state, activeForestIndex: null }
        } else if (state.forests[newIndex]) {
          return {
            ...state,
            activeForestIndex: newIndex,
            center: {
              ...state.forests[newIndex].mCoordinates
            },
            zoom: FOREST_ZOOM_VALUE.ON_ACTIVE
          }
        } else {
          return state;
        }
      }),
      setActiveForestIndexByForestId: (forestId) => set(state => {
        const index = state.forests.findIndex(forest => forest.mId == forestId);
        if (index !== -1) {
          return {
            ...state, activeForestIndex: index, center: {
              ...state.forests[index].mCoordinates
            }, zoom: FOREST_ZOOM_VALUE.ON_ACTIVE
          }
        }
        return state;
      }),


      notifications: [],
      unSeenNotificationCount: 0,
      clearUnSeenNotificationCount: () => set(state => ({ ...state, unSeenNotificationCount: 0 })),
      clearNotifications: () => set(state => ({ ...state, notifications: [] })),
      prependNotifications: (newNotifications) => set(state => ({
        ...state,
        notifications: [...newNotifications, ...state.notifications],
        unSeenNotificationCount: state.unSeenNotificationCount + newNotifications.length
      })),
      appendNotifications: (newNotifications) => set(state => ({ ...state, notifications: [...state.notifications, ...newNotifications] })),
    }),
    { enabled: true },
  ),
);