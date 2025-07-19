// src/components/Dashboard/DocumentsSection.tsx

import React from "react";

interface Document {
  _id: string;
  title: string;
  description: string;
  url: string;
}

const DocumentsSection = ({ documents }: { documents: Document[] }) => {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
      <div className="space-y-2">
        {documents.length > 0 ? (
          documents.map((doc) => (
            <div key={doc._id} className="border p-4 rounded">
              <h3 className="text-lg font-medium">{doc.title}</h3>
              <p>{doc.description}</p>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Document
              </a>
            </div>
          ))
        ) : (
          <p>No documents uploaded yet.</p>
        )}
      </div>
    </section>
  );
};

export default DocumentsSection;
