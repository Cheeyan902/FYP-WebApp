'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { QRCodeSVG } from 'qrcode.react';

export default function IssueCertificate() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [certificateData, setCertificateData] = useState({
    recipientName: '',
    certificateType: '',
    issueDate: '',
    expiryDate: '',
    issuerName: '',
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setPdfFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement certificate issuance logic
    console.log('Certificate Data:', certificateData);
    console.log('PDF File:', pdfFile);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Issue New Certificate
            </h1>
            <p className="mt-3 text-lg text-gray-500">
              Upload your certificate template and fill in the details below.
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* PDF Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Certificate Template
                </label>
                <div
                  {...getRootProps()}
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                    isDragActive
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-primary-500'
                  }`}
                >
                  <div className="space-y-1 text-center">
                    <input {...getInputProps()} />
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                        <span>Upload a file</span>
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF up to 10MB</p>
                  </div>
                </div>
                {pdfFile && (
                  <p className="mt-2 text-sm text-gray-500">
                    Selected file: {pdfFile.name}
                  </p>
                )}
              </div>

              {/* Certificate Details Form */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    id="recipientName"
                    className="input-field mt-1"
                    value={certificateData.recipientName}
                    onChange={(e) =>
                      setCertificateData({ ...certificateData, recipientName: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label htmlFor="certificateType" className="block text-sm font-medium text-gray-700">
                    Certificate Type
                  </label>
                  <select
                    id="certificateType"
                    className="input-field mt-1"
                    value={certificateData.certificateType}
                    onChange={(e) =>
                      setCertificateData({ ...certificateData, certificateType: e.target.value })
                    }
                    required
                  >
                    <option value="">Select a type</option>
                    <option value="ssl">SSL/TLS Certificate</option>
                    <option value="digital">Digital Trust Certificate</option>
                    <option value="cybersecurity">Cybersecurity Credential</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700">
                      Issue Date
                    </label>
                    <input
                      type="date"
                      id="issueDate"
                      className="input-field mt-1"
                      value={certificateData.issueDate}
                      onChange={(e) =>
                        setCertificateData({ ...certificateData, issueDate: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      id="expiryDate"
                      className="input-field mt-1"
                      value={certificateData.expiryDate}
                      onChange={(e) =>
                        setCertificateData({ ...certificateData, expiryDate: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="issuerName" className="block text-sm font-medium text-gray-700">
                    Issuer Name
                  </label>
                  <input
                    type="text"
                    id="issuerName"
                    className="input-field mt-1"
                    value={certificateData.issuerName}
                    onChange={(e) =>
                      setCertificateData({ ...certificateData, issuerName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={!pdfFile || !certificateData.recipientName}
                >
                  Issue Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 