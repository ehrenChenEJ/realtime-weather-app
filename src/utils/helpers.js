// s1: 匯入資料
import sunriseAndSunsetData from './sunrise-sunset.json';

export const getMoment = (locationName) =>{
  // s2:從日出日落時間找出符合地區
  const location = sunriseAndSunsetData.find(
    (data)=> data.locationName === locationName
  );

  // s3: 找不到的話丟錯誤訊息
  if(!location){
    throw new Error(`找不到 ${location} 的日出日落資料`);
  };

  // s4:取得當前時間
  const now = new Date();

  // s5: 將時間格式以2019-10-01的時間格式呈現
  const nowDate = Intl.DateTimeFormat('zh-TW',{
    year:'numeric',
    month:'2-digit',
    day:'2-digit',
  })
    .format(now)
    .replace(/\//g,'-');
  
    // s6: 從該地區中找到對應的日期
  const locationDate = location?.time.find((time)=>time.dataTime === nowDate);

  // s7:找不到的話拋出錯誤訊息
  if(!locationDate){
    throw new Error(`找不到${locationName}在${nowDate}的日出日落資料`);
  };

  // s8: 將日出日落以及當前時間轉成時間戳記TimeStamp
  const sunriseTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunrise}`
  ).getTime();

  const sunsetTimesstamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunset}`
  ).getTime();

  const nowTimeStamp = now.getTime();

  // s9:若當前時間於日出日落之間就是白天，否則就是晚上
  return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimesstamp
    ? 'day'
    : 'night';

};

// 建立地區查詢資料
export const availableLocations = [
  {
    cityName: '宜蘭縣',
    locationName: '宜蘭',
    sunriseCityName: '宜蘭縣',
  },
  {
    cityName: '嘉義市',
    locationName: '嘉義',
    sunriseCityName: '嘉義市',
  },
  {
    cityName: '屏東縣',
    locationName: '恆春',
    sunriseCityName: '屏東縣',
  },
  {
    cityName: '苗栗縣',
    locationName: '國一N142K',
    sunriseCityName: '苗栗縣',
  },
  {
    cityName: '雲林縣',
    locationName: '國一N234K',
    sunriseCityName: '雲林縣',
  },
  {
    cityName: '臺東縣',
    locationName: '臺東',
    sunriseCityName: '臺東縣',
  },
  {
    cityName: '臺北市',
    locationName: '臺北',
    sunriseCityName: '臺北市',
  },
  {
    cityName: '金門縣',
    locationName: '金門',
    sunriseCityName: '金門縣',
  },
  {
    cityName: '桃園市',
    locationName: '新屋',
    sunriseCityName: '桃園市',
  },
  {
    cityName: '彰化縣',
    locationName: '彰師大',
    sunriseCityName: '彰化縣',
  },
  {
    cityName: '嘉義縣',
    locationName: '國一N250K',
    sunriseCityName: '嘉義縣',
  },
  {
    cityName: '高雄市',
    locationName: '高雄',
    sunriseCityName: '高雄市',
  },
  {
    cityName: '基隆市',
    locationName: '基隆',
    sunriseCityName: '基隆市',
  },
  {
    cityName: '臺南市',
    locationName: '南區中心',
    sunriseCityName: '臺南市',
  },
  {
    cityName: '南投縣',
    locationName: '日月潭',
    sunriseCityName: '南投縣',
  },
  {
    cityName: '臺中市',
    locationName: '臺中',
    sunriseCityName: '臺中市',
  },
  {
    cityName: '新竹縣',
    locationName: '新竹',
    sunriseCityName: '新竹縣',
  },
  {
    cityName: '花蓮縣',
    locationName: '花蓮',
    sunriseCityName: '花蓮縣',
  },
  {
    cityName: '澎湖縣',
    locationName: '澎湖',
    sunriseCityName: '澎湖縣',
  },
  {
    cityName: '新北市',
    locationName: '板橋',
    sunriseCityName: '新北市',
  },
];

export const findLocation = (cityName) => {
  return availableLocations.find(location => location.cityName === cityName);
};
