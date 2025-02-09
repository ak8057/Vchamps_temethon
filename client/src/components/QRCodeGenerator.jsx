import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = ({ value }) => {
  return (
    <div className="flex flex-col items-center">
      <QRCodeCanvas value={value} size={200} />
      <p className="mt-2 text-gray-600">Scan this QR to claim your reward!</p>
    </div>
  );
};

export default QRCodeGenerator;
