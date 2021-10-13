<template>
  <v-container>
    <v-card class="mt-5 mb-5 mr-15 ml-15 pa-2" color="#76eaab" elevation="8">
      <v-row>
          <v-col md="1"><!-- Aca va el boton para volver hacia atras --></v-col>
          <v-col md="10"><h1><b>Buscar Rutinas</b></h1></v-col>
          
        </v-row>


      <v-data-iterator
        :items="items"
        :items-per-page="itemsPerPage"
        :page="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        v-bind="$attrs"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar
            light
            flat
            color="transparent"
            class="mb-1"
          >
            <v-text-field
              v-model="search"
              clearable
              flat
              outlined
              dense
              solo-inverted
              hide-details
              label="Buscar"
              dark
            ></v-text-field>
            <v-btn
              elevation="2"
              fab
              color="#333C8E"
              dark
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-btn
                elevation="2"
                fab
                color="#333C8E"
                dark
              >
                <v-icon>mdi-sort</v-icon>
              </v-btn>
            </template>
          </v-toolbar>
        </template>
        <template v-slot:default="props">
          <v-row>
            <v-col v-for="item in props.items" :key="item.name" cols="12" sm="3">
              <v-card
                color="transparent"
                outlined                
              >
                <v-col justify="space-between">
                  <v-row rows="auto">
                    <v-tab @click="overlay = !overlay" text>
                    <v-img  :src="item.backgroundImage" @click="openViewRoutine()">

                    </v-img></v-tab>
                    
                  </v-row>
                  <v-row rows="auto">
                    <v-list-item-content>{{ item.name }}</v-list-item-content>
                  </v-row>
                </v-col>
                        
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>

      <v-overlay :absolute="absolute" :value="overlay" >

          <ViewRoutine  v-if="viewroutine" @closeViewRoutine="viewroutins=false" @click="overlay = false">
           <v-btn color="success" @click="overlay = false" > </v-btn>
          </ViewRoutine>

      </v-overlay>

    </v-card>
  </v-container>
</template>

<script>
import ViewRoutine from '@/components/viewRoutine.vue'

  export default {
    inheritAttrs: false,
    components: {
      ViewRoutine,
    },
    methods:{
      openViewRoutine(){
        this.viewroutine = true;
      },
    },
    data: () => ({
      viewroutine : false,
      absolute: true,
      overlay: false,

      search: '',
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: 'name',
      items: [
        {
          name: 'Rutina 1',
          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        },
        {
          name: 'Rutina 2',
          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        },
        {
          name: 'Rutina 3',
          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        },
        {
          name: 'Rutina 4',
          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        },
        {
          name: 'Rutina 5',
          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        },
        {
          name: 'Rutina 6',
          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        },
        {
          name: 'Rutina 7',
          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        },
        {
          name: 'Rutina 8',
          backgroundImage: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/01/blogilates-group-800x542.jpg",
        },
      ],
    }),
  }
</script>
