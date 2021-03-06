import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import styles from './DashBoard.module.css';
import {
  fetchAsyncGetData,
  fetchAsyncGetLatestData,
  selectCurrentData,
} from '../covidSlice';
import SwitchCategory from '../SwitchCategory/SwitchCategory';
import Chart from '../Chart/Chart';
import Cards from '../Cards/Cards';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  content: { marginTop: 85 },
}));

const DashBoard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentDataList = useSelector(selectCurrentData);

  useEffect(() => {
    dispatch(fetchAsyncGetData('positive-cases'));
    dispatch(fetchAsyncGetLatestData('positive-cases'));
  }, [dispatch]);

  return (
    <div>
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Covid 19 Live DashBoard
          </Typography>
          <div>
            <Typography variant="body1">
              {new Date(
                currentDataList[currentDataList.length - 1].date
              ).toDateString()}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.content}>
        <div className={styles.container}>
          <SwitchCategory />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Cards />
          </Grid>
          <Grid item xs={12} md={12}>
            <Chart />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default DashBoard;
