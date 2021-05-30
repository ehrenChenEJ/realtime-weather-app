import React from 'react';
// 載入emotion 的styled套件
import styled from '@emotion/styled';

// 解決跨瀏覽器無法識別2020-12-12 10:30:00
import dayjs from 'dayjs';

// component
import WeatherIcon from '../components/weatherIcon';
import { ReactComponent as CogIcon } from '../images/cog.svg';

// 載入svg圖示
import { ReactComponent as AirFlowIcon } from '../images/airFlow.svg';
import { ReactComponent as RainIcon } from '../images/rain.svg';
import { ReactComponent as RefreshIcon } from '../images/refresh.svg';
import { ReactComponent as LoadingIcon } from '../images/loading.svg';

const WeatherCardWrapper = styled.div`
  position:relative;
  min-width:360px;
  box-shadow:${({theme})=> theme.boxShadow};
  background-color: ${({theme})=> theme.foregroundColor};
  box-sizing:border-box;
  padding:30px 15px;
`;

const Location = styled.div`
  ${props => console.log(props)}
  font-size:28px;
  color:${({theme})=> theme.titleColor};
  margin-bottom:20px;
`;

const Description = styled.div`
  font-size:16px;
  color:${({theme})=> theme.textColor};
  margin-bottom:30px;
`;

const CurrentWeather = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:30px;
`;

const Temperature = styled.div`
  color:${({theme})=> theme.temperatureColor};
  font-size:96px;
  font-weight:300;
  display:flex;
`;

const Celsius = styled.div`
  font-weight:normal;
  font-size:42px;
`;

const AirFlow = styled.div`
  display:flex;
  align-items:center;
  font-size:16px;
  font-weight:300;
  color:${({theme})=> theme.textColor};
  margin-bottom:20px;
  svg{
    width:25px;
    height:auto;
    margin-right:30px;
  }
`;

const Rain = styled.div`
  display:flex;
  align-items:center;
  font-size:16px;
  font-weight:300;
  color:${({theme})=> theme.textColor};
  svg{
    width:25px;
    height:auto;
    margin-right:30px;
  }
`;

const Refresh = styled.div`
  position:absolute;
  right:15px;
  bottom:15px;
  font-size:12px;
  display:inline-flex;
  align-items:flex-end;
  color:${({theme})=> theme.textColor};
  svg{
    margin-left:10px;
    width:15px;
    height:15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration:${({isLoading})=> (isLoading?'1.5s':'0s')};
  }

  @keyframes rotate{
    from{
      transform:rotate(360deg);
    }
    to{
      transform:rotate(0deg);
    }
  }
`;

const Cog = styled(CogIcon)`
  position:absolute;
  top:30px;
  right: 15px;
  width:15px;
  height:15px;
  cursor: pointer;
`;

const WeatherCard = ({
  weatherElement,
  moment,
  fetchData,
  handleCurrentPageChange,
  cityName,
}) =>{
  // 讓程式碼更精簡的方法，各種解構復職，先把要用到的資料取出來
  const {
    observationTime,
    description,
    windSpeed,
    temperature,
    rainPossibility,
    isLoading,
    comfortability,
    weatherCode,
  } = weatherElement;
  return (
    <WeatherCardWrapper className="weather-card">
      <Cog onClick={()=> handleCurrentPageChange('WeatherSetting')}/>
      <Location>{cityName}</Location>
      <Description>{description} {comfortability}</Description>
      <CurrentWeather>
        <Temperature>
          {Math.round(temperature)}<Celsius>℃</Celsius>
        </Temperature>
        {/* 將weathercode 和 moment 以props傳入 weatherIcon */}
        <WeatherIcon weatherCode={weatherCode} moment={moment}/>
      </CurrentWeather>
      <AirFlow>
        <AirFlowIcon/>{windSpeed} m/h
      </AirFlow>
      <Rain>
        <RainIcon/>{rainPossibility}%
      </Rain>
      <Refresh 
        onClick = {fetchData}
        isLoading = {isLoading}
      >
        最後觀測時間：
        {new Intl.DateTimeFormat('zh-TW',{
          hour:'numeric',
          minute:'numeric',
        }).format(dayjs(observationTime))}
        {' '}
        {isLoading? <LoadingIcon/>:<RefreshIcon/>}
      </Refresh>
    </WeatherCardWrapper>
  );
};

export default WeatherCard;