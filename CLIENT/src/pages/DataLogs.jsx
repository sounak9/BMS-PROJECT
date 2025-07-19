import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";

export default function DataLogs() {
  const logs = [
    { time: "10:00 AM", voltage: "12.3V", temp: "36.1°C", current: "0.9A" },
    { time: "10:05 AM", voltage: "11.8V", temp: "45.2°C", current: "1.2A" },
    { time: "10:10 AM", voltage: "12.5V", temp: "35.5°C", current: "0.8A" },
    { time: "10:15 AM", voltage: "12.4V", temp: "37.0°C", current: "1.0A" },
  ];

  return (
    <Box bg="blue.800" borderRadius="xl" boxShadow="lg" p={6} mb={8}>
      <Text color="white" fontSize="lg" fontWeight="semibold" mb={4}>
        Data Logs
      </Text>
      <Box overflowX="auto">
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th color="gray.400">Time</Th>
              <Th color="gray.400">Voltage</Th>
              <Th color="gray.400">Temp</Th>
              <Th color="gray.400">Current</Th>
            </Tr>
          </Thead>
          <Tbody>
            {logs.map((log, idx) => (
              <Tr key={idx}>
                <Td color="gray.300">{log.time}</Td>
                <Td color="gray.300">{log.voltage}</Td>
                <Td color="gray.300">{log.temp}</Td>
                <Td color="gray.300">{log.current}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
