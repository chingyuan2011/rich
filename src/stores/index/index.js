import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import { fetchData, cardHandler } from "./process.js";

// https://docs.google.com/spreadsheets/d/1Np4BAKjkspdUJI9QNKXCvRgojvvZGU4LdynWMHFOk3k/edit?resourcekey=&gid=1002593271#gid=1002593271

export const useIndexStore = defineStore("index", () => {
  const personData = ref({});
  const data = ref([]);

  const getRoleData = (value) => personData.value[value] || null;

  const formState = {
    apiKey: "AIzaSyCZgrWUDYg4zJ2d9OwYn-MsfrgAv2nlLRQ",
    sheetID: "1Np4BAKjkspdUJI9QNKXCvRgojvvZGU4LdynWMHFOk3k",
    range: "表單回應 1",
  };

  onMounted(async () => {
    data.value = await fetchData(formState);
    personData.value = await cardHandler(data.value);
  });

  return {
    getRoleData,
  };
});
