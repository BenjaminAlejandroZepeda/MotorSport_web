import React from "react";
import MainLayout from "../components/layout/MainLayout";

export default function Map() {
  return (
    <MainLayout>
      <div>
        <iframe
          src="https://gta-5-map.com?embed=light"
          title="GTA 5 Map"
          height="500"
          style={{ position: "relative", width: "100%", border: "none" }}
        ></iframe>
      </div>
    </MainLayout>
  );
}
