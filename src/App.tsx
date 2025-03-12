import { useState } from "react";

import "./App.css";

function App() {
  const [inputText, setIinputText] = useState("");
  const [qrCodeUrl, setQRCodeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [showPhoneButtons, setShowPhoneButtons] = useState(false);
  const [showTextButtons, setShowTextButtons] = useState(false);
  // const [showEmailButtons, setShowEmailButtons] = useState(false);
  // const [showSocialButtons, setShowSocialButtons] = useState(false);
  // const [showLocationButtons, setShowLocationButtons] = useState(false);
  // const [showWifiButtons, setShowWifiButtons] = useState(false);
  // const [showUrlButtons, setShowUrlButtons] = useState(false);
  // const [showSMSButtons, setShowSMSButtons] = useState(false);

  const fetchQRCode = async (data: string) => {
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      data
    )}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to generate QR code");
      }
    } catch (error: unknown) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  

  return <></>;
}

export default App;
