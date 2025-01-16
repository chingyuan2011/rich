import { cloneDeep, set } from "lodash";
import { groupNameToIdMap, idToGroupNameMap } from "./list.js";

export const fetchData = async (formState) => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${formState.sheetID}/values/${formState.range}?key=${formState.apiKey}`;
  let fetchData = null;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      fetchData = data.values;
    })
    .catch((error) => console.error("Error:", error));

  return fetchData;
};

export const cardHandler = async (cardsData) => {
  const result = {};
  const roleData = await getRoleData();
  classifyCards(roleData, cardsData);

  Object.entries(roleData).forEach(([key, value]) => {
    const newKey = key + value.role.pos;
    result[newKey] = value;
  });
  return result;
};

const getRoleData = async () => {
  const formState = {
    apiKey: "AIzaSyCZgrWUDYg4zJ2d9OwYn-MsfrgAv2nlLRQ",
    sheetID: "1Np4BAKjkspdUJI9QNKXCvRgojvvZGU4LdynWMHFOk3k",
    range: "本名對照表",
  };
  const originData = await fetchData(formState);
  originData.shift();

  const defaultCardState = {
    apiKey: "AIzaSyCZgrWUDYg4zJ2d9OwYn-MsfrgAv2nlLRQ",
    sheetID: "1Np4BAKjkspdUJI9QNKXCvRgojvvZGU4LdynWMHFOk3k",
    range: "預設卡片",
  };
  const defaultCard = await fetchData(defaultCardState);
  const defaultCardMap = {};
  defaultCard.forEach((item) => {
    defaultCardMap[item[0]] = {
      fromGroup: "系統",
      from: item[2],
      toGroup: null,
      to: null,
      content: item[1],
    };
  });

  const list = [];
  originData.forEach((item) => {
    list.push({
      group: item[0],
      name: item[1],
      identity: item[2],
      pos: item[3],
    });
  });

  const result = {};
  list.forEach((role) => {
    const obj = {
      role: {
        ...role,
        groupName: idToGroupNameMap[role.group],
      },
      cards: [],
    };
    obj.cards.push(defaultCardMap["所有人"]);
    defaultCardMap[role.identity] && obj.cards.push(defaultCardMap[role.identity]);
    result[role.name] = obj;
  });

  return result;
};

const classifyCards = (roleData, cardsData) => {
  const cloneData = cloneDeep(cardsData);
  cloneData.shift();
  cloneData.forEach((card) => {
    const data = {
      fromGroup: card[1],
      from: card[2],
      toGroup: card[3],
      to: card[4],
      content: card[5],
    };
    const target = roleData[data.to];
    if (target) target.cards.push(data);
  });
};
