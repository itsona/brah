<template>
  <div
      v-if="(account|| {}).trial_active && isAuthenticated"
      class="mobile-trial font-color-primary text-center font-14 py-1"
  >{{$t("snippets.trial_activated", {days:account.subscription_initial_days})}}</div>
</template>

<script>
export default {
	name: "FreeTrialBanner",
	computed: {
		account() {
			return this.$store.getters["user/company/current"];
		},
		isAuthenticated() {
			return this.$store.getters["auth/isAuthenticated"];
		}
	}
};
</script>
<style scoped>
.mobile-trial {
  background: #FFD233;
  z-index: 1;
}
</style>
