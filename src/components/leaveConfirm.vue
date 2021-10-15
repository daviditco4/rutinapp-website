<template>
    <v-card flat width="300" class="pa-md-4 mx-lg-auto mt-16 rounded-xl" color="primary">
      <v-row>
        <v-col md="12">
            <h3>¿Deseas cancelar?</h3>
            <p> Se perderan los cambios.</p>
            </v-col>  
      </v-row>
      <v-row>
      </v-row>
      <v-row>
          <v-col md="6">
          <v-btn color="secondary" dark @click="closeLeaveConfirm">No</v-btn>
         </v-col>
         <v-col md="6">
          <v-btn color="error" dark @click="cancel">Si</v-btn>
         </v-col>
      </v-row>
    </v-card>
</template>

<script scoped>

export default {
  data(){
    return{}
  },
  methods:{
    closeLeaveConfirm() {
      this.$emit('closeDialog');
    },
    cancel(){
      this.$router.go(-1)
    },
  },
}
</script>