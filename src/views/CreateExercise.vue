<template>
  <div class="create-exercise">
    <v-container>
      <v-card class="pa-md-4 mx-lg-auto mt-16 rounded-xl" width="800px" color="primary">
        <v-row>
          <v-col>
            <h2 class="d-flex justify-center">Nuevo ejercicio</h2>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <h4 class="justify-center">Nombre</h4>
          </v-col>
        </v-row>
        <v-text-field
            value="10"
            rounded
            flat
            outlined
            light
            hide-details
            background-color="white"
        ></v-text-field>

        <v-row>
          <v-col>
            <h4 class="justify-center">Descripción</h4>
          </v-col>
        </v-row>
        <v-text-field
            value="10"
            rounded
            flat
            outlined
            light
            hide-details
            background-color="white"
        ></v-text-field>

        <v-row align="center" justify="center">
          <v-col cols="12" md="10">
            <h4>Series</h4>
          </v-col>
          <v-col md="2">
            <v-text-field
                value="10">
              <v-icon slot="prepend">mdi-minus</v-icon>
              <v-icon slot="append">mdi-plus</v-icon>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row align="center" justify="center">
          <v-col cols="12" md="10">
            <h4>Duración</h4>
          </v-col>
          <v-col md="2">
            <v-text-field value="10">
              <v-icon slot="prepend">mdi-minus</v-icon>
              <v-icon slot="append">mdi-plus</v-icon>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-select v-model="difficulty" :items="levels" label="Dificultad"
                      rounded
                      flat
                      outlined
                      light
                      hide-details
                      background-color="white"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <h4 class="justify-center">Archivos</h4>
          </v-col>
        </v-row>

        <v-row>
          <v-card class="rounded-lg" style="height: 100px; width: 100px; margin-left: 10px; margin-right: 10px">
            <v-file-input class="justify-center align-center" style="height: 100%; padding-top: 0; margin-top: 0" prepend-icon="mdi-plus" hide-input multiple></v-file-input>
          </v-card>
          <v-card class="rounded-lg" style="height: 100px; width: 100px; margin-left: 10px; margin-right: 10px">
            <v-file-input class="justify-center align-center" style="height: 100%; padding-top: 0; margin-top: 0" prepend-icon="mdi-plus" hide-input multiple></v-file-input>
          </v-card>
          <v-card class="rounded-lg" style="height: 100px; width: 100px; margin-left: 10px; margin-right: 10px">
            <v-file-input class="justify-center align-center" style="height: 100%; padding-top: 0; margin-top: 0" prepend-icon="mdi-plus" hide-input multiple></v-file-input>
          </v-card>
          <v-card class="rounded-lg" style="height: 100px; width: 100px; margin-left: 10px; margin-right: 10px">
            <v-file-input class="justify-center align-center" style="height: 100%; padding-top: 0; margin-top: 0" prepend-icon="mdi-plus" hide-input multiple></v-file-input>
          </v-card>
          <v-card class="rounded-lg" style="height: 100px; width: 100px; margin-left: 10px; margin-right: 10px">
            <v-file-input class="justify-center align-center" style="height: 100%; padding-top: 0; margin-top: 0" prepend-icon="mdi-plus" hide-input multiple></v-file-input>
          </v-card>
          <v-card class="rounded-lg" style="height: 100px; width: 100px; margin-left: 10px; margin-right: 10px">
            <v-file-input class="justify-center align-center" style="height: 100%; padding-top: 0; margin-top: 0" prepend-icon="mdi-plus" hide-input multiple></v-file-input>
          </v-card>
        </v-row>

        <v-row>
          <v-col>
            <v-select v-model="category" :items="categories" label="Categoría"
                      rounded
                      flat
                      outlined
                      light
                      hide-details
                      background-color="white"
            ></v-select>
          </v-col>
        </v-row>

        <v-row align="center" justify="center" class="mb-4">
          <v-btn color="secondary" elevation="2" rounded @click="createExercise">Crear</v-btn>
        </v-row>

      </v-card>

      <v-dialog>

      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CreateExercise",
  data() {
    return {
      // exercise fields
      name: '',
      description: '',
      series: null,
      duration: null,
      difficulty: '',
      files: [],
      category: '',
      // preloaded data
      categories: ['Aeróbico', 'Resistencia', 'Fuerza', 'Otro...'],
      levels: ['Baja', 'Media', 'Alta']
    }
  },
  methods: {
    createExercise(){
      const exercise = {
        name: this.name,
        description: this.description,
        series: this.series,
        duration: this.duration,
        difficulty: this.difficulty,
        files: this.files,
        category: this.category
      }
      console.log(exercise);
    },
    newCategory(category){
      this.categories.push(category);
    },
    addFile(file){
      this.files.push(file);
    }
  }
};
</script>

<style scoped></style>
