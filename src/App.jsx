import { useState, useEffect } from "react";

const BRAND = {
  name: "GTONTINA",
  slogan: "La tontine digitale du Cameroun",
  whatsapp: "+237 697 368 463",
  email: "gtechai340@gmail.com",
  whatsappLink: "https://wa.me/237697368463",
};

export default function App() {
  return (
    <div style={{padding: "2rem", fontFamily: "Georgia", background: "#FDF6E3", minHeight: "100vh"}}>
      <h1 style={{color: "#C8940A"}}>🌿 GTONTINA</h1>
      <p style={{color: "#6B6B6B"}}>La tontine digitale du Cameroun</p>
      <p>📱 +237 697 368 463</p>
      <p>✉️ gtechai340@gmail.com</p>
    </div>
  );
}
