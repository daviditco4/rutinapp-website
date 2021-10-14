<template >
        <v-card flat style="padding-top:30px" width="500" class="pa-md-4 mx-lg-auto mt-16 rounded-xl" color="primary">
          <v-row>
            <v-btn rounded @click="closeCardViewRoutine" color="#333C8E" dark >
              <v-icon left>
                mdi-close
              </v-icon>
            </v-btn>

            <v-card-title primary-title class="d-flex justify-center" style="color:#333C8E; font-size:24px;">
              {{routine.name}}
            </v-card-title>
          </v-row>

          <v-card-actions>
            <v-col >

              <v-row >
                <v-col>
                  <v-row>
                    <div offset-sm="3">
                      <v-img :src="routine.metadata.image" height="170" width="170"></v-img>
                    </div>
                  </v-row>

                  <v-row>
                    <h4> Dificultad: {{getDifficulty()}}</h4>
                  </v-row>

                </v-col>

                <v-card class="mx-auto" max-width="700" rounded color="secondary">

                  <v-list color="secondary" dark>
                    <v-list-group
                        v-for="item in items"
                        :key="item.title"
                        v-model="item.active"
                        :prepend-icon="item.action"
                        no-action
                    >
                      <template v-slot:activator>
                        <v-list-item-content>
                          <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                      </template>

                      <v-list-item
                          v-for="child in item.items"
                          :key="child.title"
                      >
                        <v-list-item-content>
                          <v-list-item-title v-text="child.title"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-group>
                  </v-list>
                </v-card>

              </v-row>
            </v-col>

          </v-card-actions>


        </v-card>

</template>


<script>
  export default {
  name: "ViewRoutine",
  props: ['routine'],

    data: () => ({
      items: [
        {
          items: 
          [{ title: 'Ejercicio 1' }],
          active: true,
          title: 'Calentamiento',
        },
        {
          items: [
            { title: 'Ejercicio 1' },
            { title: 'Ejercicio 2' },
            { title: 'Ejercicio 3' },
          ],
          active: true,
          title: 'Ciclo 2',
        },
        {
          items: [{ title: 'Ejercicio 1' }],
          active: true,
          title: 'Ciclo 3',
        },
        
      ],
    }),
    methods:{
      closeCardViewRoutine() {
        this.$emit('closeViewRoutine');
    },
    getDifficulty() {
      if (this.routine.difficulty === "rookie")
        return "Novato";
      if (this.routine.difficulty === "beginner")
        return "Principiante";
      if (this.routine.difficulty === "intermediate")
        return "Intermedio";
      if (this.routine.difficulty === "advanced")
        return "Avanzado";
      if (this.routine.difficulty === "expert")
        return "Experto";
    }
    },
  }
</script>