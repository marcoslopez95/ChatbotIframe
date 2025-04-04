<script setup>
import { computed, defineEmits } from 'vue'
const emit = defineEmits(['click'])
const props = defineProps(['type', 'img']);

const getClassType = computed(() => ({
  bot: 'bot-message-chatbot text-start',
  user: 'ml-auto user-message-chatbot text-end'
})[props.type] ?? null)

</script>

<template>
  <div
    v-bind="$attrs"
    class="border py-2 px-2 bg-messages-chatbot text-messages-chatbot"
    style="max-width: 220px"
    @click="emit('click')"
    :class="getClassType"
  >
    <slot></slot>
    <div v-if="type === 'bot'" class="avatar-bot">
      <VImg v-if="img"  :src="img"/>
      <VIcon v-else icon="mdi-robot-happy" />
    </div>
  </div>
</template>

<style scoped>

</style>
