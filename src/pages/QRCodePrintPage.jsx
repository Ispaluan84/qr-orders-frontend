import { QRCodeCanvas } from "qrcode.react";
import "./qr-print.css"; // Estilos que te paso abajo

export default function QRCodePrintPage() {
  const baseUrl = "https://qr-orders-frontend.onrender.com/menu";
  const totalMesas = 10;

  return (
    <div className="qr-print-wrapper">
      <h1 className="qr-print-title">Códigos QR por Mesa</h1>
      <div className="qr-grid">
        {[...Array(totalMesas)].map((_, i) => {
          const mesa = i + 1;
          const url = `${baseUrl}?mesa=${mesa}`;
          return (
            <div className="qr-card" key={mesa}>
              <QRCodeCanvas value={url} size={150} />
              <p className="qr-card-label">Mesa {mesa}</p>
              <p className="qr-card-url">{url}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
