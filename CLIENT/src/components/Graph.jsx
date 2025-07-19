import React, { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Chart from "chart.js/auto";

export default function Graph({ id, type, data, options }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const chart = new Chart(ctx, { type, data, options });
    return () => chart.destroy();
  }, [data, options, type]);

  return (
    <Box bg="blue.800" p={4} borderRadius="xl" boxShadow="lg">
      <canvas
        ref={canvasRef}
        id={id}
        style={{ width: "100%", height: "300px" }}
      />
    </Box>
  );
}

Graph.defaultProps = {
  options: { responsive: true, animation: false },
};
