<template>
  <main class="columns is-gapless is-multiline"><!-- modo-escuro -->
    <div class="column is-one-quarter">
      <BarraLateral />
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioMain @aoSalvarTarefa="salvarTarefa"/>
      <div class="lista">
        <TarefaMain v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <BoxMain v-if="listaEstaVazia">
          Você não está muito produtivo hoje :(
        </BoxMain>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormularioMain from './components/FormularioMain.vue';
import TarefaMain from './components/TarefaMain.vue';
import BoxMain from './components/BoxMain.vue';
import ITarefa from './interfaces/ITarefa';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    FormularioMain,
    TarefaMain,
    BoxMain
  },
  data () {
    return {
      tarefas: [] as ITarefa[]
    }
  },
  computed: {
    listaEstaVazia () : boolean {
      return this.tarefas.length === 0
    }
  },
  methods: {
    salvarTarefa (tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
main {
  --bg-primario: #fff;
  --texto-primario: #000;
}
main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}
.conteudo {
  background-color: var(--bg-primario);
}
</style>