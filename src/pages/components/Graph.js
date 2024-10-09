import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const ScatterPlot = (props) => {
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const extractColumn = (data, columnKey) => {
        return data.map((row) => row[columnKey]);
    };

    const scatterData = {
        datasets: [
            {
                label: `Scatter plot of ${x} vs ${y}`,
                data: x && y ? props.data.map((row) => ({ x: row[x], y: row[y] })) : [],
                backgroundColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const scatterOptions = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: x ? x : 'X Axis',
                },
            },
            y: {
                title: {
                    display: true,
                    text: y ? y : 'Y Axis',
                },
            },
        },
    };

    return (
        <div>
            <div className = "Data" > 
        
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
                <div className="mt-4">
                    <Scatter data={scatterData} options={scatterOptions} />
                </div>
            )}
        </div>
    );
};

export default ScatterPlot;