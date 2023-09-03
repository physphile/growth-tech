<script setup lang="ts">
defineProps<{ icon: string }>();
</script>

<template>
	<span class="material-symbols-rounded"> {{ icon }} </span>
</template>

<style scoped>
.material-symbols-rounded {
	font-variation-settings:
		'FILL' 1,
		'wght' 400,
		'GRAD' 0,
		'opsz' 24;
}
</style>
