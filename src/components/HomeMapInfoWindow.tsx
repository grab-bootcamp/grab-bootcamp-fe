import { Space } from "antd"
import { IForest } from "../interfaces"
import { InfoWindowF } from "@react-google-maps/api"

interface IHomeMapInfoWindow {
  forest: IForest;
  onCloseClick: () => void;
}

export const HomeMapInfoWindow = (props: IHomeMapInfoWindow) => {
  return (
    <InfoWindowF
      onCloseClick={props.onCloseClick}
      position={{ lat: props.forest.mCoordinates.lat, lng: props.forest.mCoordinates.lng }}
    >
      <Space className="w-96" align="start">
        <img className="w-32 h-24 object-contain" src={props.forest.mImage} />
        <div>
          <h4 className="text-lg font-bold">{props.forest.mName}</h4>
          <p>({props.forest.mCoordinates.lat},{props.forest.mCoordinates.lng})</p>
          <p>{props.forest.mDescription}</p>
        </div>
      </Space>
    </InfoWindowF>
  )
}
