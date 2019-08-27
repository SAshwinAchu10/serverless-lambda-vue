<template>
  <main>
    <transition mode="out-in">
      <router-view/>
    </transition>
  </main>
</template>

<style lang="scss">
	@import "@/styles/index.scss";

	.v-datatable thead th.column.sortable i {
		vertical-align: unset;
	}
</style>
<script>
</script>
