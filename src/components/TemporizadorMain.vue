<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <CronometroMain :tempoEmSegundos="tempoEmSegundos" />
    <ButtonMain
      :buttonAction="iniciar"
      :disabledButton="cronometroRodando"
      :iconButton="'fas fa-play'"
      :titleButton="'play'"
    />
    <ButtonMain
      :buttonAction="finalizar"
      :disabledButton="!cronometroRodando"
      :iconButton="'fas fa-stop'"
      :titleButton="'stop'"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ButtonMain from "./ButtonMain.vue";
import CronometroMain from "./CronometroMain.vue";
export default defineComponent({
  name: "TemporizadorMain",
  emits: ["aoTemporizadorFinalizado"],
  components: {
    CronometroMain,
    ButtonMain,
  },
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
    };
  },
  methods: {
    iniciar() {
      // começar a contagem
      // 1 seg = 1000 ms
      this.cronometroRodando = true;
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000);
    },
    finalizar() {
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit("aoTemporizadorFinalizado", this.tempoEmSegundos);
      this.tempoEmSegundos = 0;
    },
  },
});
</script>
