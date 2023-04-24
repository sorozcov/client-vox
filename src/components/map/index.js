import { useState } from "react"
import { MapContainer ,TileLayer,Marker,Popup} from "react-leaflet"
import { icon } from "leaflet"

const ICON = icon({
  iconUrl: "/favicon.png",
  iconSize: [32, 32],
})

export default function MapAccomodation({data}){
    const [centerPosition,setCenterPosition] = useState([40.3634,-3.60])
    
    return( 
    <MapContainer center={centerPosition} zoom={13} scrollWheelZoom={true} style={{height: '100%', width: "100%"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map(accom=>(
            <Marker icon={ICON} key={accom.AccommodationId} position={[accom.AccommodationLatitude,accom.AccommodationLongitude]}>
                <Popup>
                    Accommodation: {accom.AccommodationTitle}
                    <br/>
                    Price: {accom.AccommodationPrice}
                    
            </Popup>
            </Marker>
        ))}
       
      </MapContainer>)
}