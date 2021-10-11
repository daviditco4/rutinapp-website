<template>
  <v-card color="primary" class="mx-auto text-center" width="1100" >
    <v-list>
      <v-list-group :value="true" prepend-icon="mdi-help">
        <template v-slot:activator>
        <v-list-item-title>¿Quiénes somos?</v-list-item-title> </template>
        <v-list-item >
            <!-- <v-list-item-title >
              <h5> Somos </h5>
            </v-list-item-title> -->
             <h5 class="text-center"> Somos una pagina donde podran crear rutinas y ejercicios,
                  podran visualizarlos dentro de la pagina o en la apliacion.
                </h5>
          </v-list-item>
      </v-list-group>

      <v-list-group :value="true" prepend-icon="mdi-account-circle" >
        <template v-slot:activator>
          <v-list-item-title>Perfil</v-list-item-title>
        </template>

        <v-list-group :value="true" no-action sub-group >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Mis Biblioteca</v-list-item-title>
            </v-list-item-content>
          </template>

         <v-list-item >
             <h5 class="text-center"> Podran visualizar las rutinas creadas por ustedes
                </h5>
          </v-list-item>
        </v-list-group>
      </v-list-group>


      <v-list-group :value="true" prepend-icon="mdi-help">
          <template v-slot:activator>
          <v-list-item-title>Crear Rutina</v-list-item-title> </template>
          <v-list-item >

              <h5 class="text-center"> 
                  </h5>
            </v-list-item>
      </v-list-group>
      
      <v-list-group :value="true" prepend-icon="mdi-help">
          <template v-slot:activator>
          <v-list-item-title>Crear Ejercicio</v-list-item-title> </template>
          <v-list-item >

              <h5 class="text-center"> 
                  </h5>
            </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>