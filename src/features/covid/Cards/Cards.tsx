import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Cards.module.css';
import { selectLatestDataList } from '../covidSlice';
import CardInfo from './CardInfo';

const Cards: React.FC = () => {
  const latestDataList = useSelector(selectLatestDataList);
  const styleArray: string[] = [
    'positive',
    'severe',
    'death',
    'recovery',
    'hospitalization',
  ];
  return (
    <div className={styles.container}>
      {latestDataList.map(
        (data, index): JSX.Element => {
          return (
            <CardInfo
              key={index}
              category={data.eachCategory}
              count={data.latestCount}
              propStyle={styleArray[index]}
            />
          );
        }
      )}
    </div>
  );
};

export default Cards;
