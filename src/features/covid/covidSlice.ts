import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import dataObject from './dataObject.json';

const apiUrl = 'https://api.opendata.go.jp/mhlw/death-cases';

type covidDataState = typeof dataObject;

type covidState = {
  category: string;
  data: covidDataState;
};

const initialState: covidState = {
  category: '',
  data: dataObject,
}
;

export const fetchAsyncGetDaily = createAsyncThunk(
  'covid/getDaily',
  async (category: string) => {
    const { data } = await axios.get<covidDataState>(
      `${apiUrl}/${category}?apiKey=${process.env.API_KEY}`
    );
    return { category, data: data.splice(-7, 7) };
  }
);

const covidSlice = createSlice({
  name: 'covid',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetDaily.fulfilled, (state, action) => {
      return {
        ...state,
        category: action.payload.category,
        data: action.payload.data,
      };
    });
  },
});

export const selectCategory: (state: RootState) => string = (state) =>
  state.covid.category;
export const selectData: (state: RootState) => covidDataState = (
  state: RootState
) => state.covid.data;

export default covidSlice.reducer;
