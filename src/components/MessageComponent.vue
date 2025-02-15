<script setup>
import {defineEmits} from 'vue'
const emit = defineEmits(['click'])
</script>

<template>
  <div
    class=" text-end border rounded-lg py-2 px-2 bg-messages-chatbot text-messages-chatbot"
    style="max-width: 220px"
    @click="emit('click')"
  >
    <slot></slot>
  </div>
</template>

<style scoped>

</style>
