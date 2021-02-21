<template>
  <q-page class="q-pa-lg bg-grey-main text-grey-7 font-mono">
    <div class="row full-width q-col-gutter-md justify-center">
      <div class="text-gray-7 text-h5">
        here is the text we want to scroll
      </div>
      <q-input
        v-model="text"
        class="full-width full-height text-grey-7"
        color="text-grey-7"
        bg-color="bg-grey-main"
        type="textarea"
      />
    </div>
    <tele-prompt v-show="!!text" :text="text"></tele-prompt>
  </q-page>
</template>

<script>
import text from '../assets/text.js'
import TelePrompt from '../components/TelePrompt'

export default {
  name: 'PageIndex',
  components: {
    TelePrompt
  },
  data () {
    return {
      text
    }
  }
}
</script>
