<template>
  <div class="lg">
    <v-row justify="center">

    <v-btn class="black--text" style="font-size:27px" icon @click="subTimes()">-</v-btn>
        <!-- <v-card-text class="black--text text-center pl-0 pr-0 py-2 align-center justify-center" style="font-size:20px">
         {{ counter }}
        </v-card-text> -->
        <v-text-field style="max-width: 100px;font-size: 20px" dense rounded background-color="white" v-model.number="counter"
                      @input="$emit('input', $event.target.value)" > {{ counter }} </v-text-field>
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