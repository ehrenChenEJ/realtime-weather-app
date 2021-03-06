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

  // ??????dependience??????????????????callback????????????????????????
  // ????????????????????????dependience????????????????????????????????????useEffect???????????????
  // ??????????????????????????????useCallback

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

      // ???????????????????????????????????????????????????
      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        isLoading:false,
      });
    },[authorizationKey,cityName,locationName]
  );
  
    // ??????useEffect????????????????????????????????????
    useEffect(()=>{
      fetchData();
    },[fetchData]);

    // ????????????????????????
    // ?????????????????????????????????????????????
    return [weatherElement, fetchData];

};

export default useWeatherAPI;