<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-icon
          @click="
          () => {
            $emit('close');
          }
        "
      >mdi-close
      </v-icon
      >
    </v-card-title>
    <v-card-text>
      <v-layout column wrap>
        <v-flex class="text-center mt-3">
          <span v-if="!account.trial_used" v-html="$t(insufficient || 'dialog.discovered_feature')"
                class="font-color-primary">
          </span>
          <span v-else v-html="$t(insufficient || 'warnings.insufficient_permissions')" class="font-color-primary">
          </span>
        </v-flex>
        <v-flex class="text-center mt-3"
                v-if="upgrade">
          <span
              v-html="$t(upgrade)" class="font-color-primary">
          </span>
        </v-flex>
        <v-flex class="text-center mt-3">
          <span
              v-if="!account.trial_used"
              v-html="$t('dialog.offer_free_trial')" class="font-color-primary">
          </span>
          <span
              v-else-if="!upgrade"
              v-html="$t('dialog.upgrade_to_use')" class="font-color-primary">
          </span>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions class="modal-footer pb-4 justify-center">
      <v-btn
          type="button"
          rounded
          color="#00d369"
          class="font-color-primary"
          @click="_onAcceptClick"
      >
        <span class="font-color-white px-2">
          {{ account.trial_used ? $t("snippets.upgrade_now") : $t("dialog.activate_trial") }}
        </span>
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="congratulation_modal" max-width="500px" scrollable>
      <activation-success-modal
          :payment_text="'dialog.you_just_activated_free_trial'"
          @confirmation="activateTrial"
          :send_to_client="true"
          :default-action="true"
          @close="congratulation_modal = false"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import ActivationSuccessModal from "@views/shared/modals/ActivationSuccessModal";
export default {
	name: "SubscriptionModal",
	components: {ActivationSuccessModal},
	data() {
		return {
			congratulation_modal: false,
		};
	},
	props: {
		insufficient: {
			type: String,
			default: "",
		},
		upgrade: {
			type: String,
			default: "",
		}
	},
	computed: {
		account(){
			return this.$store.getters["user/company/current"];
		}
	},
	methods: {
		_onAcceptClick() {
			if (this.account.trial_used) {
				this.$router.push({name: "PaymentPlans"});
			} else {
				this.activateTrial();
			}
		},
		async activateTrial() {
			try {
				await this.$store.getters["user/company/current"].ActivateTrial();
				this.$emit("close", true);
				this.congratulation_modal = true;
				await this.$store.dispatch("user/company/fetchCompany");
			} catch (e) {
				console.error(e);
			}
		},
	}
};
</script>

<style scoped>

</style>
