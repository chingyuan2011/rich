import { ref, onMounted, computed } from "vue";
import { get, cloneDeep } from "lodash";
import { useGoogleSheet } from "@/composables/useGoogleSheet/index.js";

export const cardHandler = (sheetId) => {
  const { getSheetData } = useGoogleSheet();
  const cardData = ref([]);
  const defaultCard = ref([]);
  const roleData = ref([]);
  const pageConfig = ref([]);

  const pageData = computed(() => {
    const result = {
      title: get(pageConfig.value, "0.1", ""),
      subTitle: get(pageConfig.value, "1.1", ""),
      description: get(pageConfig.value, "2.1", ""),
      owner: get(pageConfig.value, "3.1", ""),
      contributor: get(pageConfig.value, "4.1", ""),
    };

    return result;
  });

  const defaultCardMap = computed(() => {
    const tempCardData = cloneDeep(defaultCard.value);
    tempCardData.shift();

    const result = tempCardData.reduce((acc, curVal) => {
      const fromName = curVal[0];
      const content = curVal[1];
      const role = curVal[2];
      if (!acc[role]) {
        acc[role] = [];
      }
      acc[role].push({
        fromName,
        content,
      });

      return acc;
    }, {});

    return result;
  });

  const cardMap = computed(() => {
    const tempCardData = cloneDeep(cardData.value);
    tempCardData.shift();
    const result = tempCardData.reduce((acc, curVal) => {
      const nCardMap = transformCard(curVal);
      Object.keys(nCardMap).forEach((key) => {
        if (!acc[key]) {
          acc[key] = getInitCard(key);
        }
        acc[key].cards.push(nCardMap[key]);
      });
      return acc;
    }, {});

    setRoleConfig(result);

    return result;
  });

  const getInitCard = (name) => {
    const result = {
      name,
      role: [],
      defaultCards: [],
      cards: [],
      commonCards: commonCards.value
    };
    
    return result;
  };

  const setRoleConfig = (configMap) => {
    const tempRoleData = cloneDeep(roleData.value);
    tempRoleData.shift();
    tempRoleData.forEach((data) => {
      const [role, ...rest] = data;
      const roleCards = defaultCardMap.value[role] || [];
      rest.forEach((name) => {
        const config = configMap[`${name}`];
        if (!config) configMap[name] = getInitCard(name);
        configMap[name].defaultCards.push(...roleCards);
      });
    });
  };

  const commonCards = computed(() => {
    const result = []
    defaultCardMap.value["所有人"] && result.push(...defaultCardMap.value["所有人"])
    return result
  })

  const transformCard = (cardData) => {
    const result = {};
    const [
      time,
      fromGroup,
      fromName,
      group1,
      name1,
      content1,
      group2,
      name2,
      content2,
      group3,
      name3,
      content3,
    ] = cardData;

    name1 &&
      content1 &&
      (result[`${group1}${name1}`] = { fromName: fromName, content: content1 });
    name2 &&
      content2 &&
      (result[`${group2}${name2}`] = { fromName: fromName, content: content2 });
    name3 &&
      content3 &&
      (result[`${group3}${name3}`] = { fromName: fromName, content: content3 });
    return result;
  };

  const getConfig = (value) => {
    const result = get(cardMap.value, value, null);
    if(result)  return cloneDeep(result);
     else {
      return {
        name: value,
        role: [],
        defaultCards: [],
        cards: [],
        commonCards: commonCards.value
      }
    }
  };

  const getData = async ({ sheetId }) => {
     cardData.value = await getSheetData({
      sheetID: sheetId,
      name: "感恩小卡",
    });
    defaultCard.value = await getSheetData({
      sheetID: sheetId,
      name: "預設卡片",
    });
    roleData.value = await getSheetData({
      sheetID: sheetId,
      name: "身份群組",
    });
    pageConfig.value = await getSheetData({
      sheetID: sheetId,
      name: "頁面設定",
    });
  };

  onMounted(async () => {
  
  });

  return {
    getConfig,  
    pageData,
    getData
  };
}; 