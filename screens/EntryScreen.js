import React, { useEffect, useState } from "react";
import {
  TextInput,
  Card,
  Button,
  IconButton,
  Title,
  MD3Colors,
} from "react-native-paper";
import { StyleSheet, View, Text, Alert, ScrollView } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import NumericInput from "react-native-numeric-input";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("database");
// WEEKDAYS

const EntryScreen = () => {
  // -Data- {optional: ziua}
  const days = [
    "Duminica",
    "Luni",
    "Marti",
    "Miercuri",
    "Joi",
    "Vineri",
    "Sambata",
  ];
  let date = new Date();
  let date_form = `${days[date.getDay()]}, ${
    date.getDate().toString().length === 1
      ? "0" + date.getDate().toString()
      : date.getDate()
  }-${
    (date.getMonth() + 1).toString().length === 1
      ? "0" + (date.getMonth() + 1).toString()
      : date.getMonth()
  }-${date.getFullYear()}`;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [selectedDate3, setSelectedDate3] = useState(null);
  const [selectedDate4, setSelectedDate4] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [isDatePickerVisible3, setDatePickerVisibility3] = useState(false);
  const [isDatePickerVisible4, setDatePickerVisibility4] = useState(false);
  const [time1, setTime1_changed] = useState("");
  let time1Official = "";
  const [time2, setTime2_changed] = useState("");
  let time2Official = "";
  const [time3, setTime3_changed] = useState("");
  let time3Official = "";
  const [time4, setTime4_changed] = useState("");
  let time4Official = "";

  //Button - ADD "Interval Orar 2"
  const [buttonAdd_show, setButtonAdd_show] = useState("flex");
  const [buttonCancel_show, setButtonCancel_show] = useState("none");
  const [cardAdd_show, setCardAdd_show] = useState("none");
  let interval2 = false;

  // 'interval orar 1
  const [kmstart, setKmstart] = useState(0);
  const [kmstart_val, setKmstart_val] = useState(0);
  let KmStart = 0;
  const [kmstart1, setKmstart1] = useState(0);
  const [kmstart1_val, setKmstart1_val] = useState(0);
  let KmStart1 = 0;
  //'interval orar 2'
  const [kmstart2, setKmstart2] = useState(0);
  const [kmstart2_val, setKmstart2_val] = useState(0);
  let KmStart2 = 0;
  const [kmstart3, setKmstart3] = useState(0);
  const [kmstart3_val, setKmstart3_val] = useState(0);
  let KmStart3 = 0;

  // 'COMBUSTIBIL'
  const [comb_Cant, setComb_Cant] = useState([]);
  const [comb_val, setComb_val] = useState([]);
  const handleAddCombVal=()=>{
    const abc=[...comb_Cant, []];
    setComb_Cant(abc)
  }
  const handleChangeCombCant=(Cant, i)=>{
    let newdata=[...comb_Cant];
    // type = ['cantitate', 'Cantoare']
    newdata[i]=Cant;
    console.log(newdata)
    setComb_Cant(newdata)
  }
  const handleChangeCombVal=(val, i)=>{
    let newdata=[...comb_val];
    // type = ['cantitate', 'Cantoare']
    newdata[i]=val;
    console.log(newdata)
    setComb_val(newdata)
  }
  const handleDeleteCombVal=()=>{
    const deleteCant=[...comb_Cant]
    const deleteVal = [...comb_val]
    deleteCant.splice((comb_Cant.length - 1), 1)
    deleteVal.splice((comb_val.length - 1), 1)
    console.log( "DELETED -> " + deleteCant)
    setComb_Cant(deleteCant)
    console.log(comb_Cant)
    setComb_val(deleteVal)
  }


  // //--------------------------DATABASE:
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
    <ScrollView style={{ padding: 20, marginBottom: 70, paddingBottom: 50 }}>
      <TextInput
        mode="flat"
        label="-Data-"
        value={date_form}
        activeUnderlineColor="blue"
        underlineColor="blue"
        outlineColor="white"
        style={{ backgroundColor: "#A9C9F0", marginBottom: 5 }}
        disabled="true"
      />
      <Card style={{ padding: 4 }}>
        <Card.Content>
          <Title style={{ paddingBottom: 10 }}>Interval orar 1:</Title>
          <Button
            title="Show Date Picker"
            onPress={() => {
              setDatePickerVisibility(true);
            }}
            style={{ marginBottom: 5 }}
            dark="true"
            textColor="white"
            buttonColor="#00469A"
          >
            Ora Start - {time1}
          </Button>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            onConfirm={(date) => {
              setSelectedDate(date);
              setDatePickerVisibility(false);
              setTime1_changed(
                date.getHours().toString() + ":" + date.getMinutes().toString()
              );
              time1Official =
                date.getHours().toString() + ":" + date.getMinutes().toString();
              console.warn(time1Official);
            }}
            onCancel={() => {
              setDatePickerVisibility(false);
            }}
          />
          <Button
            title="Show Date Picker"
            onPress={() => {
              setDatePickerVisibility2(true);
            }}
            style={{ marginBottom: 14 }}
            dark="true"
            textColor="white"
            buttonColor="#00469A"
          >
            Ora Final - {time2}
          </Button>
          <DateTimePickerModal
            isVisible={isDatePickerVisible2}
            mode="time"
            onConfirm={(date2) => {
              setSelectedDate2(date2);
              setDatePickerVisibility2(false);
              setTime2_changed(
                date2.getHours().toString() +
                  ":" +
                  date2.getMinutes().toString()
              );
              time2Official =
                date2.getHours().toString() +
                ":" +
                date2.getMinutes().toString();
              console.warn(time2Official);
            }}
            onCancel={() => {
              setDatePickerVisibility2(false);
            }}
          />
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Km START: {kmstart}
          </Text>
          <NumericInput
            onChange={(value) => {
              var parts = value.toString().split(".");
              const numberPart = parts[0];
              const decimalPart = parts[1];
              const thousands = /\B(?=(\d{3})+(?!\d))/g;
              setKmstart(
                numberPart.replace(thousands, ",") +
                  (decimalPart ? "." + decimalPart : "")
              );
              setKmstart_val(value);
              KmStart = value;
            }}
            minValue={0}
            value={kmstart_val}
            rounded
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            rightButtonBackgroundColor="#00469A"
            leftButtonBackgroundColor="#277BE1"
            iconStyle={{ color: "white" }}
            textColor="black"
            valueType="real"
            totalWidth={160}
            totalHeight={40}
            separatorWidth={2}
          />
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Km FINAL: {kmstart1}
          </Text>
          <NumericInput
            value={kmstart1_val}
            onChange={(value) => {
              var parts = value.toString().split(".");
              const numberPart = parts[0];
              const decimalPart = parts[1];
              const thousands = /\B(?=(\d{3})+(?!\d))/g;
              setKmstart1(
                numberPart.replace(thousands, ",") +
                  (decimalPart ? "." + decimalPart : "")
              );
              setKmstart1_val(value);
              KmStart1 = value;
            }}
            minValue={0}
            rounded
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            rightButtonBackgroundColor="#00469A"
            leftButtonBackgroundColor="#277BE1"
            iconStyle={{ color: "white" }}
            textColor="black"
            valueType="real"
            totalWidth={160}
            totalHeight={40}
            separatorWidth={2}
          />

          <View style={{ display: cardAdd_show, paddingTop: 10 }}>
            <Title style={{ paddingBottom: 10 }}>Interval orar 2:</Title>
            <Button
              title="Show Date Picker"
              onPress={() => {
                setDatePickerVisibility3(true);
              }}
              style={{ marginBottom: 5 }}
              dark="true"
              textColor="white"
              buttonColor="#00469A"
            >
              Ora Start - {time3}
            </Button>
            <DateTimePickerModal
              isVisible={isDatePickerVisible3}
              mode="time"
              onConfirm={(date) => {
                setSelectedDate3(date);
                setDatePickerVisibility3(false);
                setTime3_changed(
                  date.getHours().toString() +
                    ":" +
                    date.getMinutes().toString()
                );
                time3Official =
                  date.getHours().toString() +
                  ":" +
                  date.getMinutes().toString();
                console.warn(time3Official);
              }}
              onCancel={() => {
                setDatePickerVisibility3(false);
              }}
            />
            <Button
              title="Show Date Picker"
              onPress={() => {
                setDatePickerVisibility4(true);
              }}
              style={{ marginBottom: 14 }}
              dark="true"
              textColor="white"
              buttonColor="#00469A"
            >
              Ora Final - {time4}
            </Button>
            <DateTimePickerModal
              isVisible={isDatePickerVisible4}
              mode="time"
              onConfirm={(date2) => {
                setSelectedDate4(date2);
                setDatePickerVisibility4(false);
                setTime4_changed(
                  date2.getHours().toString() +
                    ":" +
                    date2.getMinutes().toString()
                );
                time4Official =
                  date2.getHours().toString() +
                  ":" +
                  date2.getMinutes().toString();
                console.warn(time4Official);
              }}
              onCancel={() => {
                setDatePickerVisibility4(false);
              }}
            />

            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Km START: {kmstart2}
            </Text>
            <NumericInput
              onChange={(value) => {
                var parts = value.toString().split(".");
                const numberPart = parts[0];
                const decimalPart = parts[1];
                const thousands = /\B(?=(\d{3})+(?!\d))/g;
                setKmstart2(
                  numberPart.replace(thousands, ",") +
                    (decimalPart ? "." + decimalPart : "")
                );
                setKmstart2_val(value);
                KmStart2 = value;
              }}
              minValue={0}
              value={kmstart2_val}
              rounded
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              rightButtonBackgroundColor="#00469A"
              leftButtonBackgroundColor="#277BE1"
              iconStyle={{ color: "white" }}
              textColor="black"
              valueType="real"
              totalWidth={160}
              totalHeight={40}
              separatorWidth={2}
            />
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Km FINAL: {kmstart3}
            </Text>
            <NumericInput
              value={kmstart3_val}
              onChange={(value) => {
                var parts = value.toString().split(".");
                const numberPart = parts[0];
                const decimalPart = parts[1];
                const thousands = /\B(?=(\d{3})+(?!\d))/g;
                setKmstart3(
                  numberPart.replace(thousands, ",") +
                    (decimalPart ? "." + decimalPart : "")
                );
                setKmstart3_val(value);
                KmStart3 = value;
              }}
              minValue={0}
              rounded
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              rightButtonBackgroundColor="#00469A"
              leftButtonBackgroundColor="#277BE1"
              iconStyle={{ color: "white" }}
              textColor="black"
              valueType="real"
              totalWidth={160}
              totalHeight={40}
              separatorWidth={2}
            />
          </View>
          <IconButton
            icon="minus"
            mode="contained"
            iconColor="white"
            containerColor="#D41212"
            style={{
              alignSelf: "flex-end",
              width: 50,
              marginTop: -5,
              display: buttonCancel_show,
            }}
            onPress={() => {
              setCardAdd_show("none");
              setButtonAdd_show("flex");
              setButtonCancel_show("none");
              interval2 = false;
            }}
          />
        </Card.Content>


      </Card>
      <Button
        icon="plus-circle-outline"
        mode="contained"
        textColor="white"
        buttonColor="#00469A"
        onPress={() => {
          setButtonAdd_show("none");
          setCardAdd_show("flex");
          setButtonCancel_show("flex");
          interval2 = true;
        }}
        style={{
          alignSelf: "flex-end",
          display: buttonAdd_show,
          width: 240,
          align: "right",
          marginTop: 5,
        }}
      >
        Adauga Interval orar 2
      </Button>

        {/* COMBUSTIBIL */}
      <Card style={{ marginTop: 10 }}>
        <Card.Content>
          <Title>Combustibil:</Title>
          {comb_Cant.map((datas,i)=>{
            console.log("combCant -> " + datas)
            let dataVal = [];
            console.log(datas)
            comb_val.map((dataval) => {
              dataval = dataVal;
            })
            return(
              <Card style={{marginTop: 10}} key={i.toString()}>
            <Card.Content>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ width: 140 }}>Cantitate(L)</Text>
                <Text style={{ width: 140 }}>Valoare(lei)</Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <NumericInput
                  value={Number(datas)}
                  onChange={(e) => {
                    handleChangeCombCant(e, i)
                    console.log("index -> " + e)
                  }}
                  minValue={0}
                  rounded
                  onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                  rightButtonBackgroundColor="#00469A"
                  leftButtonBackgroundColor="#277BE1"
                  iconStyle={{ color: "white" }}
                  textColor="black"
                  valueType="real"
                  totalWidth={140}
                  totalHeight={40}
                  separatorWidth={2}
                />
                <NumericInput
                  value={Number(dataVal[i])}
                  onChange={(e) => {
                    handleChangeCombVal(e, i)
                  }}
                  minValue={0}
                  rounded
                  onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                  rightButtonBackgroundColor="#00469A"
                  leftButtonBackgroundColor="#277BE1"
                  iconStyle={{ color: "white" }}
                  textColor="black"
                  valueType="real"
                  totalWidth={140}
                  totalHeight={40}
                  separatorWidth={2}
                />
              </View>
            </Card.Content>
          </Card>
            )

          })}
          {/* <Card>
            <Card.Content>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ width: 140 }}>Cantitate(L)</Text>
                <Text style={{ width: 140 }}>Valoare(lei)</Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <NumericInput
                  value={kmstart3_val}
                  onChange={(value) => {
                    var parts = value.toString().split(".");
                    const numberPart = parts[0];
                    const decimalPart = parts[1];
                    const thousands = /\B(?=(\d{3})+(?!\d))/g;
                    setKmstart3(
                      numberPart.replace(thousands, ",") +
                        (decimalPart ? "." + decimalPart : "")
                    );
                    setKmstart3_val(value);
                    KmStart3 = value;
                  }}
                  minValue={0}
                  rounded
                  onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                  rightButtonBackgroundColor="#00469A"
                  leftButtonBackgroundColor="#277BE1"
                  iconStyle={{ color: "white" }}
                  textColor="black"
                  valueType="real"
                  totalWidth={140}
                  totalHeight={40}
                  separatorWidth={2}
                />
                <NumericInput
                  value={kmstart3_val}
                  onChange={(value) => {
                    var parts = value.toString().split(".");
                    const numberPart = parts[0];
                    const decimalPart = parts[1];
                    const thousands = /\B(?=(\d{3})+(?!\d))/g;
                    setKmstart3(
                      numberPart.replace(thousands, ",") +
                        (decimalPart ? "." + decimalPart : "")
                    );
                    setKmstart3_val(value);
                    KmStart3 = value;
                  }}
                  minValue={0}
                  rounded
                  onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                  rightButtonBackgroundColor="#00469A"
                  leftButtonBackgroundColor="#277BE1"
                  iconStyle={{ color: "white" }}
                  textColor="black"
                  valueType="real"
                  totalWidth={140}
                  totalHeight={40}
                  separatorWidth={2}
                />
              </View>
              <IconButton
                icon="minus"
                mode="contained"
                iconColor="white"
                containerColor="#D41212"
                style={{ alignSelf: "flex-end", width: 40, marginBottom: -40 }}
              />
              <Button></Button>
            </Card.Content>
          </Card> */}
            <IconButton
                icon="minus"
                mode="contained"
                iconColor="white"
                containerColor="#D41212"
                style={{ alignSelf: "flex-end", width: 40, marginBottom: -60, marginRight: 60 }}
                onPress={() => {
                  handleDeleteCombVal()
                }}
              />
          <IconButton icon="plus-circle" mode="contained"  iconColor="white" containerColor="#00469A" style={{ alignSelf: "flex-end", width: 40, marginTop: 20 }} onPress={()=> handleAddCombVal()}/>
        </Card.Content>
      </Card>

      <View style={{ height: 50 }}></View>
    </ScrollView>

  );
};

export default EntryScreen;
