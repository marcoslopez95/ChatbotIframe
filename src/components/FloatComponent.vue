<script setup>
import { ref, reactive, onMounted } from 'vue'
// import { ChatBot } from '@/ChatBot.js'
import MessageComponent from '@/components/MessageComponent.vue'
import axios from 'axios'

const url = 'https://expobelleza.makeidpro.com/api';
const scrollChat = ref()
// const chatbot = window.CHATBOT ?? new ChatBot()
const showChat = ref(false)
const messages = reactive([])
const chatSelected = ref()
const clickInChat = (chat) => {
  messages.length = 0
  chatSelected.value = chat
  showChat.value = true
  messages.push({
    message: '¡Hola! ¿En qué puedo ayudarte?',
    type: 'bot'
  })
}

const messageInText = ref('')
const loading = ref(false)
const scrollIntoLastItem = () => setTimeout(()=>{
    const item = document.querySelector('#chatContainer div.v-virtual-scroll__item:last-child')
    item.scrollIntoView({ behavior: 'smooth', block: 'end' })
  },50)
const pushMessage = async() => {
  const data = { message: messageInText.value}
  messages.push({
    'message': messageInText.value,
    'type': 'user'
  })
  scrollIntoLastItem()
  loading.value = true
  messageInText.value = ''
  const res = await axios.post(`${url}/chatbots/${chatSelected.value.id}/chat`, data)
  const {content} = res.data
  messages.push({
    message: content,
    'type': 'bot'
  })

  loading.value = false
  scrollIntoLastItem()
  document.getElementById('inputChatbot').focus()

}

const listChats = reactive([])
const getChatBots = async () => {
  const res = await axios.get(`${url}/chatbots/get`)
  const {data} = res
  Array.from(data.data).forEach(({id, attributes, relationships}) => listChats.push({
    id,
    name:attributes.name,
    img: relationships.image
  }))
}

onMounted(() => {
  getChatBots()
})
const openMenu = ref(false)
</script>

<template>
  <div id="chatbot-float">
    <VMenu :close-on-content-click="false" :close-on-back="false" persistent @keydown.prevent.enter="(e) => e.preventDefault()">
      <template #activator="{ props: propsMenu }">
        <VHover>
          <template v-slot:default="{ isHovering, props }">
            <VBtn icon color="transparent" :size="60" v-bind="propsMenu" @click="openMenu = true">
              <VIcon
                id="icon"
                v-bind="props"
                icon="mdi-whatsapp"
                :color="isHovering ? 'green' : 'red'"
                :size="50"
              />
            </VBtn>
          </template>
        </VHover>
      </template>
      <VCard class="bg-container-chatbot overflow-hidden" width="300" height="560" rounded="xl">
        <div v-show="!showChat" >
          <div id="chatHeader" style="height: 50px" class="mb-4 d-flex pl-3 pt-5">
            <div class="text-center w-100">
              <span class="title-chatbot">Seleccione un chat</span>
            </div>
          </div>
          <div id="chatCategories" style="overflow: auto; height: 500px">
            <div v-for="(item,i) in listChats" :key="i">
              <VContainer fluid>
                <VRow>
                  <VCol cols="12">
                    <MessageComponent id="categoryChatBot" class="ml-auto" @click="clickInChat(item)">{{ item.name }}</MessageComponent>
                  </VCol>
                </VRow>
              </VContainer>
            </div>
          </div>
        </div>
        <div v-show="showChat">
          <div id="chatHeader" style="height: 50px" class="mb-4 d-flex pl-3 pt-5">
            <VBtn id="chatBtnTitle" class="" @click="showChat = false" icon size="small">
              <VIcon icon="mdi-chevron-left"></VIcon>
            </VBtn>
            <div id="chatTitle" class="text-center w-100">
            <span class="title-chatbot">{{ chatSelected?.name ?? '' }}</span>
            </div>
          </div>
          <v-virtual-scroll :items="messages" height="432" ref="scrollChat" id="chatContainer">
            <template #default="{ item }">
              <VContainer fluid>
                <VRow>
                  <VCol cols="12" >
                    <MessageComponent :type="item.type" :img="chatSelected.img">
                      <span v-html="item.message" />
                    </MessageComponent>
                  </VCol>
                </VRow>
              </VContainer>
            </template>
          </v-virtual-scroll>
          <div id="chatInputContainer" class=" px-2 py-3 bg-white">
            <VTextField
              ref="fieldInput"
              variant="outlined"
              single-line
              id="inputChatbot"
              density="compact"
              hide-details
              v-model="messageInText"
              autofocus
              :loading="loading"
              @keydown.enter.prevent.stop="pushMessage"
            >
              <template #append>
                <VBtn  id="chatInputBtn" variant="flat" :loading="loading" icon="mdi-send-variant" size="small" @click="pushMessage" :disabled="loading"/>
              </template>
            </VTextField>
          </div>
        </div>
      </VCard>
    </VMenu>
  </div>
</template>

<style>

</style>
