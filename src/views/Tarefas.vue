<template>
  <FormularioMain @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
      <BoxMain v-if="listaEstaVazia">
          Você não está muito produtivo hoje :(
      </BoxMain>
      <TarefaMain v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormularioMain from '../components/FormularioMain.vue';
import TarefaMain from '../components/TarefaMain.vue';
import BoxMain from '../components/BoxMain.vue';
import ITarefa from '../interfaces/ITarefa';

export default defineComponent({
  name: 'TarefaView',
  components: {
      FormularioMain,
      TarefaMain,
      BoxMain
  },
  data() {
      return {
          tarefas: [] as ITarefa[]
      }
  },
  computed: {
      listaEstaVazia(): boolean {
          return this.tarefas.length === 0
      }
  },
  methods: {
      salvarTarefa(tarefa: ITarefa) {
          this.tarefas.push(tarefa)
      }
  }
});
</script>