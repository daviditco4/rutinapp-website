<template>

<v-card class="pa-md-4 mx-lg-auto mt-16 rounded-xl" width="800px" color="primary">
        <v-row align="center">
          <v-col cols="12" md="3">
            <h4 class="mb-n1">Ciclo 1</h4>
            <h4>Calentamiento</h4>
          </v-col>
          <v-col md="2" class="ml-auto">
            <v-text-field value="10">
              <v-icon slot="prepend">mdi-minus</v-icon>
              <v-icon slot="append">mdi-plus</v-icon>
            </v-text-field>
          </v-col>
          <v-col md="2">
            <h4>Repeticiones del ciclo</h4>
          </v-col>
        </v-row>

          <!--        <ul>-->
        <v-row align="center" style="margin-bottom: -20px">
          <v-col cols="12" md="8">
            <h4 class="text-left">1. Ejercicio</h4>
          </v-col>
            <v-col md="2">
                <v-text-field value="10">
                  <v-icon slot="prepend">mdi-minus</v-icon>
                  <v-icon slot="append">mdi-plus</v-icon>
                </v-text-field>
            </v-col>
            <v-col md="2">
              <v-text-field value="10">
                <v-icon slot="prepend">mdi-minus</v-icon>
                <v-icon slot="append">mdi-plus</v-icon>
              </v-text-field>
            </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-row style="margin-left: 10px; margin-bottom: 20px">
              <v-menu transition="scroll-x-transition" style="height: 20px;">
                <template v-slot:activator="{on, attrs}">
                  <v-btn rounded v-on="on" v-bind="attrs" style="min-width: 10px;height: 50px;">
                  <v-icon>
                    mdi-plus
                  </v-icon>
                  </v-btn>
                </template>
                <v-btn-toggle rounded style="margin-left: 60px; background-color: transparent">
                  <v-btn rounded>
                    Ejercicio
                  </v-btn>
                    <v-btn>
                      Descanso
                    </v-btn>
                </v-btn-toggle>
              </v-menu>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
</template>