import React from 'react';
import Chart from 'react-apexcharts';

const EarningsChart = () => {
  const chartOptions = {
    chart: {
      id: 'earnings-chart',
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: '#6c757d',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      title: {
        text: 'Months',
        style: {
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      title: {
        text: 'Earnings ($)',
        style: {
          fontWeight: 600,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    grid: {
      borderColor: '#e0e0e0',
      strokeDashArray: 4,
    },
    colors: ['#4e73df'],
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => `$${val}`,
      },
    },
    markers: {
      size: 5,
      colors: ['#4e73df'],
      strokeWidth: 2,
      strokeColors: '#fff',
      hover: {
        size: 7,
      },
    },
  };

  const chartSeries = [
    {
      name: 'Earnings',
      data: [1200, 1900, 3000, 2500, 2800, 3500],
    },
  ];

  return (
    <Chart options={chartOptions} series={chartSeries} type="line" height={300} />
  );
};

export default EarningsChart;
