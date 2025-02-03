<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { data } from "./data.js";
import { imgs } from "./imgs.js";

let time = null;
const imgIdx = ref(0);
const contentIdx = ref({
    main: 0,
    sub: 0,
})

const imgHandler = () => {
    imgIdx.value = (imgIdx.value + 1) % imgs.length;
};

const contentHandler = () => {
    const mainIdx = contentIdx.value.main;
    const subIdx = contentIdx.value.sub;
   if (contentIdx.value.sub < data[mainIdx].content.length - 1) {
    contentIdx.value.sub = subIdx+1
   } else {
    contentIdx.value.main = (mainIdx + 1) % data.length;
    contentIdx.value.sub = 0;
    imgHandler()
   }
};
onMounted(() => {
  time = setInterval(() => {
    contentHandler();
  }, 15000);
});

onUnmounted(() => {
  clearInterval(time);
});
</script>

<template>
  <div class="Thanks2025_wrap">
    <div class="imgs">
      <transition-group name="zoom" tag="div" class="imgList">
        <div
          v-for="(item, idx) in imgs"
          :key="idx"
          class="imgWrap"
          v-show="imgIdx === idx"
        >
          <div
            class="imgContent"
            v-for="(img, mIdx) in item"
            :key="mIdx"
            :style="{
              backgroundImage: `url(imgs/thanks2025/${img})`,
            }"
          ></div>
        </div>
      </transition-group>
    </div>
    <div class="filter"></div>
    <div class="content">
      <div class="container" v-for="(item, idx) in data" :key="idx" v-show="contentIdx.main === idx">
        <div class="text" v-for="(text, cIdx) in item.content" :key="cIdx" v-show="contentIdx.sub === cIdx">
          <div>{{ text }}</div>
        </div>
        <div class="name">- {{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Thanks2025_wrap {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: black;
  white-space: pre-wrap;
}
.imgs {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.imgList {
  width: 100%;
  height: 100%;
}
.imgWrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 100%;
}
.imgContent {
  width: 100%;
  height: 100%;
  flex-grow: 1;
  background-position: center;
  background-size: cover;
}

.filter {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000;
  opacity: 0.4;
}
.content {
  padding: 5% 10%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.text {
}
.container {
  font-size: 4.5vh;
  line-height: 1.6;
  font-weight: bold;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.name {
  text-align: right;
}

/* 背景動畫 */
.zoom-enter-active,
.zoom-leave-active {
  transition: all 1s ease;
}
.zoom-enter-from {
  transform: scale(1.1);
  opacity: 0;
}
.zoom-enter-to {
  transform: scale(1);
  opacity: 1;
}
.zoom-leave-from {
  transform: scale(1.1);
  opacity: 1;
}
.zoom-leave-to {
  transform: scale(1);
  opacity: 0;
}
</style>
