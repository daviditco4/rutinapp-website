<template>
  <div class="profile">
    <v-container>
      <v-card class="pa-6 mx-lg-auto mt-16 rounded-xl" width="800px">
        <v-row>
          <v-col>
            <span class="d-flex justify-center">My Profile</span>
          </v-col>
        </v-row>
        <v-row no-gutters class="pa-3 mt-5">
          <v-col align="center" justify="center" md="3">
            <v-avatar size="150">
              <v-img src="@/assets/logo.svg"></v-img>
            </v-avatar>
          </v-col>
          <v-row no-gutters class="ml-6">
            <v-col md="4" class="d-flex align-center">
              <span>Username</span>
            </v-col>
            <v-col md="7">
              <span v-if="!edit">{{ username }}</span>
              <v-text-field v-else :value="username"></v-text-field>
            </v-col>
            <v-row no-gutters>
              <v-col md="4" class="d-flex align-center" align="right">
                <span>Email</span>
              </v-col>
              <v-col md="7">
                <span v-if="!edit">marce@gmail.com</span>
                <v-text-field v-else value="marce@gmail.com"></v-text-field>
              </v-col>
            </v-row>
          </v-row>
        </v-row>
        <template v-if="edit">
          <v-row no-gutters >
            <v-col>
              <v-btn color="secondary" elevation="2" rounded @click="changePassword=!changePassword">Change Password</v-btn>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-btn color="secondary" elevation="2" rounded @click="editProfile">Save</v-btn>
            </v-col>
          </v-row>
        </template>
      </v-card>

      <div class="text-right" v-if="!edit">
        <v-btn @click="edit=!edit" elevation="1" fab style="z-index: 2; margin-right: 100px; margin-top: -30px">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>

      <v-dialog style="border-radius: 20px;" v-model="changePassword" max-width="500px" max-height="200px">
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
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { GET_USER } from '../store/actions'

export default {
  name: "Profile",
  data () {
    return {
      edit: false,
      changePassword: false
    }
  },
  computed: {
    username() {
      return this.$store.state.user.username
    }
  },
  created() {
    this.$store.dispatch(GET_USER)
  }
};
</script>

<style scoped>

</style>