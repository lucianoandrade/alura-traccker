import IProjeto from "@/interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore} from "vuex"; //vuexUseStore é o nome(variavel que demos pra useStore, para não conflitar com o useStore que criamos)
import { InjectionKey } from "vue";

interface Estado {
  projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: []
  },
  mutations: {
    'ADICIONA_PROJETO'(state, nomedoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomedoProjeto
      } as IProjeto;
      state.projetos.push(projeto);
    }
  }
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}