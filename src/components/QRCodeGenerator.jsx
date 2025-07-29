import { QRCodeCanvas } from 'qrcode.react';

export default function QRCodeGenerator({ restaurantSlug }) {
    const publicUrl = `${window.location.origin}/public/`;

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">Escanea el código QR</h3>
            <QRCodeCanvas value={publicUrl} size={200} />
            <p className="text-sm text-gray-500 mt-2">{publicUrl}</p>
        </div>
    );
}