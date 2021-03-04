import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import dataObject from './dataObject.json';
import dataLatestObject from './dataLatestObject.json';
import categoriesArray from './categoriesArray';

const apiUrl = 'https://api.opendata.go.jp/mhlw';

type covidDataState = typeof dataObject;
type covidLatestDataState = {
  eachCategory: string;
  latestCount: string;
};
type covidLatestDataListState = covidLatestDataState[];

type covidState = {
  currentCategory: string;
  currentData: covidDataState;
  latestDataList: covidLatestDataListState;
};

type apiLatestType =
  | typeof dataLatestObject[0]
  | typeof dataLatestObject[1]
  | typeof dataLatestObject[2]
  | typeof dataLatestObject[3]
  | typeof dataLatestObject[4]
  | typeof dataLatestObject[5];

const initialState: covidState = {
  currentCategory: '',
  currentData: dataObject,
  latestDataList: [
    {
      eachCategory: '',
      latestCount: '0',
    },
  ],
};

const moldApi = (data: apiLatestType[]): covidDataState => {
  let jsonString = JSON.stringify(data);
  jsonString = jsonString.replace(/"日付":/g, '"date":');
  jsonString = jsonString.replace(
    /PCR\s検査陽性者数\(単日\)|重症者数|死亡者数|退院、療養解除となった者|入院治療を要する者|PCR\s検査実施件数\(単日\)/g,
    'count'
  );
  return JSON.parse(jsonString);
};

export const fetchAsyncGetData = createAsyncThunk(
  'covid/getData',
  async (category: string) => {
    const { data } = await axios.get<apiLatestType[]>(
      `${apiUrl}/${category}?apikey=${process.env.REACT_APP_API_KEY}`
    );
    const moldData: covidDataState = moldApi(data.splice(-7, 7));
    return { category, data: moldData };
  }
);

export const fetchAsyncGetLatestData = createAsyncThunk(
  'covid/getLatest',
  async (argCategory: string) => {
    const stateObject: covidLatestDataState = {
      eachCategory: '',
      latestCount: '',
    };
    const filterCategoriesArray: string[] = await categoriesArray.filter(
      (category) => argCategory !== category
    );
    const stateList: Promise<covidLatestDataState>[] = await filterCategoriesArray.map(
      async (category) => {
        const { data } = await axios.get<apiLatestType[]>(
          `${apiUrl}/${category}?apikey=${process.env.REACT_APP_API_KEY}`
        );
        const moldData: covidDataState = moldApi(data.splice(-1, 1));
        stateObject.eachCategory = category;
        stateObject.latestCount = moldData[0].count;
        return stateObject;
      }
    );
    console.log(stateList);
    return { stateList };
  }
);

const covidSlice = createSlice({
  name: 'covid',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetData.fulfilled, (state, action) => {
      return {
        ...state,
        category: action.payload.category,
        data: action.payload.data,
      };
    });
    builder.addCase(fetchAsyncGetLatestData.fulfilled, (state, action) => {
      return {
        ...state,
        latestData: action.payload.stateList,
      };
    });
  },
});

export const selectCurrentCategory: (state: RootState) => string = (state) =>
  state.covid.currentCategory;

export const selectCurrentData: (state: RootState) => covidDataState = (
  state: RootState
) => state.covid.currentData;

export const selectLatestDataList: (
  state: RootState
) => covidLatestDataListState = (state: RootState) =>
  state.covid.latestDataList;

export default covidSlice.reducer;
