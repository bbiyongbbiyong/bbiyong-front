import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

import axios from 'axios';

export default function Chart() {
  const [analytics, setAnalytics] = useState([]);
  const [maxValue, setMaxValue] = useState(100);

  const chartData = [
    {
      name: '어제',
      data: [analytics.emergencyMsgYdy, analytics.metroYdy, analytics.accidentYdy],
      color: '#F43661',
    },
    {
      name: '오늘',
      data: [analytics.emergencyMsgTdy, analytics.metroTdy, analytics.accidentTdy],
      color: '#3399FF',
    },
  ];

  const chartSetting = {
    options: {
      chart: {
        type: 'bar',
        height: 430,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 17.5,
        style: {
          fontSize: '12px',
          colors: ['#000'],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: ['재난문자', '지하철정보', '도로통제정보'],
      },
      yaxis: {
        labels: {
          align: 'left',
          style: {
            fontWeight: 'bold',
            fontSize: '14px',
          },
          offsetX: -25,
        },
        min: 0,
        max: maxValue > 100 ? Math.ceil(maxValue / 10) * 10 : 100,
      },
    },
  };
  const getChartInfo = async () => {
    try {
      const response = await axios.get('https://api.bbiyong-bbiyong.seoul.kr/analytics');
      setAnalytics(response.data.data);
      setMaxValue(Math.max(...Object.values(response.data.data)));
    } catch (e) {
      console.log('사고 유형 불러오기 실패');
    }
  };

  useEffect(() => {
    getChartInfo();
  }, []);

  return (
    <div id="chart-box">
      <ReactApexChart
        id="chart"
        options={chartSetting.options}
        series={chartData}
        type="bar"
        height={250}
        width={325}
      />
    </div>
  );
}
