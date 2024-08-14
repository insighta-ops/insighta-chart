import React, { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = ({ data, options }) => {
  const chartRef = useRef();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false)
    };
  }, []);

  useEffect(() => {
      if (isMounted && chartRef.current && chartRef.current.ctx) {
        chartRef.current.update();
      }

      return () => {
        
      };
    }, [data, isMounted]);

    if(!isMounted || !data){
      return null;
    }
  
    return (
      <div>
        <Pie
          ref={chartRef}
          data={data}
          options={options}
        />
      </div>
    );
  };

export default PieChart;
