import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"
import { useStateStore } from "../store"
import { nanoid } from "nanoid"
import { Skeleton } from "antd"
import { useCallback, useState } from "react"
import { HomeMapInfoWindow } from "./HomeMapInfoWindow"

export const HomeMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  const {
    center,
    zoom,
    forests,
    activeForestIndex,
    setActiveForestIndex
  } = useStateStore(state => ({
    center: state.center,
    zoom: state.zoom,
    forests: state.forests,
    activeForestIndex: state.activeForestIndex,
    setActiveForestIndex: state.setActiveForestIndex
  }))

  const [_, setMap] = useState<google.maps.Map | null>(null)

  const onMarkerClick = useCallback((index: number | null) => {
    if (index === null || forests[index]) {
      setActiveForestIndex(index)
    }
  }, [setActiveForestIndex])

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  if (!isLoaded) return <Skeleton.Image active className="w-full h-full" />

  return (
    <GoogleMap
      id="list-forest-map"
      zoom={zoom}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
      mapContainerClassName="grab-google-map"
    >
      {activeForestIndex !== null && (
        <HomeMapInfoWindow
          forest={forests[activeForestIndex]}
          onCloseClick={() => setActiveForestIndex(null)}
        />
      )}
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
