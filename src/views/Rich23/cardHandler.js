import { ref, onMounted, computed } from "vue";
import {cloneDeep} from 'lodash'
import { useGoogleSheet } from "@/composables/useGoogleSheet/index.js";

export const cardHandler = () => {
  const sheetID = "1BKOwI8fygLK49qSPZGBklb4c9bwavLfnEhYetyPMqTs";

  const { getSheetData } = useGoogleSheet();
  const cardData = ref([]);
  const defaultCard = ref([]);
  const roleData = ref([]);

  const defaultCardMap = computed(() => {
    const tempCardData = cloneDeep(defaultCard.value)
    tempCardData.shift()

    const result = tempCardData.reduce(
      (acc, curVal) => {
        const nCardMap = transformCard(curVal);
        Object.keys(nCardMap).forEach((key) => {
          if (!acc[key]) {
            acc[key] = {
              role: [],
              name: key,
              cards: [],
            };
          }
          acc[key].cards.push(nCardMap[key]);
        });

        return acc;
      },
      {}
    );

    return result;
  })

  const cardMap = computed(() => {
    const tempCardData = cloneDeep(cardData.value)
    tempCardData.shift()
    const result = tempCardData.reduce(
      (acc, curVal) => {
        const nCardMap = transformCard(curVal);
        Object.keys(nCardMap).forEach((key) => {
            if(!acc[key]) {
                acc[key] = {
                    role: [],
                    name: key,
                    cards: []
                }
            }
            acc[key].cards.push(nCardMap[key])
        })

        return acc;
      },
      {}
    );

    setRole(result)

    return result;
  });

  const setRole = (cardMap) => {
    console.log(defaultCardMap.value, roleData.value)
    const tempRoleData = cloneDeep(roleData.value)
    tempRoleData.shift()
    tempRoleData.forEach((data) => {
      const [role, ...rest] = data;
    //   console.log(role, rest)
    //   if(cardMap[`${group}${name}`]) {
    //     cardMap[`${group}${name}`].role = role
    //   }
    })
  }

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

  onMounted(async () => {
    cardData.value = await getSheetData({
      sheetID,
      name: "影23感恩小卡",
    });
    defaultCard.value = await getSheetData({
      sheetID,
      name: "影23預設卡片",
    });
    roleData.value = await getSheetData({
      sheetID,
      name: "影23身份",
    });
  });

  return {
    cardMap,
  };
};
