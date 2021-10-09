<template>
  <v-container class="library">
    <v-card class="mt-5 mb-5 mr-15 ml-15 pa-2" color="#76eaab" elevation="8">
      <h1 style="text-align: center">Mi Biblioteca</h1>
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
              color="primary"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <!-- <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                class="mx-2"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer> -->
              <v-btn
                elevation="2"
                fab
                color="primary"
              >
                <v-icon>mdi-sort</v-icon>
              </v-btn>
              <!-- <v-btn-toggle
                v-model="sortDesc"
                mandatory
              >
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="false"
                >
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="true"
                >
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle> -->
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
                    <v-img :src="item.backgroundImage"></v-img>
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
    </v-card>
  </v-container>
</template>

<script>
  export default {
    inheritAttrs: false,
    data: () => ({
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
