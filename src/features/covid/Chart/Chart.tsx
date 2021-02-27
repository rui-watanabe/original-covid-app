import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import styles from './Chart.module.css';
import { selectData } from '../covidSlice';

const Chart: React.FC = () => {
  const dataList = useSelector(selectData);
  const dates = dataList.map(({ date }) => date);

  const lineChart = dataList[0] && (
    <Line
      data={{
        labels: dates.map((date) => new Date(date).toDateString()),
        datasets: [
          {
            data: dataList.map((data) => Number(data.count)),
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
