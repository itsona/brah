<template>
  <v-snackbar
    dark
    timeout="3000"
    v-model="show"
    :multi-line="true"
    :top="true"
    :right="true"
    max-width="100"
    min-width="250"
  >
    {{ message }}
    <v-btn text class="text-left" color="#00d369" @click.native="show = false"
      >Close</v-btn
    >
  </v-snackbar>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			message: "",
		};
	},
	created: function() {
		this.$store.watch(
			(state) => state.snack,
			() => {
				const msg = this.$store.state.snack;
				if (msg !== "") {
					this.show = true;
					this.message = this.$store.state.snack;
					this.$store.dispatch("setSnack", "");
				}
			}
		);
	},
};
</script>
