import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NativeSelect, FormControl } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
  categoriesArray,
  categoriesType,
  fetchAsyncGetData,
  fetchAsyncGetLatestData,
} from '../covidSlice';
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
  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const setEventValue = Object.keys(categoriesObject).filter((key) => {
            return categoriesObject[key as categoriesType] === e.target.value;
          })[0] as categoriesType;

          dispatch(fetchAsyncGetData(setEventValue));
          dispatch(fetchAsyncGetLatestData(setEventValue));
        }}
      >
        {categoriesArray.map((category, i) => (
          <option key={i} value={category}>
            {category}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default SwitchCategory;
