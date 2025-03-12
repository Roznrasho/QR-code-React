import { useState } from "react";

import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [qrCodeUrl, setQRCodeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [showPhoneButtons, setShowPhoneButtons] = useState(false);
  const [showTextButtons, setShowTextButtons] = useState(false);

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
      const qrCodeUrl = response.url;
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
    const isPhoneNumber = /^\+?\d{10,}$/.test(value);

    setShowTextButtons(value.length > 0);
    setShowPhoneButtons(isPhoneNumber);
    if (!value) {
      return setQRCodeUrl("");
    }
  };
  const reset = () => {
    setInputText("");
    setQRCodeUrl("");
    setShowPhoneButtons(false);
    setShowTextButtons(false);
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
                fetchQRCode(generateQRCodeLink(inputText, true))
              }
            >
              WhatsApp QR
            </button>
            <button
              onClick={() =>
                fetchQRCode(generateQRCodeLink(inputText, false))
              }
            >
              Call QR
            </button>
          </>
        )}
      </div>
      {showTextButtons && (
        <button onClick={() => fetchQRCode(inputText)}>Text QR</button>
      )}
       {inputText && (
          <button className="btn-reset" onClick={reset}>
            Reset
          </button>
        )}
     
      {qrCodeUrl && (
        <div>
          <img src={qrCodeUrl} alt="QR Code"/>
          <a href={qrCodeUrl} download="qrcode.png">
            👥 Download QR Code
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
