// Dashboard/IssuesSection.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Issue {
  _id: string;
  category: string;
  description: string;
  createdAt: string;
}

const IssuesSection: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get("/api/issues/list", { withCredentials: true });
        setIssues(response.data.data || []);
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-4 my-4">
      <h2 className="text-xl font-semibold mb-4">Your Legal Issues</h2>
      {loading ? (
        <p>Loading...</p>
      ) : issues.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        <ul className="space-y-2">
          {issues.map((issue) => (
            <li key={issue._id} className="border-b pb-2">
              <strong>{issue.category}</strong><br />
              <p>{issue.description}</p>
              <span className="text-sm text-gray-500">{new Date(issue.createdAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IssuesSection;
