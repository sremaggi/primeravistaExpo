import React,{useState,useEffect} from 'react'
import * as Calendar from 'expo-calendar';
import MainStack from './navigation/mainStack';



export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);
  return (
    <MainStack />
  );
}
