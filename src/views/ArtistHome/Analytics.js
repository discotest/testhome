import React from 'react';
import styled from 'styled-components';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const AnalyticsContainer = styled.div`
  margin-top: 40px;
`;

const options = {
  title: {
    text: 'Downloads',
  },
  xAxis: {
    categories: ['January', 'February', 'March'],
  },
  chart: {
    type: 'column',
  },
  yAxis: {
    title: {
      enabled: false,
    },
  },
  series: [{
    data: [
      {
        name: 'January: 1000',
        y: 1000,
      },
      {
        name: 'February: 2000',
        y: 2000,
      },
      {
        name: 'March: 3000',
        y: 3000,
      },
    ],
    showInLegend: false,
  }],
  tooltip: {
    pointFormat: '',
  },
  credits: {
    enabled: false,
  },
};

const Analytics = () => (
  <>
    <AnalyticsContainer>
      <h1>Analytics</h1>
    </AnalyticsContainer>
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  </>
);

export default Analytics;
