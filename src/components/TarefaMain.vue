<template>
  <BoxMain>
    <div class="columns">
      <div class="column is-4">{{ tarefa.descricao || 'Tarefa sem descrição' }}</div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || 'N/D' }}
      </div>
      <div class="column">
        <CronometroMain :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
      </div>
    </div>
  </BoxMain>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CronometroMain from "./CronometroMain.vue";
import ITarefa from '../interfaces/ITarefa';
import BoxMain from './BoxMain.vue'

export default defineComponent({
  name: "TarefaMain",
  components: {
    CronometroMain,
    BoxMain
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true
    }
  }
});
</script>

<style scoped>
.box {
  background: #FAF0CA;
}
</style>