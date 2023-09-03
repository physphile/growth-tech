<script setup lang="ts">
import MaterialIcon from './MaterialIcon.vue';

const submitHandler = () => {};
</script>

<template>
	<form class="form" @submit.prevent="submitHandler">
		<input type="text" class="input" placeholder="https://www.youtube.com/watch?v=odbwz_86Xvg" />
		<button type="submit" class="submit"><MaterialIcon icon="start" /></button>
	</form>
</template>

<style scoped>
.submit {
	background: var(--color);
	height: 100%;
	padding: 0 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 300ms ease;
}

.form {
	--color: color-mix(in oklab, transparent 70%, var(--color-primary));

	display: flex;
	width: 100%;
	height: 52px;
	border: 2px solid var(--color);
	border-radius: 8px;
	overflow: hidden;
	transition: all 300ms ease;

	&:focus-within {
		--color: var(--color-primary);

		& .submit {
			color: white;
		}
	}
}

.input {
	outline: none;
	padding: 0 20px;
	height: 100%;
	flex: 1;

	&::placeholder {
		opacity: 0.3;
	}
}
</style>
