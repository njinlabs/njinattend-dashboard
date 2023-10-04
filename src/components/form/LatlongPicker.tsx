import { LatLngExpression, Marker as MarkerRef, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Ref, useRef } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

type LatlongPickerProps = {
  value: LatLngExpression | null;
  onChange: (latlong: LatLng) => void;
  className?: string;
};

export default function LatlongPicker({
  value,
  onChange,
  className,
}: LatlongPickerProps) {
  const markerRef = useRef<MarkerRef>();

  const onDrag = () => {
    if (markerRef.current) {
      onChange(markerRef.current.getLatLng());
    }
  };

  if (!value) {
    return null;
  }

  return (
    <MapContainer
      center={value}
      zoom={20}
      className={"h-72 w-full " + className}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={value}
        draggable={true}
        ref={markerRef as Ref<MarkerRef>}
        eventHandlers={{
          dragend: onDrag,
        }}
      ></Marker>
    </MapContainer>
  );
}
