'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function VerifyCertificate() {
  const [verificationMethod, setVerificationMethod] = useState<'qr' | 'manual'>('qr');
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleManualVerification = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement manual verification logic
    console.log('Manual verification for ID:', certificateId);
    setVerificationResult({
      status: 'valid',
      certificate: {
        id: certificateId,
        recipientName: 'John Doe',
        issueDate: '2024-03-01',
        expiryDate: '2025-03-01',
        issuerName: 'Example CA',
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Verify Certificate
            </h1>
            <p className="mt-3 text-lg text-gray-500">
              Enter the certificate ID to verify its authenticity.
            </p>
          </div>

          <div className="mt-8">
            {/* Manual Verification Form */}
            <form onSubmit={handleManualVerification} className="bg-white p-6 rounded-lg shadow">
              <div>
                <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700">
                  Certificate ID
                </label>
                <input
                  type="text"
                  id="certificateId"
                  className="input-field mt-1"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="Enter certificate ID"
                  required
                />
              </div>
              <div className="mt-4">
                <button type="submit" className="btn-primary w-full">
                  Verify Certificate
                </button>
              </div>
            </form>

            {/* Verification Result */}
            {verificationResult && (
              <div className="mt-8 bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Verification Result</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      verificationResult.status === 'valid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {verificationResult.status === 'valid' ? 'Valid' : 'Invalid'}
                  </span>
                </div>
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Recipient</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {verificationResult.certificate.recipientName}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Issuer</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {verificationResult.certificate.issuerName}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Issue Date</h4>
                      <p className="mt-1 text-sm text-gray-900">
                        {verificationResult.certificate.issueDate}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Expiry Date</h4>
                      <p className="mt-1 text-sm text-gray-900">
                        {verificationResult.certificate.expiryDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 