<template>
    <FormularioMain @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <TarefaMain 
          v-for="(tarefa, index) in tarefas" 
          :key="index" 
          :tarefa="tarefa"
          @ao-tarefa-clicada="selecionarTarefa"
        />
        <BoxMain v-if="listaEstaVazia">
        Você não está muito produtivo hoje :(
        </BoxMain>
        <div class="modal"
          :class="{'is-active' : tarefaSelecionada}"
          v-if="tarefaSelecionada"
        >
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Editando uma tarefa</p>
              <button @click="fecharModal"
                class="delete" 
                aria-label="close"
              ></button>
            </header>
            <section class="modal-card-body">
              <div class="field">
                <label for="descricaoDaTarefa" class="label">
                  Descrição
                </label>
                <input 
                  type="text" 
                  class="input" 
                  v-model="tarefaSelecionada.descricao" 
                  id="descricaoDaTarefa"
                >
              </div>
            </section>
            <footer class="modal-card-foot">
              <button 
                @click="alterarTarefa"
                class="button is-success"
              >
                Salvar alterações
              </button>
              <button 
                @click="fecharModal"
                class="button"
              >
                Cancelar
              </button>
            </footer>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import FormularioMain from "../components/FormularioMain.vue";
import TarefaMain from "../components/TarefaMain.vue";
import BoxMain from "../components/BoxMain.vue";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from "@/store/tipo-acoes";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  name: "TarefaView",
  components: {
    FormularioMain,
    TarefaMain,
    BoxMain,
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
        this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa
    },
    fecharModal() {
      this.tarefaSelecionada = null
    },
    alterarTarefa() {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada).then(() => this.fecharModal())
    }
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    return {
      tarefas: computed(() => store.state.tarefas),
      store,
    };
  },
});
</script>
