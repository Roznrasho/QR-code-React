import { useState } from "react";

import "./App.css";

function App() {
  const [inputText, setInputText] = useState(""); // Tippfehler korrigiert
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

  const generateQRCodeLink = (phoneNumber: string, useWhatsApp: boolean) => {
    return useWhatsApp ? `https://wa.me/${phoneNumber}` : `tel:${phoneNumber}`;
  };

  const fetchQRCode = async (data: string) => {
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      data
    )}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to generate QR code");
      }
      const qrCodeUrl = response.url; // URL des QR-Codes speichern
      setQRCodeUrl(qrCodeUrl);
    } catch (error: unknown) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setInputText(value);
    const phoneNumber = value.replace(/^\+?\d{10,}$/, "");

    setShowTextButtons(value.length > 0);
    setShowPhoneButtons(phoneNumber.length > 5 && value.length > 10);
    if (!value) {
      return setQRCodeUrl("");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text or phone number"
      />
      <div>
        {showPhoneButtons && (
          <>
            <button
              onClick={() =>
                fetchQRCode(
                  generateQRCodeLink(
                    inputText.replace(/^\+?\d{10,}$/, ""),
                    true
                  )
                )
              }
            >
              WhatsApp QR
            </button>
            <button>Call QR</button>
          </>
        )}
      </div>
      {showTextButtons && (
        <button onClick={() => fetchQRCode(inputText)}>Text QR</button>
      )}
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
    </div>
  );
}

export default App;
