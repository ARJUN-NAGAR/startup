import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import documentRoutes from './route/documentRoutes.js'; // Your new API routes

import { User, Document, LegalIssue } from './models/index.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/nyayasaathi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ✅ Mount API routes
app.use('/api', documentRoutes);

// HOME DASHBOARD Route
app.get('/', async (req, res) => {
  const status = mongoose.connection.readyState === 1 ? "Connected ✅" : "Disconnected ❌";

  const userCount = await User.countDocuments();
  const issueCount = await LegalIssue.countDocuments();
  const documentCount = await Document.countDocuments();

  const latestIssues = await LegalIssue.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('userId', 'fullName');

  const issueTypeCounts = await LegalIssue.aggregate([
    { $group: { _id: "$issueType", count: { $sum: 1 } } }
  ]);

  const issueTypes = issueTypeCounts.map(i => `'${i._id}'`);
  const issueValues = issueTypeCounts.map(i => i.count);

  const issueRows = latestIssues.map(issue => `
    <tr>
      <td>${issue._id}</td>
      <td>${issue.userId?.fullName || 'N/A'}</td>
      <td>${issue.issueType}</td>
      <td>${new Date(issue.createdAt).toLocaleDateString()}</td>
    </tr>
  `).join('');

  res.send(`<!DOCTYPE html>
    <html>
    <head>
      <title>NyayaSaathi Dashboard</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <style>
        body { background-color: #f8f9fa; padding: 40px; font-family: Arial; }
        .card { padding: 30px; margin: 20px 0; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
      </style>
    </head>
    <body>
      <h1 class="mb-4 text-center">NyayaSaathi MongoDB Dashboard</h1>
      <div class="container">
        <div class="card">
          <h4>🧠 DB Status: <span class="badge ${status.includes("Connected") ? "bg-success" : "bg-danger"}">${status}</span></h4>
        </div>
        <div class="row">
          <div class="col-md-4"><div class="card bg-light"><h5>👥 Total Users</h5><h3>${userCount}</h3></div></div>
          <div class="col-md-4"><div class="card bg-light"><h5>⚖️ Legal Issues</h5><h3>${issueCount}</h3></div></div>
          <div class="col-md-4"><div class="card bg-light"><h5>📄 Documents</h5><h3>${documentCount}</h3></div></div>
        </div>
        <h4 class="mt-5">🕒 Latest Legal Issues</h4>
        <table class="table table-bordered table-striped mt-3">
          <thead class="table-dark"><tr><th>ID</th><th>User</th><th>Type</th><th>Date</th></tr></thead>
          <tbody>${issueRows}</tbody>
        </table>
        <div class="text-end mt-3"><a href="/issues" class="btn btn-primary">🔎 View All Issues</a></div>
        <h4 class="mt-5">📊 Issue Type Statistics</h4>
        <canvas id="issueChart" height="100"></canvas>
      </div>
      <script>
        const ctx = document.getElementById('issueChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: { labels: [${issueTypes}], datasets: [{ label: 'No. of Issues', data: [${issueValues}], backgroundColor: ['#007bff', '#ffc107', '#28a745', '#dc3545', '#6f42c1', '#fd7e14', '#20c997'] }] },
          options: { responsive: true, scales: { y: { beginAtZero: true } } }
        });
      </script>
    </body>
    </html>`);
});

// FILTERED /issues Page
app.get('/issues', async (req, res) => {
  const selectedType = req.query.type || '';
  const types = await LegalIssue.distinct('issueType');
  const query = selectedType ? { issueType: selectedType } : {};

  const issues = await LegalIssue.find(query).sort({ createdAt: -1 }).populate('userId', 'fullName');

  const rows = issues.map(issue => `
    <tr>
      <td>${issue._id}</td>
      <td>${issue.userId?.fullName || 'N/A'}</td>
      <td>${issue.issueType}</td>
      <td>${issue.status}</td>
      <td>${new Date(issue.createdAt).toLocaleDateString()}</td>
    </tr>
  `).join('');

  const options = types.map(type => `
    <option value="${type}" ${type === selectedType ? 'selected' : ''}>${type}</option>
  `).join('');

  res.send(`<!DOCTYPE html>
    <html>
    <head>
      <title>Filtered Legal Issues</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>body { padding: 40px; background-color: #f0f0f0; }</style>
    </head>
    <body>
      <div class="container">
        <h2 class="mb-4">📋 Legal Issues (Filtered)</h2>
        <a href="/" class="btn btn-secondary mb-3">← Back to Dashboard</a>
        <form class="row g-3 mb-4" method="GET" action="/issues">
          <div class="col-md-6">
            <label for="type" class="form-label">Filter by Issue Type:</label>
            <select id="type" name="type" class="form-select">
              <option value="">-- All Types --</option>${options}
            </select>
          </div>
          <div class="col-md-6 d-flex align-items-end">
            <button type="submit" class="btn btn-primary me-2">🔍 Search</button>
            <a href="/issues" class="btn btn-outline-secondary">Reset</a>
          </div>
        </form>
        <table class="table table-striped table-bordered">
          <thead class="table-dark"><tr><th>ID</th><th>User</th><th>Type</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </body>
    </html>`);
});

app.listen(PORT, () => {
  console.log(`🌐 Dashboard running at http://localhost:${PORT}`);
});
