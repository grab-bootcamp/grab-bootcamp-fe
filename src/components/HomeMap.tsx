import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api"
import { useStateStore } from "../store"
import { nanoid } from "nanoid"
import { Skeleton } from "antd"
import { useCallback } from "react"

export const HomeMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  const { forests, activeForestIndex, setActiveForestIndex } = useStateStore(state => ({
    forests: state.forests,
    activeForestIndex: state.activeForestIndex,
    setActiveForestIndex: state.setActiveForestIndex
  }))

  const onMarkerClick = useCallback((index: number | null) => {
    if (index === null || forests[index]) {
      setActiveForestIndex(index)
    }
  }, [setActiveForestIndex])

  if (!isLoaded) return <Skeleton.Image active className="w-full h-full" />

  return (
    <GoogleMap
      id="list-forest-map"
      zoom={2}
      center={{ lat: 0, lng: 0 }}
      mapContainerClassName="grab-google-map"
    >
      {activeForestIndex !== null && (
        <InfoWindowF
          onCloseClick={() => setActiveForestIndex(null)}
          position={{ lat: forests[activeForestIndex].mCoordinates.lat, lng: forests[activeForestIndex].mCoordinates.lng }}
        >
          <div>
            <h1>{forests[activeForestIndex].mName}</h1>
            <p>({forests[activeForestIndex].mCoordinates.lat},{forests[activeForestIndex].mCoordinates.lng})</p>
          </div>
        </InfoWindowF>)}
      {forests.map((forest, index) => (
        <MarkerF
          key={nanoid()}
          onClick={() => onMarkerClick(index)}
          position={{ lat: forest.mCoordinates.lat, lng: forest.mCoordinates.lng }}
        />
      ))}
    </GoogleMap>
  )
}
