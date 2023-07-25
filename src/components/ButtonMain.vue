<template>
  <button v-if="buttonAction" class="button" @click="buttonAction" :disabled="disabledButton">
    <span v-if="iconButton" class="icon">
      <i :class="iconButton"></i>
    </span>
    <span>{{ titleButton }}</span>
  </button>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
export default defineComponent({
  name: "ButtonMain",
  props: {
    buttonAction: {
      type: Function as PropType<() => void>,
      required: true
    },
    disabledButton: {
      type: Boolean,
      default: false
    },
    iconButton: {
      type: String,
      default: ""
    },
    titleButton: {
      type: String,
      default: ""
    }
  },
});
</script>

<!-- 
  Opinião do instrutor Alura - O componente Botao.vue poderia ser assim:
  <template>
  <button class="button" @click="clicado" :disabled="desabilitado">
    <span class="icon">
      <i :class="icone"></i>
    </span>
    <span>{{texto}}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Botao",
  emits: ['clicado'],
  props: {
    desabilitado: {
      type: Boolean
    },
    icone: {
      type: String,
      required: true
    },
    texto: {
      type: String,
      required: true
    },
  },
  methods: {
    clicado () : void {
      this.$emit('clicado')
    }
  }
});
</script>
 -->


 <!-- fim da aula dois:<template>
   
  Emitir eventos customizados;
Aprendemos a utilizar o $emit para criar eventos utilizados na comunicação entre componentes.
Ouvir eventos customizados.
Aprendemos que ouvir eventos customizados é tão simples quanto ouvir eventos HTML, como o click por exemplo.

 </template>
 
 <script>
 export default {
 
 }
 </script>
 
 <style>
 
 </style> -->