import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import UserInfoCard from '../../components/Dashboard/UserInfoCard';
import DocumentsSection from '../../components/Dashboard/DocumentsSection';
import IssuesSection from '../../components/Dashboard/IssuesSection';
import axiosInstance from '../../api/axiosInstance';

const CitizenDashboard: React.FC = () => {
  const [documents, setDocuments] = useState([]);
  const [issues, setIssues] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No token found. Please login again.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const userRes = await axiosInstance.get("/protected");
        setUser(userRes.data.user || userRes.data);

        const [docsRes, issuesRes] = await Promise.all([
          axiosInstance.get("/citizens/documents"),
          axiosInstance.get("/citizens/issues"),
        ]);

        setDocuments(docsRes.data.documents || []);
        setIssues(issuesRes.data.issues || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('❌ Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center text-gray-600">🔄 Loading your dashboard...</p>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <p className="text-center text-red-600">{error}</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {user && <UserInfoCard user={user} />}
      <DocumentsSection />
      <IssuesSection />
    </DashboardLayout>
  );
};

export default CitizenDashboard;
