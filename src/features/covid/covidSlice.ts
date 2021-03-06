import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import dataObject from './dataObject.json';
import dataLatestObject from './dataLatestObject.json';
import categoriesObject from './categoriesObject.json';

const apiUrl = 'https://api.opendata.go.jp/mhlw';

type covidDataState = typeof dataObject;
type categoriesObjectType = typeof categoriesObject;
type categoriesType = keyof categoriesObjectType;

type covidLatestDataState = {
  eachCategory: categoriesType;
  latestCount: string;
};
type covidLatestDataListState = covidLatestDataState[];

type covidState = {
  currentCategory: categoriesType;
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
  currentCategory: 'positive-cases',
  currentData: dataObject,
  latestDataList: [
    {
      eachCategory: 'severe-cases',
      latestCount: '0',
    },
    {
      eachCategory: 'death-cases',
      latestCount: '0',
    },
    {
      eachCategory: 'recovery-cases',
      latestCount: '0',
    },
    {
      eachCategory: 'hospitalization-cases',
      latestCount: '0',
    },
    {
      eachCategory: 'test-cases',
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
  async (category: categoriesType) => {
    const { data } = await axios.get<apiLatestType[]>(
      `${apiUrl}/${category}?apikey=${process.env.REACT_APP_API_KEY}`
    );
    const moldData: covidDataState = moldApi(data.splice(-14, 14));
    return { category, data: moldData };
  }
);

export const fetchAsyncGetLatestData = createAsyncThunk(
  'covid/getLatest',
  async (argCategory: categoriesType) => {
    let stateObject: covidLatestDataState;
    const categoriesArray = Object.keys(
      categoriesObject
    ) as (keyof typeof categoriesObject)[];
    const filterCategoriesArray = categoriesArray.filter(
      (filterCategory) => argCategory !== filterCategory
    );
    const retStateList: Promise<covidLatestDataState>[] = filterCategoriesArray.map(
      async (mapCategory: categoriesType) => {
        const { data } = await axios.get<apiLatestType[]>(
          `${apiUrl}/${mapCategory}?apikey=${process.env.REACT_APP_API_KEY}`
        );
        const moldData: covidDataState = moldApi(data.splice(-1, 1));
        stateObject = {
          eachCategory: mapCategory,
          latestCount: moldData[0].count,
        };
        return stateObject;
      }
    );
    const stateList = await Promise.all(retStateList);
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
        currentCategory: action.payload.category,
        currentData: action.payload.data,
      };
    });
    builder.addCase(fetchAsyncGetLatestData.fulfilled, (state, action) => {
      return {
        ...state,
        latestDataList: action.payload.stateList,
      };
    });
  },
});

export const selectCurrentCategory: (state: RootState) => categoriesType = (
  state
) => state.covid.currentCategory;

export const selectCurrentData: (state: RootState) => covidDataState = (
  state: RootState
) => state.covid.currentData;

export const selectLatestDataList: (
  state: RootState
) => covidLatestDataListState = (state: RootState) =>
  state.covid.latestDataList;

export default covidSlice.reducer;
