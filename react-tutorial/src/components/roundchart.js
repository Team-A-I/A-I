// src/components/RoundChart.js

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const RoundChart = ({ data }) => {
    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Sentiment Analysis',
                data: Object.values(data),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF6347',
                    '#6A5ACD',
                    '#7FFFD4',
                    '#6495ED',
                    '#DC143C',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF6347',
                    '#6A5ACD',
                    '#7FFFD4',
                    '#6495ED',
                    '#DC143C',
                ],
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || 0;
                        const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
            legend: {
                display: true,
                position: 'right',
            },
            datalabels: {
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(2);
                    return `${percentage}%`;
                },
                color: '#fff',
                font: {
                    weight: 'bold'
                }
            },
        },
    };

    return (
        <div>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default RoundChart;
