<template>
  <div
      class="mt-3 font-weight-bold font-color-primary"
      :class="{'discount': discount, 'annual': annual}"
  >
      <span class="price-container d-flex align-content-start">
        <span class="price-currency ">{{
            priceCurrency
          }}{{getPrice}}</span>
        <span
            v-if="!discount"
            class="font-10 pl-2">{{period}}</span>
      </span>
  </div>
</template>

<script>
export default {
	name: "PaymentPrice",
	props: {
		discount: true,
		plans: {},
		sectionName: {
			type: String,
			default() {
				return "free";
			},
		},
		annual: false,
		countAnnual: false,
	},
	computed: {
		annualName() {
			if(this.sectionName === "free") return "free";
			return `${this.sectionName}_annual`;
		},
		priceCurrency() {
			switch ((this.plans[this.sectionName] || {}).currency)  {
			case "GEL":
				return "₾";
			case "PHP":
				return "₱";
			default:
				return "$";
			}
		},
		period(){
			return this.annual ? this.$t("pages.payment_plans.annually"): this.$t("pages.payment_plans.per_month");
		},
		getPrice() {
			const divider = this.countAnnual ? 12.0 : 1;
			const name = this.countAnnual ? this.annualName : this.sectionName;
			let discount = 1;
			if(!this.discount) discount = (1- (this.plans[name]|| {}).discount);
			const planPrice = (this.plans[name] || {}).price*discount/divider.toFixed(2) || 0.00;
			const plans = planPrice.toFixed(2);
			if(plans.split(".")[1] === "00") return plans.split(".")[0];
			return plans;
		},
	}
};
</script>

<style scoped>


.discount-price {
  display: none;
}

.discount .discount-price {
  display: block;
}

.price-currency {
  font-size: 36px;
}

.discount .price-currency {
  font-size: 20px;
}

.annual .price-currency {
  font-size: 16px;
}

.discount .price-container {
  color: #FF6D6D;
  font-size: 24px;
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}

.price-currency {
  line-height: 1;
}
</style>
