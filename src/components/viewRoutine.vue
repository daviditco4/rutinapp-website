<template >
    <v-card flat style="padding-top:30px" width="500" class="pa-md-4 mx-lg-auto mt-16 rounded-xl" color="primary">  
        <v-row>
          <v-btn rounded @click="closeCardViewRoutine" color="#333C8E" dark >
                    <v-icon left>
                      mdi-close
                    </v-icon>
          </v-btn>

          <v-card-title primary-title class="d-flex justify-center" style="color:#333C8E; font-size:24px;">
            RUTINA 1
          </v-card-title>
        </v-row>
        
          <v-card-actions>
           <v-col >
            
              <v-row >
                <v-col>
                <v-row>
                    <h4>Creado por: </h4>
                </v-row>
                <v-row>
                <div offset-sm="2">
                      <v-img src="@/assets/ejercicio.jpeg" height="150" width="150"></v-img>
                </div> 
                </v-row>

                <v-row>
                    <h4> Categoria: </h4>
                    <h4> Dificultad:  </h4>
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
    data: () => ({
      items: [
        {
          items: 
          [{ title: 'Ejercicio 1' }],
          title: 'Calentamiento',
        },
        {
          items: [
            { title: 'Ejercicio 1' },
            { title: 'Ejercicio 2' },
            { title: 'Ejercicio 3' },
          ],
          title: 'Ciclo 2',
        },
        {
          items: [{ title: 'Ejercicio 1' }],
          title: 'Ciclo 3',
        },
        
      ],
    }),
    methods:{
      closeCardViewRoutine() {
        this.$emit('closeViewRoutine');
    },
    },
  }
</script>