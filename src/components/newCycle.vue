<template>

      <v-card class="pa-md-4 mx-lg-auto mt-16 rounded-xl" width="800px" color="primary">
        <v-row align="center">
          <v-col justify="left" cols="12" md="5">
            <v-text-field class="text-left"
                label="Ciclo 2" solo dense background-color="primary"
            ></v-text-field>          
          </v-col>
          <ModifyCounter  :start-time="10" :addValue="1" ></ModifyCounter> 
          <v-col>
            <p justify="center">Repeticiones del ciclo</p>
          </v-col> 
        </v-row>

          <!--        <ul>-->
        <v-row align="center" style="margin-bottom: -20px">
          <v-col cols="12" md="5">
            <v-text-field class="text-left"
                label="1.Ejercicio" solo dense background-color="primary"
            ></v-text-field>   
          </v-col>
            <v-col md="5">
                <ModifyCounter  :start-time="10" :addValue="1" ></ModifyCounter> 
                <ModifyCounter  :start-time="10" :addValue="1" ></ModifyCounter> 
            </v-col>
            <v-col>
                <p justify="center">series</p>
                <p justify="center">segundos</p>
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
                  <v-btn rounded >
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

<script scoped>

import ModifyCounter from '@/components/modifyCounter.vue'

export default {
  name: "NewCycle",
  components: {
    ModifyCounter,
  },
};
</script>

