<template>
  <tr>
    <slot name="left" v-bind:info="info"></slot>
    <td v-for="(field, index) of Object.keys(fields)" :key="index"
        @click="$emit('entry-click', info)">
      {{ getText(info[field])}}
    </td>
    <slot name="right" v-bind:info="info"></slot>
  </tr>
</template>

<script>

export default {
	name: "CommonDataEntry",
	props: ["info", "fields"],
	methods: {
		getText(info){
			if(typeof info === "number"){ return info.toFixed(2);}
			return info;
		}
	}
};
</script>

<style scoped>

</style>
