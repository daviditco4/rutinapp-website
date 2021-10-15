<template>
  <v-container class="profile">
    <v-card class="pa-6 mx-lg-auto mt-16 rounded-xl" width="800px" color="primary">
      <v-row>
        <v-col>
            <h2 class="d-flex justify-center">Mi Perfil</h2>
        </v-col>
      </v-row>

    <v-row no-gutters class="pa-3 mt-5" align="center">
          <v-col align="center" justify="center" md="3">
            <v-avatar color="blue" size="150">
              <span class="white--text text-h1">{{
                username.charAt(0).toUpperCase()
              }}</span>
            </v-avatar>
          </v-col>
        
            <v-col md="4" >
              <p>Usuario</p>
              <p>Email</p>
            </v-col>
            

                
          <v-col md="5">
              <p>{{ username }}</p>
              <p>{{ email }}</p>
          </v-col >
      </v-row> 


          <template v-if="edit">
            <v-row>
              <v-col md="4" class="d-flex align-center" align="right">
                <span>Nombre</span>
              </v-col>
              <v-col md="7">
                <v-text-field rounded flat outlined light hide-details background-color="white"
                              v-model="firstNameInputValue" label="Nombre" solo></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4" class="d-flex align-center" align="right">
                <span>Apellido</span>
              </v-col>
              <v-col md="7">
                <v-text-field rounded flat outlined light hide-details background-color="white"
                              v-model="lastNameInputValue"  label="Apellido" solo></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4" class="d-flex align-center" align="right">
                <span>Género</span>
              </v-col>
              <v-col md="7">
                <v-select
                  v-model="genderInputValue"
                  class="mx-2"
                  rounded
                  solo
                  flat
                  hide-details
                  light
                  outlined
                  background-color="white"
                  :items="genders"
                  item-text="name"
                  item-value="code"
                  label="Seleccionar"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4" class="d-flex align-center" align="right">
                <span>Celular</span>
              </v-col>
              <v-col md="7">
                <v-text-field rounded flat outlined light hide-details background-color="white"  label="Celular" solo
                              v-model="phoneInputValue" :rules="validations.phoneRules">
                </v-text-field>
              </v-col>
            </v-row>
          </template>

      <template v-if="edit">
        <v-row justify="center">
          <v-col>
            <v-btn
              color="secondary"
              elevation="2"
              rounded
              @click="saveProfile()"
              >Guardar</v-btn
            >
          </v-col>
        </v-row>
      </template>
    </v-card>

    <div class="text-right" v-if="!edit">
      <v-btn
        @click="edit = !edit"
        elevation="2"
        fab
        style="margin-right: 160px; margin-top: -40px"
        color= "secondary"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </div>

    <!-- <v-dialog style="border-radius: 20px;" v-model="changePassword" max-width="500px" max-height="200px">
        <v-card class="rounded-xl">
          <v-card-title>Change Password</v-card-title>
          <v-row no-gutters class="pa-4">
            <v-col>
              <v-text-field placeholder="Current password"></v-text-field>
              <v-text-field placeholder="New password"></v-text-field>
              <v-text-field placeholder="Confirm new password"></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters align="center" justify="space-around" class="pb-4">
            <v-btn color="secondary" elevation="2" rounded @click="changePassword=!changePassword">Cancel</v-btn>
            <v-btn color="secondary" elevation="2" rounded @click="editPassword">Save</v-btn>
          </v-row>
        </v-card>
      </v-dialog> -->
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      edit: false,
      changePassword: false,
      firstNameInputValue: "",
      lastNameInputValue: "",
      genderInputValue: null,
      phoneInputValue: "",
      validations:{
          phoneRules: [
              v => v.length != 10 || "El télefono debe debe contener 10 numeros"
          ],
      },
      genders: [
        {name: 'Masculino', code: 'male'},
        {name: 'Femenino', code: 'female'},
        {name: 'Otro', code: 'other'}
      ]
    }
  },
  computed: {
    ...mapState("security", {
      $user: (state) => state.user,
    }),
    username() {
      return this.$user.username
    },
    email() {
      return this.$user.email
    },
  },
  async created() {
    await this.$getCurrentUser();
    this.firstNameInputValue = this.$user.firstName ?? "";
    this.lastNameInputValue = this.$user.lastName ?? "";
    this.genderInputValue = this.$user.gender ?? null;
    this.phoneInputValue = this.$user.phone ?? "";
  },
  methods: {
    ...mapActions("security", {
      $getCurrentUser: "getCurrentUser",
      $modifyCurrentUser: "modifyCurrentUser",
    }),
    saveProfile() {
      console.log("gender: " + this.genderInputValue)
      if (this.genderInputValue) {
        this.$modifyCurrentUser({
          firstName: this.firstNameInputValue,
          lastName: this.lastNameInputValue,
          gender: this.genderInputValue,
          phone: this.phoneInputValue,
        })
      } else {
        this.$modifyCurrentUser({
          firstName: this.firstNameInputValue,
          lastName: this.lastNameInputValue,
          phone: this.phoneInputValue,
        })
      }
      this.edit = false;
    },
  },
};
</script>

<style scoped>
</style>