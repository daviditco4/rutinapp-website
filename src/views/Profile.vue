<template>
  <v-container class="profile">
    <v-card class="pa-6 mx-lg-auto mt-16 rounded-xl" width="800px" color="primary">
      <v-row>
        <v-col>
            <h2 class="d-flex justify-center">Mi Perfil</h2>
        </v-col>
      </v-row>
      <v-row no-gutters class="pa-3 mt-5">
        <v-col align="center" justify="center" md="3">
          <v-avatar color="red" size="150">
            <span class="white--text text-h1">{{
              username.charAt(0).toUpperCase()
            }}</span>
          </v-avatar>
        </v-col>
        <v-row no-gutters class="ml-6">
          <v-col md="4" class="d-flex align-center">
            <span>Username</span>
          </v-col>
          <v-col md="7"
            ><span>{{ username }}</span></v-col
          >
          <v-row no-gutters>
            <v-col md="4" class="d-flex align-center" align="right">
              <span>Email</span>
            </v-col>
            <v-col md="7"><span>{{ email }}</span></v-col>
          </v-row>
        </v-row>
      </v-row>

          <template v-if="edit">
            <v-row>
              <v-col md="4" class="d-flex align-center" align="right">
                <span>Nombre</span>
              </v-col>
              <v-col md="7">
                <v-text-field v-model="firstNameInputValue"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4" class="d-flex align-center" align="right">
                <span>Apellido</span>
              </v-col>
              <v-col md="7">
                <v-text-field v-model="lastNameInputValue"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4" class="d-flex align-center" align="right">
                <span>Genero</span>
              </v-col>
              <v-col md="7">
                <v-select
                  v-model="genderInputValue"
                  class="mx-2"
                  flat
                  hide-details
                  :items="['male', 'female', 'other']"
                  label="Select"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4" class="d-flex align-center" align="right">
                <span>Celular</span>
              </v-col>
              <v-col md="7">
                <v-text-field v-model="phoneInputValue"></v-text-field>
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
              >Save</v-btn
            >
          </v-col>
        </v-row>
      </template>
    </v-card>

    <div class="text-right" v-if="!edit">
      <v-btn
        @click="edit = !edit"
        elevation="1"
        fab
        style="z-index: 2; margin-right: 100px; margin-top: -30px"
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
// import { GET_USER } from '../store/actions'
export default {
  name: "Profile",
  data() {
    return {
      edit: false,
      changePassword: false,
      firstNameInputValue: "",
      lastNameInputValue: "",
      genderInputValue: "",
      phoneInputValue: "",
    };
  },
  computed: {
    ...mapState("security", {
      $user: (state) => state.user,
    }),
    username() {
      return this.$user ? this.$user.username : "loading...";
    },
    email() {
      return this.$user ? this.$user.email : "loading...";
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