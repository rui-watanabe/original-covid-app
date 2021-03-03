import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import styles from './Chart.module.css';
import { selectCurrentData } from '../covidSlice';

const Chart: React.FC = () => {
  const currentDataList = useSelector(selectCurrentData);
  const currentDataDates = currentDataList.map(({ date }) => date);

  const lineChart = currentDataList[0] && (
    <Line
      data={{
        labels: currentDataDates.map((date) => new Date(date).toDateString()),
        datasets: [
          {
            data: currentDataList.map((data) => Number(data.count)),
            label: '仮のタイトル',
            borderColor: '#3333ff',
            fill: true,
          },
        ],
      }}
    />
  );

  return <div className={styles.container}>{lineChart}</div>;
};

export default Chart;
