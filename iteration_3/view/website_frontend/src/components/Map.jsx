import React from "react";
import GoogleMapReact from "google-map-react";
import { LocationCity } from "@material-ui/icons";

const Map = ({ location, zoomLevel }) => (
	<div className="map">
		<h2 className="map-h2">Come Visit Us At Our Campus</h2>

		<div className="google-map">
			<GoogleMapReact
				bootstrapURLKeys={{ key: "AIzaSyD1UArkVYPAXijHTA0NE7QqLc8ILXH_sP0" }}
				defaultCenter={location}
				defaultZoom={zoomLevel}
			>
				<LocationCity
					lat={location.lat}
					lng={location.lng}
					text={location.address}
				/>
			</GoogleMapReact>
		</div>
	</div>
);


export default Map;
