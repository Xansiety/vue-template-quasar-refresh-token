<script setup lang="ts">
import { ref } from 'vue';
import { Credentials } from '../interfaces/index';
import { useUserAuth } from '../../composables/useUserAuth';

const { singInUser } = useUserAuth();

const credentials = ref<Credentials>({
    usuario: '',
    password: ''
}) 
 
const onSubmit = async () => {
    const respuesta = await singInUser({ usuario: credentials.value.usuario,password: credentials.value.usuario  }); 
} 
</script>

<template>
   <div class="column q-pa-lg row"> 
    <div class="row">
      <q-card square class="shadow-6" style="width:50vh;height:450px;">
        <q-form class="q-px-sm q-pt-md" @submit="onSubmit">
          <q-card-section class="bg-primary">
            <h4 class="text-h5 text-white q-my-md text-center">My new App</h4> 
          </q-card-section>
          <q-card-section class="q-mt-md"> 
              <q-input ref="usuario"  label="Usuario" outlined clearable v-model="credentials.usuario" 
                       type="text" :rules="[ val => val && val.length > 0 || 'Campo obligatorio']" >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <q-input ref="password"  label="Contraseña" outlined clearable v-model="credentials.password" 
                       type="text" :rules="[ val => val && val.length > 0 || 'Campo obligatorio']">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input> 
            
          </q-card-section> 

          <q-card-actions class="q-px-lg">
            <q-btn 
                   unelevated 
                   size="lg" 
                   color="secondary"
                    type="submit"
                   class="full-width text-white" label="Ingresar" />
          </q-card-actions> 
          </q-form>
        </q-card>
      </div> 
    </div>
</template>

<style scoped>

</style>