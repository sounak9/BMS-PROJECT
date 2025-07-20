import React, { useEffect, useState } from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import Card from "../components/Card";
import Graph from "../components/Graph";
import { fetchSensorLogs } from "../api/sensor";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [sensor, setSensor] = useState({
    voltage: 0,
    current: 0,
    temperature: 0,
    timestamp: "",
  });

  useEffect(() => {
    fetchSensorLogs()
      .then((data) => {
        setLogs(data.reverse()); // oldest first
        if (data.length > 0) setSensor(data[0]);
      })
      .catch(() => setLogs([]));
  }, []);

  // Prepare chart data
  const labels = logs.map((log) =>
    new Date(log.timestamp).toLocaleTimeString()
  );
  const voltageData = {
    labels,
    datasets: [
      {
        label: "Voltage (V)",
        data: logs.map((log) => log.voltage),
        borderColor: "#38B2AC",
        backgroundColor: "rgba(56,178,172,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };
  const currentData = {
    labels,
    datasets: [
      {
        label: "Current (A)",
        data: logs.map((log) => log.current),
        borderColor: "#F6E05E",
        backgroundColor: "rgba(246,224,94,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };
  const temperatureData = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: logs.map((log) => log.temperature),
        borderColor: "#FC8181",
        backgroundColor: "rgba(252,129,129,0.2)",
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
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <Box height="400px">
          <Graph id="voltageGraph" type="line" data={voltageData} />
        </Box>
        <Box height="400px">
          <Graph id="currentGraph" type="line" data={currentData} />
        </Box>
        <Box height="400px">
          <Graph id="temperatureGraph" type="line" data={temperatureData} />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
