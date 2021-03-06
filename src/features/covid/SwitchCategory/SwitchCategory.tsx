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
  type categoriesObjectType = typeof categoriesObject;
  const reCategoriesObject = categoriesObject as categoriesObjectType;
  const categories = Object.values(
    categoriesObject
  ) as (keyof typeof categoriesObject)[];
  type categoriesType = keyof typeof categoriesObject;

  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const setEventValue = Object.keys(reCategoriesObject).filter(
            (key) => {
              return (
                reCategoriesObject[key as categoriesType] === e.target.value
              );
            }
          )[0] as categoriesType;

          dispatch(fetchAsyncGetData(setEventValue));
          dispatch(fetchAsyncGetLatestData(setEventValue));
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
