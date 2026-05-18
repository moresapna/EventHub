import { useState } from "react";

import { QrReader } from "react-qr-reader";

import api from "../../services/api";

export default function ScanTicket() {

  const [scanning, setScanning] =
    useState(false);

  const [lastScan, setLastScan] =
    useState("");

  const handleScan = async (text) => {

    // Prevent multiple scans
    if (scanning) return;

    setScanning(true);

    try {

      const match = text.match(
        /Booking ID: (.+)/
      );

      if (!match) {

        alert("Invalid QR");

        setTimeout(() => {
            setScanning(false);
            setLastScan("");
        }, 1000);

        return;
      }

      const bookingId =
        match[1].trim();

      const { data } = await api.post(
        `/bookings/scan/${bookingId}`
      );

      const message =
        `${data.message}\n\n` +
        `Used: ${data.scannedCount}/${data.totalTickets}`;

      setLastScan(message);

      alert(message);

    } catch (err) {

      const errorMessage =
        err.response?.data?.message ||
        "Scan failed";

      setLastScan(errorMessage);

      alert(errorMessage);
    }

    // Restart scanner
    setTimeout(() => {
        setScanning(false);
        setLastScan("");
    }, 1000);
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6 text-center">
        Scan Ticket
      </h1>

      <div className="max-w-sm mx-auto border rounded-2xl overflow-hidden shadow-lg bg-white">

        {!scanning && (
          <QrReader
            constraints={{
              facingMode: "environment",
            }}

            onResult={(result) => {

              if (!!result?.text) {

                handleScan(
                  result.text
                );
              }
            }}

            containerStyle={{
              width: "100%",
            }}

            videoStyle={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
          />
        )}

      </div>

      <div className="text-center mt-6">

        <p className="text-lg font-semibold">
          {scanning
            ? "Processing..."
            : "Ready to Scan"}
        </p>

        {lastScan && (
          <p className="mt-2 text-slate-600">
            {lastScan}
          </p>
        )}

      </div>

    </div>
  );
}