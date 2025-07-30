import { QRCodeCanvas } from 'qrcode.react';

export default function QRCodeGenerator({ restaurantSlug }) {
    const publicUrl = `${window.location.origin}/public/`;

    return (
        <div className="qr-section">
  <h3 className="qr-title">Escanea el código QR</h3>
  <QRCodeCanvas value={publicUrl} size={200} />
  <p className="qr-url">{publicUrl}</p>
</div>

    );
}