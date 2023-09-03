<script setup lang="ts">
import InputFile from '../components/InputFile.vue';
import InputUrl from '../components/InputUrl.vue';
</script>

<template>
	<v-container>
		<v-main>
			<section class="section">
				<h2 class="h2 text-h5">Начните чат, загрузив файл</h2>
				<InputFile />
			</section>
			<section class="section">
				<h2 class="h2 text-h5">Или используя различные веб-ресурсы</h2>
				<InputUrl />
			</section>
		</v-main>
	</v-container>
</template>

<style scoped>
.h2 {
	margin-bottom: 20px;
	text-align: center;
}

.section:not(:last-child) {
	margin-bottom: 40px;
}
</style>
