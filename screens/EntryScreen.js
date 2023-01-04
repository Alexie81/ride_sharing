import React, { useEffect, useState } from "react";
import { TextInput, Card, Button, IconButton, Title, MD3Colors } from 'react-native-paper';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import NumericInput from 'react-native-numeric-input'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('database')
// WEEKDAYS

const EntryScreen = () => {

  // -Data- {optional: ziua}
  const days = ['Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata'];
  let date = new Date();
  let date_form = `${days[date.getDay()]}, ${date.getDate().toString().length === 1 ? "0"+date.getDate().toString() : date.getDate()}-${(date.getMonth()+1).toString().length === 1 ? "0"+(date.getMonth()+1).toString() : date.getMonth()}-${date.getFullYear()}`
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [selectedDate3, setSelectedDate3] = useState(null);
  const [selectedDate4, setSelectedDate4] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [isDatePickerVisible3, setDatePickerVisibility3] = useState(false);
  const [isDatePickerVisible4, setDatePickerVisibility4] = useState(false);
  const [time1, setTime1_changed] = useState('');
  let time1Official = '';
  const [time2, setTime2_changed] = useState('');
  let time2Official = '';
  const [time3, setTime3_changed] = useState('');
  let time3Official = '';
  const [time4, setTime4_changed] = useState('');
  let time4Official = '';

  //Button - ADD "Interval Orar 2"
  const [buttonAdd_show, setButtonAdd_show] = useState('flex');
  const [buttonCancel_show, setButtonCancel_show] = useState('none');
  const [cardAdd_show, setCardAdd_show] = useState('none');
  let interval2 = false;


  const [kmstart, setKmstart] = useState(0)
  const [kmstart_val, setKmstart_val] = useState(0)
  let KmStart = 0;
  const [kmstart1, setKmstart1] = useState(0)
  const [kmstart1_val, setKmstart1_val] = useState(0)
  let KmStart1 = 0;
  // useEffect(() => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       `create table if not exists customers (id integer primary key not null, name text);`
  //     );
  //     tx.executeSql('insert into customers (name) values (?), (?)', [
  //       'Alexie',
  //       'Popescu',
  //     ]);
  //     tx.executeSql('select * from customers', [], (_, { rows }) => console.log(JSON.stringify(rows)))
  //   })
  // })

  return (
    <ScrollView style={{ padding: 20, marginBottom: 70, paddingBottom: 50}}>
      <TextInput
      mode="flat"
      label="-Data-"
      value={date_form}
      activeUnderlineColor="blue"
      underlineColor="blue"
      outlineColor="white"
      style={{backgroundColor: "#A9C9F0", marginBottom: 5}}
      disabled="true"
    />
    <Card
    style={{padding: 4}}>
    <Card.Content>
    <Title style={{paddingBottom: 10}}>Interval orar 1:</Title>
    <Button title="Show Date Picker" onPress={()=>{setDatePickerVisibility(true)}} style={{marginBottom: 5}} dark="true" textColor="white" buttonColor="#00469A">Ora Start - {time1}</Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={(date) => {setSelectedDate(date);setDatePickerVisibility(false);setTime1_changed(date.getHours().toString() + ":" + date.getMinutes().toString());time1Official=(date.getHours().toString() + ":" + date.getMinutes().toString());console.warn(time1Official)}}
        onCancel={() => {setDatePickerVisibility(false)}}
        
      />
        <Button title="Show Date Picker" onPress={()=>{setDatePickerVisibility2(true)}} style={{marginBottom: 14}} dark="true" textColor="white" buttonColor="#00469A">Ora Final - {time2}</Button>
        <DateTimePickerModal
          isVisible={isDatePickerVisible2}
          mode="time"
          onConfirm={(date2) => {setSelectedDate2(date2);setDatePickerVisibility2(false);setTime2_changed(date2.getHours().toString() + ":" + date2.getMinutes().toString());time2Official=(date2.getHours().toString() + ":" + date2.getMinutes().toString());console.warn(time2Official)}}
          onCancel={() => {setDatePickerVisibility2(false)}}
        />
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Km START: {kmstart}</Text>
        <NumericInput 
        onChange={value => {
          var parts = value.toString().split(".");
          const numberPart = parts[0];
          const decimalPart = parts[1];
          const thousands = /\B(?=(\d{3})+(?!\d))/g;
          setKmstart(numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : ""));
          setKmstart_val(value)
          KmStart = value;
        }} 
        minValue={0} 
        value={kmstart_val}
        rounded 
        onLimitReached={(isMax,msg) => console.log(isMax,msg)} 
        rightButtonBackgroundColor='#00469A' 
        leftButtonBackgroundColor='#277BE1'
        iconStyle={{ color: 'white' }} 
        textColor='black'
        valueType='real'
        totalWidth={160} 
        totalHeight={40}
        separatorWidth={2}
        />
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Km FINAL: {kmstart1}</Text>
        <NumericInput
        value={kmstart1_val}
        onChange={value => {
          var parts = value.toString().split(".");
          const numberPart = parts[0];
          const decimalPart = parts[1];
          const thousands = /\B(?=(\d{3})+(?!\d))/g;
          setKmstart1(numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : ""));
          setKmstart1_val(value);
          KmStart1 = value;
        }} 
        minValue={0}
        rounded 
        onLimitReached={(isMax,msg) => console.log(isMax,msg)} 
        rightButtonBackgroundColor='#00469A' 
        leftButtonBackgroundColor='#277BE1'
        iconStyle={{ color: 'white' }} 
        textColor='black'
        valueType='real'
        totalWidth={160} 
        totalHeight={40} 
        separatorWidth={2}
        />


      <View style={{display:cardAdd_show, paddingTop: 10}}>
        <Title style={{paddingBottom: 10}}>Interval orar 2:</Title>
        <Button title="Show Date Picker" onPress={()=>{setDatePickerVisibility3(true)}} style={{marginBottom: 5}} dark="true" textColor="white" buttonColor="#00469A">Ora Start - {time3}</Button>
        <DateTimePickerModal
          isVisible={isDatePickerVisible3}
          mode="time"
          onConfirm={(date) => {setSelectedDate3(date);setDatePickerVisibility3(false);setTime3_changed(date.getHours().toString() + ":" + date.getMinutes().toString());time3Official=(date.getHours().toString() + ":" + date.getMinutes().toString());console.warn(time3Official)}}
          onCancel={() => {setDatePickerVisibility3(false)}}
          
        />
        <Button title="Show Date Picker" onPress={()=>{setDatePickerVisibility4(true)}} style={{marginBottom: 14}} dark="true" textColor="white" buttonColor="#00469A">Ora Final - {time4}</Button>
        <DateTimePickerModal
          isVisible={isDatePickerVisible4}
          mode="time"
          onConfirm={(date2) => {setSelectedDate4(date2);setDatePickerVisibility4(false);setTime4_changed(date2.getHours().toString() + ":" + date2.getMinutes().toString());time4Official=(date2.getHours().toString() + ":" + date2.getMinutes().toString());console.warn(time4Official)}}
          onCancel={() => {setDatePickerVisibility4(false)}}
        />

<Text style={{fontWeight: 'bold', fontSize: 16}}>Km START: {kmstart}</Text>
        <NumericInput 
        onChange={value => {
          var parts = value.toString().split(".");
          const numberPart = parts[0];
          const decimalPart = parts[1];
          const thousands = /\B(?=(\d{3})+(?!\d))/g;
          setKmstart(numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : ""));
          setKmstart_val(value)
          KmStart = value;
        }} 
        minValue={0} 
        value={kmstart_val}
        rounded 
        onLimitReached={(isMax,msg) => console.log(isMax,msg)} 
        rightButtonBackgroundColor='#00469A' 
        leftButtonBackgroundColor='#277BE1'
        iconStyle={{ color: 'white' }} 
        textColor='black'
        valueType='real'
        totalWidth={160} 
        totalHeight={40}
        separatorWidth={2}
        />
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Km FINAL: {kmstart1}</Text>
        <NumericInput
        value={kmstart1_val}
        onChange={value => {
          var parts = value.toString().split(".");
          const numberPart = parts[0];
          const decimalPart = parts[1];
          const thousands = /\B(?=(\d{3})+(?!\d))/g;
          setKmstart1(numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : ""));
          setKmstart1_val(value);
          KmStart1 = value;
        }} 
        minValue={0}
        rounded 
        onLimitReached={(isMax,msg) => console.log(isMax,msg)} 
        rightButtonBackgroundColor='#00469A' 
        leftButtonBackgroundColor='#277BE1'
        iconStyle={{ color: 'white' }} 
        textColor='black'
        valueType='real'
        totalWidth={160} 
        totalHeight={40} 
        separatorWidth={2}
        />
      </View>
      <IconButton icon="minus" mode="contained" iconColor="white" containerColor="#D41212" style={{alignSelf: 'flex-end', width: 50, marginTop: -5, display: buttonCancel_show}} onPress={() => {
        setCardAdd_show('none')
        setButtonAdd_show('flex')
        setButtonCancel_show('none')
        interval2 = false;
      }} />
    </Card.Content>
  </Card>
    <Button icon="plus-circle-outline" mode="contained" textColor="white" buttonColor="#00469A" onPress={() => {
      setButtonAdd_show('none')
      setCardAdd_show('flex')
      setButtonCancel_show('flex')
      interval2 = true;
      }} style={{alignSelf: 'flex-end',display:buttonAdd_show, width:240, align: 'right', marginTop: 5}}>
      Adauga Interval orar 2
    </Button>
    




    <View style={{height:50}}></View>
    </ScrollView>
  );
}

export default EntryScreen;