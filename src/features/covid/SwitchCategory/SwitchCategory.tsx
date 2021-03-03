import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NativeSelect, FormControl } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fetchAsyncGetData } from '../covidSlice';
import categoriesArray from '../categoriesArray';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: 320,
  },
}));

const SwitchCategory: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = categoriesArray;

  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          dispatch(fetchAsyncGetData(e.target.value))
        }
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
