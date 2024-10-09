import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Histogram(props) {
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);


  const generateChartData = () => {
    if (!x || !y || !props.data) {
      return null;
    }

    return {
      labels: props.data.map(row => row[x]), 
      datasets: [
        {
          label: `Values for ${y}`,
          data: props.data.map(row => row[y]), 
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };


  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Histogram',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: x,
        },
      },
      y: {
        title: {
          display: true,
          text: y,
        },
      },
    },
  };

  return (
    <div>
      <div className = "Data">
      <DropdownButton id="dropdown-basic-button" className = "mydropdowns" title="Choose X Axis">
        {props.columns.map((col, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => {
              setX(col);
            }}
          >
            {col}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      
      <DropdownButton id="dropdown-basic-button" className = "mydropdowns" title="Choose Y Axis">
        {props.columns.map((col, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => {
              setY(col);
            }}
          >
            {col}
          </Dropdown.Item>
        ))}
      </DropdownButton>
        </div>
      
      {x && y && (
        <div style={{ marginTop: '20px' }}>
          <Bar data={generateChartData()} options={chartOptions} />
        </div>
      )}
    </div>
  );
}

export default Histogram;