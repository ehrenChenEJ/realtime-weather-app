import React,{ useState,useEffect,useCallback }from 'react';

const fetchCurrentWeather = ({authorizationKey, locationName}) =>{

  return fetch(
    `https://opendata.cwb.gov.tw/api//v1/rest/datastore/O-A0003-001?Authorization=${authorizationKey}&locationName=${locationName}`
  )
  .then((response)=>response.json())
  .then((data) => {
    const locationData = data.records.location[0];

    const weatherElements = locationData.weatherElement.reduce(
      (neededElements,item)=>{
        if(['WDSD','TEMP'].includes(item.elementName)){
          neededElements[item.elementName] = item.elementValue;
        }
        return neededElements;
      },{}
    );

    return {
      observationTime:locationData.time.obsTime,
      locationName:locationData.locationName,
      temperature:weatherElements.TEMP,
      windSpeed:weatherElements.WDSD,
      isLoading:false,
    };
  });
};
const fetchWeatherForecast = ({authorizationKey,cityName}) => {

  return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authorizationKey}&locationName=${cityName}`
  )
  .then((response)=> response.json())
  .then((data)=> {
    console.log(data);
    const locationData = data.records.location[0];

    const weatherElements = locationData.weatherElement.reduce(
      (neededElements,item)=>{
        if(['Wx','PoP','CI'].includes(item.elementName)){
          neededElements[item.elementName] = item.time[0].parameter;
        }
        return neededElements;
      },{}
    );
    
    console.log(weatherElements);

    return{
      description:weatherElements.Wx.parameterName,
      weatherCode:weatherElements.Wx.parameterValue,
      rainPossibility: weatherElements.PoP.parameterName,
      comfortability:weatherElements.CI.parameterName
    };
  });
};

const useWeatherAPI = ({locationName, cityName, authorizationKey}) => {
  const [weatherElement, setWeatherElement] = useState({
    locationName:'',
    description:'',
    windSpeed:0,
    temperature:0,
    rainPossibility:0,
    observationTime:new Date(),
    isLoading:true,
    comfortability:'',
    weatherCode:0
  });

  // 除非dependience有改變，不然callback不會重新宣告函示
  // 省效能方法，但是dependience也可能消耗更多效能（相對useEffect重複執行）
  // 大部分時候其實不用用useCallback

  const fetchData = useCallback(
    async() => {
      setWeatherElement((preState)=>({
        ...preState,
        isLoading:true
      }));
      
      const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather({authorizationKey,locationName}),
        fetchWeatherForecast({authorizationKey,cityName})
      ]);

      // 把取得的資料透過物件的解構復職放入
      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        isLoading:false,
      });
    },[authorizationKey,cityName,locationName]
  );
  
    // 加入useEffect方法，參數是需要放入函示
    useEffect(()=>{
      fetchData();
    },[fetchData]);

    // 跟一班元件的差別
    // 回傳讓其他元件使用的資料或方法
    return [weatherElement, fetchData];

};

export default useWeatherAPI;