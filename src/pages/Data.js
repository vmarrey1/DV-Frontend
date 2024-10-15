import Table from "./components/Table.js"
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import ScatterPlot from "./components/Graph.js"
import Histogram from "./components/Histogram.js"
import { Dropdown, DropdownButton } from 'react-bootstrap';
import "./Data.css"
function Data() {   
  const [data1, setData] = useState([]); // Initialize data as an array
  const [columns2, setHeader] = useState([]); // Initialize columns as an array
  const [selectedComponent, setSelectedComponent] = useState(null);
  // Fetch the data
  useEffect(() => {
    const gettingData = async () => {
      try {
        const response = await axios.get("http://54.219.131.177/getData");
        console.log(response.data); 
        setData(response.data); // 
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    gettingData();
  }, []);

  // Fetch the column headers
  useEffect(() => {
    const gettingHeader = async () => {
      try {
        const response = await axios.get("http://54.219.131.177/getHeader");
        setHeader(response.data); // Assuming response.data is an array of column names
      } catch (error) {
        console.error('Error fetching columns', error);
      }
    };
    gettingHeader();
  }, []);
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'ScatterPlot':
        return (<div className = "ScatterpotContainer"><ScatterPlot data = {data1} columns = {columns2}/></div>)
      case 'Table':
        return (<div className = "TableContainer"><Table data = {data1} columns = {columns2}/></div>)
      case 'Histogram':
        return (<div className = "HistogramContainer"><Histogram  data = {data1} columns = {columns2}/></div>)

      case "All": 
        return (<div>
          <Table data = {data1} columns = {columns2}/>
          ScatterPlot: 
          <ScatterPlot data = {data1} columns = {columns2}/>
          Histogram: 
          <Histogram  data = {data1} columns = {columns2}/>
        </div>)

      default:
        return <div></div>;
    }
  }; 
  return (
    <div className="DataContainer" >
    <div className = "Data">
      Please select a component from the dropdown. 
      <DropdownButton id="dropdown-basic-button" className = "mydropdowns" title="Choose Component">
          <Dropdown.Item  onClick={() => setSelectedComponent('Table')}>Table</Dropdown.Item>
          <Dropdown.Item  onClick={() => setSelectedComponent('ScatterPlot')}>Scatterplot</Dropdown.Item>
          <Dropdown.Item  onClick={() => setSelectedComponent('Histogram')}>Histogram</Dropdown.Item>
          <Dropdown.Item  onClick={() => setSelectedComponent('All')}>All Visualizations</Dropdown.Item>
      </DropdownButton>
      </div>
        {renderComponent()}
    </div>
  );
}

export default Data;