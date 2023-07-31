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
      <div class="column">
        <button class="button ml-2" @click="tarefaClicada">
          <span class="icon is-small">
              <i class="fas fa-pencil-alt"></i>
          </span>
        </button>
        <button class="button ml-2 is-danger" @click="deletarTarefa(tarefa)">
            <span class="icon is-small">
                <i class="fas fa-trash"></i>
            </span>
        </button>
      </div>
    </div>
  </BoxMain>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { REMOVER_TAREFA } from "@/store/tipo-acoes";
import CronometroMain from "./CronometroMain.vue";
import ITarefa from '../interfaces/ITarefa';
import BoxMain from './BoxMain.vue';
import { useStore } from "@/store";
import useNotificador from "@/hooks/notificador";
import { TipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
  name: "TarefaMain",
  components: {
    CronometroMain,
    BoxMain
  },
  emits: ['aoTarefaClicada'],
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true
    }
  },
  methods: {
    tarefaClicada() : void {
      this.$emit('aoTarefaClicada', this.tarefa)
    },
    deletarTarefa(tarefa: ITarefa) : void {
      this.store.dispatch(REMOVER_TAREFA, tarefa).then(() => {
        this.notificar(TipoNotificacao.ATENCAO, 'Deletada!', 'A Tarefa foi deletada!')
      })
    }
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return {
      store,
      notificar
    }
  }
});
</script>