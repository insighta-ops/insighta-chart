import React, { useState, useEffect } from "react";
import axios from "axios";
import PieChart from "./PieChart";



const InsightaChart = ({ address, apiUrl="https://insighta.cc/api/v1/summary", timeout = 5000 }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if(!address){
        setLoading(false)
        setError("no address input.")
        setChartData({labels: [], datasets: []})
        return;
    }
    setLoading(true);
    
    axios.get(apiUrl+'/'+address, { timeout })
      .then(response => {
        const data = response.data.data;
        if(response.data.code !== 0 || Object.keys(response.data.data).length < 1){
          setError("No Data found.");
          setChartData({labels: [], datasets: []})
          return
        }
        const labels = data.map(item => item.domain);
        const scores = data.map(item => item.score);
        setChartData({
          labels,
          datasets: [
            {
              data: scores,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0"
              ],
              hoverOffset: 4
            }
          ]
        });
        setError()
      })
      .catch(error => {
        setError(error.message);
      }).finally(() => {
        setLoading(false);
      });

      return () => {
        setLoading(false)
        setError()
        setChartData({labels: [], datasets: []})
        };
  }, [address, apiUrl, timeout]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            label += context.raw;
            return label;
          }
        }
      }
    }
  };
  return <PieChart data={chartData} options={options} />;
};

export default InsightaChart;