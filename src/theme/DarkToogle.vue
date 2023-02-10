<script setup lang="ts">
import { useQuasar } from 'quasar';
import { watch } from 'vue';

const $q = useQuasar()
const isDarkMode = JSON.parse(localStorage.getItem('darkMode') || '{}');

// set status 
$q.dark.set(isDarkMode === "" ? 'auto' : isDarkMode) // or false or "auto"  
watch(() => $q.dark.isActive, val => {
  // console.log(val ? 'On dark mode' : 'On light mode')
  localStorage.setItem("darkMode", JSON.stringify(val))
})
const preferenceUser = () => {
  console.log("entra")
  $q.dark.toggle()

}
</script>

<template>
  <q-btn flat round color="white" :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'" @click="preferenceUser" />
</template>  