import React, { useEffect, useState } from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import Card from "../components/Card";
import Graph from "../components/Graph";

const Dashboard = () => {
  const [sensor, setSensor] = useState({
    voltage: 0,
    current: 0,
    temperature: 0,
    timestamp: "",
  });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.voltage) {
        setSensor(data);
        setHistory((prev) => [...prev.slice(-19), data]); // keep last 20
      }
    };
    return () => ws.close();
  }, []);

  const voltageData = {
    labels: history.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "Voltage (V)",
        data: history.map((d) => d.voltage),
        borderColor: "#38B2AC",
        backgroundColor: "rgba(56,178,172,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6} mb={8}>
        <Card
          title="Temperature"
          value={sensor.temperature}
          unit="°C"
          description="Real-time Temperature"
        />
        <Card
          title="Current"
          value={sensor.current}
          unit="A"
          description="Real-time Current"
        />
        <Card
          title="Voltage"
          value={sensor.voltage}
          unit="V"
          description="Real-time Voltage"
        />
        <Card title="SOC" value="90" unit="%" description="State of Charge" />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <Graph
          id="voltageGraph"
          type="line"
          data={voltageData}
          options={{ responsive: true }}
        />
        {/* Add more Graph components for current, SOC, temperature as needed */}
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
