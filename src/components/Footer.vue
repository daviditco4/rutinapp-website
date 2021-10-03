<template>
    <v-footer padless color="#333C8E" style="font">
      
    <v-col class="text-center" cols="3">
      <strong style="color:white">Copyright © {{ new Date().getFullYear() }} — RutinApp S.R.L.</strong>
    </v-col>
     <v-spacer></v-spacer>  <v-spacer></v-spacer>  
    <v-col class="text-center" > 
     <v-btn text > <strong style="color:white">Ayuda</strong> </v-btn>
    </v-col>
    <v-col class="text-center"> 
     <v-btn text > <strong style="color:white">¿Quiénes somos?</strong> </v-btn>
    </v-col>
    <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          dark
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
   </v-footer>
    
</template>

<script>
  export default {
    name: "FooterVue",
    
    data: () => ({
      icons: [
        'mdi-youtube',
        'mdi-instagram',
        'mdi-facebook',
        'mdi-twitter',
      ],
    }),
  }
</script>