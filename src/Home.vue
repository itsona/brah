<template>
  <v-col col="12">
    <v-tabs v-model="activeTab">
      <v-tabs-slider />
      <v-tab class="px-8">{{ $t('work_space') }}</v-tab>
      <v-tab class="px-8">{{ $t('day_report') }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeTab">
      <v-tab-item>
        <calendar/>
      </v-tab-item> 
      <v-tab-item>
        <Reports></Reports>
      </v-tab-item>
    </v-tabs-items>
  </v-col>
</template>

<script>
import Reports from "./Reports";
import Calendar from "./calendar";

export default {
	name: "Home",
	components: {Reports, Calendar},
	data() {
		return {
			activeTab: 0,
		};
	},
};
</script>

<style lang="scss" scoped>
.title-red {
  color: red;
}
.title-green {
  color: green;
}

</style>

<style scoped>

</style>
