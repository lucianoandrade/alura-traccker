<template>
  <section class="projetos">
      <h1 class="title">Projetos</h1>
      <form @submit.prevent="salvar">
          <fieldset class="field">
              <label for="nomeDoProjeto" class="label">
                  Nome do Projeto
              </label>
              <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto"/>
          </fieldset>
          <fieldset class="field">
              <button class="button" type="submit">Salvar</button>
          </fieldset>
      </form>
      <table class="table is-fullwidth">
          <thead>
              <tr>
                  <th>Id</th>
                  <th>Nome</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="projeto in projetos" :key="projeto.id">
                  <td>{{ projeto.id }}</td>
                  <td>{{ projeto.nome }}</td>
              </tr>
          </tbody>
      </table>
  </section>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Projetos",
  data () {
      return  {
          nomeDoProjeto: ''
      };
  },
  methods: {
      salvar () {
        this.store.commit("ADICIONA_PROJETO", this.nomeDoProjeto);
        this.nomeDoProjeto = '' 
      }
  },
  setup () {
    const store = useStore();
    return {
        store,
        projetos: computed(() => store.state.projetos)
    }
  }
})

</script>

<style scoped>
.projetos {
  padding: 1.25rem;
  color: inherit;
}
.title, .label  {
    color: inherit
}

table {
    border-radius: 4px;
    margin: 8px 0;
}

</style>