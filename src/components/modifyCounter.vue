<template>
  <div class="lg">
    <v-row justify="center">
    <v-btn class="black--text" style="font-size:27px" icon @click="subTimes()">-</v-btn>
        <v-text-field style="max-width: 100px;font-size: 20px" dense rounded background-color="white" v-model.number="counter"></v-text-field>
      <v-btn class="black--text" style="font-size:25px" icon @click="addTimes()">+</v-btn>
    </v-row>
  </div>
</template>

<script>

export default {
  name: "ModifyCounter",

  props: {
    startTime: {type: Number},
    addValue: {type: Number},
    field: {type: String}
  },

  data() {
    return {
      counter: this.startTime,
    }
  },
  methods: {
    addTimes() {
      this.counter += this.addValue;
      this.$emit('setCounter', this.counter, this.field)
    },

    subTimes() {
      console.log("ENTRA")
      if (this.counter >= this.addValue) {
        this.counter -= this.addValue;
      }
      this.$emit('setCounter', this.counter, this.field)
    }
  }
}
</script>

<style scoped>

</style>