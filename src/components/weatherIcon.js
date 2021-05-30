import styled from '@emotion/styled';
import React,{ useMemo } from 'react';

import { ReactComponent as DayThunderstrom } from '../images/day-thunderstorm.svg';
import { ReactComponent as DayClear } from '../images/day-clear.svg';
import { ReactComponent as DayCloudyFog } from '../images/day-cloudy-fog.svg';
import { ReactComponent as DayCloudy } from '../images/day-cloudy.svg';
import { ReactComponent as DayFog } from '../images/day-fog.svg';
import { ReactComponent as DayPartiallyClearWithRain } from '../images/day-partially-clear-with-rain.svg';
import { ReactComponent as DaySnowing } from '../images/day-snowing.svg';
import { ReactComponent as NightThunderstorm } from '../images/night-thunderstorm.svg';
import { ReactComponent as NightClear } from '../images/night-clear.svg';
import { ReactComponent as NightCloudyFog } from '../images/night-cloudy-fog.svg';
import { ReactComponent as NightCloudy } from '../images/night-cloudy.svg';
import { ReactComponent as NightFog } from '../images/night-fog.svg';
import { ReactComponent as NightPartiallyClearWithRain } from '../images/night-partially-clear-with-rain.svg';
import { ReactComponent as NightSnowing } from '../images/night-snowing.svg';


const IconContainer = styled.div`
  flex-basis:30%;
  svg{
    max-height:110px;
  }
`;

// 定義代碼對應的天氣型態
const weatherTypes = {
  isThunderstorms :[15,16,17,18,21,22,33,34,35,36,41],
  isClear:[1],
  isCloudyFog:[25,26,27,28],
  isCloudy:[2,3,4,5,6,7],
  isFog:[24],
  isPartiallyClearWithRain:[8,9,10,11,12,13,14,19,20,29,30,31,32,38,39],
  isSnowing:[23,37,42]
};

// 天氣型態對應圖示
const weatherIcons = {
  day:{
    isThunderstorms: <DayThunderstrom/>,
    isClear: <DayClear/>,
    isCloudyFog: <DayCloudyFog/>,
    isCloudy: <DayCloudy/>,
    isFog: <DayFog/>,
    isPartiallyClearWithRain: <DayPartiallyClearWithRain/>,
    isSnowing: <DaySnowing/>
  },
  night:{
    isThunderstorms: <NightThunderstorm/>,
    isClear: <NightClear/>,
    isCloudyFog: <NightCloudyFog/>,
    isCloudy: <NightCloudy/>,
    isFog: <NightFog/>,
    isPartiallyClearWithRain: <NightPartiallyClearWithRain/>,
    isSnowing: <NightSnowing/>
  }
};

const weatherCode2Type = (weatherCode) =>{
  const [weatherType] = 
    // Object.entires 把 weatherTypes key value 轉乘陣列
    // [isCloudy, 1]
    Object.entries(weatherTypes).find(([weatherType,weatherCodes])=> 
    // 使用find跑回圈，搭配inclouds看API過來的代碼對應到什麼天氣型態
    weatherCodes.includes(Number(weatherCode))
    // incloudes 是否包含特定元素，回傳 true or false
    ) || [];

  return weatherType; 
};


// const weatherCode = 1;
// console.log(weatherCode2Type(weatherCode));
// console.log(123);

const WeatherIcon = ({weatherCode,moment}) =>{
  // 使用useMemo
  const weatherType = useMemo(()=> weatherCode2Type(weatherCode),[weatherCode]);
  // 後面放入陣列，這樣只有weathercode有更動時才會跑weatherCode2Type以節省效能
  // 根據天氣型態取得對應圖示
  const weatherIcon = weatherIcons[moment][weatherType];
  return(
    <IconContainer>
      {weatherIcon}
    </IconContainer>
  )
};

export default WeatherIcon;