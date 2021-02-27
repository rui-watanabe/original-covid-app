import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NativeSelect, FormControl } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fetchAsyncGetDaily } from '../covidSlice';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: 320,
  },
}));

const SwitchCategory: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const categories = [
    '陽性者数',
    '重症者数',
    '死亡者数',
    '退院又は療養解除となった者の数',
    '入院治療等を要する者の数',
    'PCR検査実施人数',
  ]
  ;
  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          dispatch(fetchAsyncGetDaily(e.target.value))
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
