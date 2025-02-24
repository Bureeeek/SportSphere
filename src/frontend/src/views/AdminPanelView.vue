<template>
    <div class="admin-panel">
      <h2>Verification Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Platforms</th>
            <th>Handles</th>
            <th>Reason</th>
            <th>Articles</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in requests" :key="request._id">
            <td>{{ request.selectedPlatforms.join(", ") }}</td>
            <td>
              <ul>
                <li v-for="(handle, platform) in request.handles" :key="platform">
                  {{ platform }}: {{ handle }}
                </li>
              </ul>
            </td>
            <td>{{ request.reason }}</td>
            <td>
              <a :href="request.articles" target="_blank">View Articles</a>
            </td>
            <td>{{ request.status }}</td>
            <td>
              <button @click="updateStatus(request._id, 'Approved')" :disabled="request.status !== 'Pending'">Approve</button>
              <button @click="updateStatus(request._id, 'Rejected')" :disabled="request.status !== 'Pending'">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        requests: [],
      };
    },
    methods: {
      async fetchRequests() {
        try {
          const response = await axios.get("http://localhost:5800/api/verify-user");
          this.requests = response.data;
        } catch (error) {
          console.error("Error fetching requests:", error);
        }
      },
      async updateStatus(id, status) {
        try {
          await axios.put(`http://localhost:5800/api/verify-user/${id}`, { status });
          this.fetchRequests(); // Refresh the data
        } catch (error) {
          console.error("Error updating status:", error);
        }
      },
    },
    mounted() {
      this.fetchRequests();
    },
  };
  </script>
  
  <style scoped>
  .admin-panel {
    max-width: 800px;
    margin: 20px auto;
    background: #1e1e1e;
    color: #e0e0e0;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  thead {
    background: #333;
  }
  
  td, th {
    padding: 10px;
    border: 1px solid #444;
  }
  
  a {
    color: #bb86fc;
  }
  
  button {
    margin: 5px;
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    color: white;
  }
  
  button:first-child {
    background-color: #4caf50;
  }
  
  button:last-child {
    background-color: #f44336;
  }
  
  button:disabled {
    background-color: #6b6b6b;
    cursor: not-allowed;
  }
  </style>
  