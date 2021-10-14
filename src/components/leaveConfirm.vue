<template>
    <v-card flat width="300" class="pa-md-4 mx-lg-auto mt-16 rounded-xl" color="primary">
      <v-row>
        <v-col md="12">
            <h3>¿Deseas cancelar?</h3>
            <p> Se perderan los cambios.</p>
            </v-col>  
      </v-row>
      <v-row>
      </v-row>
      <v-row>
          <v-col md="6">
          <v-btn color="secondary" dark @click="closeDialog">Cancelar</v-btn>
         </v-col>
         <v-col md="6">
          <v-btn color="error" dark @click="deleteRoutine()">Eliminar</v-btn>
         </v-col>
      </v-row>
    </v-card>
</template>