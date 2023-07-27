import { createStore, Store, useStore as vuexUseStore} from "vuex"; //vuexUseStore é o nome(variavel que demos pra useStore, para não conflitar com o useStore que criamos)
import { InjectionKey } from "vue";
import { 
  ADICIONA_TAREFA, 
  ALTERA_TAREFA, 
  DEFINIR_TAREFAS, 
  NOTIFICAR 
} from "./tipo-mutacoes";
import { 
  ALTERAR_TAREFA, 
  CADASTRAR_TAREFA,
  OBTER_TAREFAS,
} from "./tipo-acoes";
import { INotificacao } from "@/interfaces/INotificacao";
import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { EstadoProjeto, projeto } from "./modulos/projetos";

export interface Estado {
  notificacoes: INotificacao[],
  tarefas: ITarefa[],
  projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    notificacoes: [],
    tarefas: [],
    projeto: {
      projetos: []
    }
  },
  mutations: {
    [NOTIFICAR] (state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
          state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
      }, 3000)
    },
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa)
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex(item => item.id == tarefa.id)
      state.tarefas[index] = tarefa
    }
  },
  actions: {
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url ='tarefas'
      if (filtro) {
        url += `?descricao=${filtro}`
      }
      http.get(url)
        .then(response => commit(DEFINIR_TAREFAS, response.data))
    },
    [CADASTRAR_TAREFA] ({ commit }, tarefa: ITarefa) {
      return http.post('/tarefas', tarefa).then(res => commit(ADICIONA_TAREFA, res.data))
    },
    [ALTERAR_TAREFA] ({ commit }, tarefa: ITarefa) {
      return http.put(`/tarefas/${tarefa.id}`, tarefa).then(() => commit(ALTERA_TAREFA, tarefa))
    }
  },
  modules: {
    projeto
  }
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}