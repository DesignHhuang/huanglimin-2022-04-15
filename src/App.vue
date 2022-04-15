<template>
  <div class="cover" v-show="heng">
    <img class="scape" alt="scape" :src="scape" />
  </div>
  <img class="logo" alt="bg" :src="logo" />
  <div class="card-warp" ref="warpRef">
    <div class="card-con">
      <div class="character" :key="character.id" v-for="character in characters">
        <img class="character-item" alt="character" :src="cjpg" />
      </div>
      <div class="last">
        <div class="last-char" :key="four.id" v-for="character in four">
          <img class="character-item" alt="character" :src="cjpg" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import cjpg from "/@/assets/img-1.jpg";
import ipad from "/@/assets/ipad.png";
import mobile from "/@/assets/mobile.png";
import logo from "/@/assets/logo.png";
import scape from "/@/assets/scape.png";
import { getCharacters, getLastFour } from "/@/api/mock.ts";
import { useRequest } from "vue-request";
import { deviceDetection } from "/@/utils.ts";

const { data: characters, run: getCharactersAction } = useRequest(getCharacters, {
  manual: true,
});

const { data: four } = useRequest(getLastFour, {
  manual: false,
});

const warpRef = ref();
const lastClientWidth = ref(0);
const size = ref(5);
let timeHandler: any;
const heng = ref(false);
const resizeHandle = (): void => {
  const clientWidth = warpRef.value.clientWidth;
  if (clientWidth === lastClientWidth.value) return;
  lastClientWidth.value = clientWidth;
  clearTimeout(timeHandler);
  // 重新计算
  timeHandler = setTimeout(() => {
    size.value = parseInt(clientWidth / 374) * 2;
    size.value < 6
      ? getCharactersAction({ size: 5 })
      : getCharactersAction({ size: size.value - 1 });
  }, 500);
};

const orientationchange = (): void => {
  if (window.orientation == 90 || window.orientation == -90) {
    heng.value = true;
    document.body.style.overflow = "hidden";
  } else if (window.orientation == 0 || window.orientation == 180) {
    heng.value = false;
    document.body.style.overflow = "auto";
  }
};

onMounted(() => {
  setTimeout(() => {
    resizeHandle();
  }, 500);
  window.addEventListener("resize", resizeHandle);
  window.addEventListener("orientationchange", orientationchange);
});
</script>

<style>
.cover {
  position: absolute;
  background-color: #00000080;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.scape {
  width: 300px;
  animation: trunround 1s linear infinite;
}
@keyframes trunround {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(90deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
  }
}
.character {
  margin: 12px;
  width: 350px;
  height: 350px;
}
.card-con {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card-warp {
  padding-top: 80px;
}
.last {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 350px;
  height: 350px;
  margin: 0 12px;
}
.character-item {
  width: 100%;
  height: 100%;
}
.last-char {
  width: 163px;
  height: 163px;
  margin: 12px 0;
}
.logo {
  position: absolute;
  top: 0;
}
</style>
