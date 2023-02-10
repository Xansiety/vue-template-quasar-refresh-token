
<script setup lang="ts">
import DarkToogle from '../../theme/DarkToogle.vue';

</script>

<template>
   <q-layout view="hHh lpR fFf">
     
     <q-header reveal class="bg-primary text-white">
       <q-toolbar>
         <q-toolbar-title>
           <q-avatar>
             <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
           </q-avatar>
           Title
         </q-toolbar-title>
         <DarkToogle />
       </q-toolbar>
     </q-header> 
     <q-page-container> 
       <q-page class="window-width row justify-center items-center">
         <router-view />
       </q-page>
     </q-page-container> 
   </q-layout>
 </template>

