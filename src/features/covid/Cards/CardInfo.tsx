import React from 'react';
import CountUp from 'react-countup';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
// import { GiHastyGrave, GiGraveFlowers } from 'react-icons/gi';
// import { FcInspection } from 'react-icons/fc';
// import { BiBed } from 'react-icons/bi';
import { MdLocalHospital } from 'react-icons/md';
// import { AiFillLike } from 'react-icons/ai';
// import { useSelector } from 'react-redux';
// import styles from './Cards.module.css';
// import { selectLatestDataList } from '../covidSlice';

type CardProps = {
  category: string;
  count: string;
  propStyle: string;
};

const CardInfo = ({ category, count, propStyle }: CardProps): JSX.Element => {
  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={12} md={3} component={Card} className={propStyle}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            <MdLocalHospital />
            {category}
          </Typography>
          <Typography variant="h5">
            <CountUp
              start={0}
              end={Number(count)}
              duration={1.5}
              separator=","
            />
          </Typography>
        </CardContent>
      </Grid>
      {/* <Grid item xs={12} md={3} component={Card} className={styles.serve}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            <GiGraveFlowers />
            重症者数
          </Typography>
          <Typography variant="h5">
            <CountUp
              start={0}
              end={Number(latestData.count)}
              duration={1.5}
              separator=","
            />
          </Typography>
        </CardContent>
      </Grid>
      <Grid item xs={12} md={3} component={Card} className={styles.death}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            <GiHastyGrave />
            死亡者数
          </Typography>
          <Typography variant="h5">
            <CountUp
              start={0}
              end={Number(latestData.count)}
              duration={1.5}
              separator=","
            />
          </Typography>
        </CardContent>
      </Grid>
      <Grid item xs={12} md={3} component={Card} className={styles.recovered}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            <AiFillLike />
            退院又は療養解除となった者の数
          </Typography>
          <Typography variant="h5">
            <CountUp
              start={0}
              end={Number(latestData.count)}
              duration={1.5}
              separator=","
            />
          </Typography>
        </CardContent>
      </Grid>
      <Grid
        item
        xs={12}
        md={3}
        component={Card}
        className={styles.hospitalization}
      >
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            <BiBed />
            入院治療等を要する者の数
          </Typography>
          <Typography variant="h5">
            <CountUp
              start={0}
              end={Number(latestData.count)}
              duration={1.5}
              separator=","
            />
          </Typography>
        </CardContent>
      </Grid>
      <Grid item xs={12} md={3} component={Card} className={styles.inspect}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            <FcInspection />
            PCR検査実施人数
          </Typography>
          <Typography variant="h5">
            <CountUp
              start={0}
              end={Number(latestData.count)}
              duration={1.5}
              separator=","
            />
          </Typography>
        </CardContent>
      </Grid> */}
    </Grid>
  );
};
export default CardInfo;
