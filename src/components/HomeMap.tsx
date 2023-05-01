import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api"
import { useStateStore } from "../store"
import { Spin } from "antd"

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

  if (!isLoaded) return <Spin tip="Loading" />

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
          onClick={() => setActiveForestIndex(index)}
          position={{ lat: forest.mCoordinates.lat, lng: forest.mCoordinates.lng }}
        />
      ))}
    </GoogleMap>
  )
}
