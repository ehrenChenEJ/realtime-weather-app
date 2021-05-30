import React,{ useState,useEffect,useMemo }from 'react';

// Step1: 載入emotion 的styled套件
import styled from '@emotion/styled';

// 從emotion-theming 載入themeProvider
import { ThemeProvider } from '@emotion/react';

// 取得白天或晚上
import { getMoment,findLocation } from './utils/helpers';

// Component
import WeatherCard from './view/weatherCard';
import WeatherSetting from './view/WeatherSetting';

// 引用 cutom hook
import useWeatherAPI from './hook/useWeatherAPI';

// 定義帶有styled的component
const Container = styled.div`
  background-color:${({theme})=> theme.backgroundColor};
  height: 100%;
  display:flex;
  align-items:center;
  justify-content:center;
`;


const theme = {
  light:{
    backgroundColor:'#ededed',
    foregroundColor:'#f9f9f9',
    boxShadow:'0 1px 3px 0 #999999',
    titleColor:'#212121',
    temperatureColor:'#757575',
    textColor: '#828282'
  },
  dark:{
    backgroundColor:'#1F2022',
    foregroundColor:'#121416',
    boxShadow: '0 1px 4px 0 rgba(12,12,13,0.2),0 0 0 1px rgba(0,0,0,0.15)',
    titleColor: '#f9f9fa',
    temperatureColor:'#dddddd',
    textColor:'#cccccc'
  },
};

// API 授權碼
const AUTHORIZATION_KEY = 'CWB-29FABDFC-0496-4ECF-AA99-354CC9BF5A9B';
// const LOCATION_NAME = '臺北'; // Api_real_Step1:定義LOCATION_NAME
// const LOCATION_NAME_FORECAST = '臺北市';

// 把上面定義好的styled-component當成元件使用
const App = () => {
  // 從localStorage拿地區，不然使用預設值
  const storageCity = localStorage.getItem('cityName') || '臺北市';
  const [currentCity, setCurrentCity] = useState(storageCity);
  // const currentLocation = findLocation(currentCity);
  const currentLocation = useMemo(()=>findLocation(currentCity),[currentCity]);
  console.log(currentLocation);
  const {cityName,locationName,sunriseCityName} = currentLocation;

  const [weatherElement, fetchData] = useWeatherAPI({
    locationName,
    cityName,
    authorizationKey: AUTHORIZATION_KEY
  });

  // 使用useState並定義currentTheme的預設值為light
  const[currentTheme,setCurrentTheme]= useState('light');

  // useMemo 
  const moment = useMemo(() => getMoment(sunriseCityName), [sunriseCityName]);

  // 定義currentPage這個state，預設為WeatherCard
  const [currentPage, setCurrentPage] = useState('WeatherCard');
  const handleCurrentPageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  // 設定可以更改地區的方法
  const handleCurrentCityChange = (currentCity) =>{
    setCurrentCity(currentCity);
  };

  // 根據時間改變主題 light dark
  // 不用把所有useEffect塞一塊，可以根據用途邏輯分開寫
  useEffect(()=>{
    // 根據moment決定使用主題
    setCurrentTheme(moment === 'day'? 'light':'dark');
  },[moment]); // put moment into dependencies
  // only change it when moment is different 

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container className="container">
        {currentPage === 'WeatherCard' && (
          <WeatherCard
            cityName = {cityName}
            weatherElement = {weatherElement}
            moment = {moment}
            fetchData = {fetchData}
            handleCurrentPageChange = {handleCurrentPageChange}
          />
        )}
        {/* 條件轉譯 */}
        {currentPage === 'WeatherSetting' && 
          <WeatherSetting
            cityName = {cityName}
            handleCurrentCityChange = {handleCurrentCityChange}
            handleCurrentPageChange = {handleCurrentPageChange}
          />}
      </Container>
    </ThemeProvider>
  );
};

export default App;
