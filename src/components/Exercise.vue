<template>
  <v-row align="center" style="margin-bottom: -20px">
    <v-col cols="12" md="5">
      <h4 class="text-left">{{ exercise.name }}</h4>
    </v-col>
    <v-col md="5">
      <ModifyCounter  v-if="exercise.type != 'rest'" :field="'series'" :start-time="10" :addValue="1" ></ModifyCounter>
      <ModifyCounter  :field="'duration'" :start-time="10" :addValue="1" ></ModifyCounter>
    </v-col>
    <v-col>
      <p justify="center" v-if="exercise.type != 'rest'">series</p>
      <p justify="center">segundos</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Exercise",
  props: ['exercise'],
}
</script>

<style scoped>

</style>