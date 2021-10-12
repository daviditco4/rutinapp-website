<template>
  <v-card class="mx-auto text-center" width="1100" >
    
    <v-list>
      <v-list-group :value="true" prepend-icon="mdi-help">
        <template v-slot:activator>
        <v-list-item-title>¿Quiénes somos?</v-list-item-title> </template>
        <v-list-item >
            <!-- <v-list-item-title >
              <h5> Somos </h5>
            </v-list-item-title> -->
             <h5 class="text-center"> 
               Somos estudiantes del ITBA.
               Creamos esta pagina donde podran crear/editar/mirar rutinas y ejercicios,
               y podran visualizarlos dentro de la pagina o en la apliacion.

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
              <v-list-item-title>Mi Biblioteca</v-list-item-title>              
            </v-list-item-content>
          </template>

         <v-list-item >
             <h5 class="text-center"> 
               Podran visualizar las rutinas creadas por el usuario activo y filtrar 
               su busqueda para un mejor acceso.
                </h5>
          </v-list-item>
        </v-list-group>
      </v-list-group>


      <v-list-group :value="true" prepend-icon="mdi-weight-lifter">
          <template v-slot:activator>
          <v-list-item-title>Crear Rutina</v-list-item-title> </template>
          <v-list-item >

              <h5 class="text-center"> 
                Se puede acceder a la creacion de un ejercicio mediante la barra 
                de tareas en el borde de arriba, o en el inicio donde se vera 
                "Crear rutina o ejercicio", se piden los datos:
                <br/>
                -Nombre
                <br/>
                -Descripcion
                <br/>
                -Ciclos
                </h5>
            </v-list-item>
      </v-list-group>
      
      <v-list-group :value="true" prepend-icon="mdi-dumbbell">
          <template v-slot:activator>
          <v-list-item-title>Crear Ejercicio</v-list-item-title> </template>
          <v-list-item >

              <h5 > 
                Se puede acceder a la creacion de un ejercicio mediante la barra 
                de tareas en el borde de arriba, o en el inicio donde se vera 
                "Crear rutina o ejercicio", se piden los datos:
              <br/>
                -Nombre
                <br/>
                -Descripcion
                <br/>
                -Series
                <br/>
                -Duracion
                <br/>
                -Archivos (de forma opcional)
                <br/>
                -Categoria
                
                </h5>
            </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<style >

.v-application .v-card{
  background: '#333C8E';
}
.v-application .primary--text {
    color: black !important;
}
</style>