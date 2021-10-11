<template>
    
    <v-footer padless color="#333C8E" style="font">
      
    <v-col class="text-center" cols="3">
      <strong style="color:white">Copyright © {{ new Date().getFullYear() }} — RutinApp S.R.L.</strong>
    </v-col>

    <v-col offset-sm="4"/>
    <v-col class="text-center" > 
     <v-btn text to="/help"> <strong style="color:white">Ayuda</strong> </v-btn>
    </v-col>
    <!-- <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          dark
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
    </v-btn> -->
        
        <v-btn href="https://www.youtube.com/" dark icon>
          <v-icon>mdi-youtube</v-icon>
        </v-btn>
        <v-btn href="https://www.instagram.com/" dark icon>
          <v-icon>mdi-instagram</v-icon>
        </v-btn>
        <v-btn href="https://www.facebook.com/" dark icon>
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn href="https://www.twitter.com/" dark icon>
          <v-icon>mdi-twitter</v-icon>
        </v-btn>

        

   </v-footer>

  
    
</template>

<script>
  export default {
    name: "FooterVue",
    components:{
    },
    
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