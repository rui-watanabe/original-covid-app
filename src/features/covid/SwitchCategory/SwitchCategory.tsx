import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NativeSelect, FormControl } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fetchAsyncGetData, fetchAsyncGetLatestData } from '../covidSlice';
import categoriesObject from '../categoriesObject.json';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: 320,
  },
}));

const SwitchCategory: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = Object.values(
    categoriesObject
  ) as (keyof typeof categoriesObject)[];

  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const eventValue = e.target.value as keyof typeof categoriesObject;
          dispatch(fetchAsyncGetData(eventValue));
          dispatch(fetchAsyncGetLatestData(eventValue));
        }}
      >
        {categories.map((category, i) => (
          <option key={i} value={category}>
            {category}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default SwitchCategory;
