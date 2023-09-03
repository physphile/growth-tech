<script setup lang="ts">
import { ref } from 'vue';
import { Api } from '../api';
import MaterialIcon from './MaterialIcon.vue';
import { computed } from 'vue';

const file = ref<File | null>(null);
const loading = ref(false);
const uploaded = ref(false);

const uploadFile = async (file: File) => {
	uploaded.value = false;
	loading.value = true;

	try {
		await Api.uploadFile(file);
		uploaded.value = true;
	} catch (err) {
		console.log(err);
	}

	loading.value = false;
};

const dropHandler = (event: DragEvent) => {
	const dt = event.dataTransfer;

	if (!dt) return;

	if (dt.items) {
		[...dt.items].forEach((item, i) => {
			const currentFile = item.getAsFile();
			if (item.kind !== 'file' || !currentFile) return;

			file.value = currentFile;
			uploadFile(currentFile);
			console.log(`… file[${i}].name = ${currentFile.name}`);
		});
	} else {
		[...dt.files].forEach((file, i) => {
			console.log(`… file[${i}].name = ${file.name}`);
		});
	}
};

const dragoverHandler = () => {
	console.log('drag over');
};

const changeHandler = (event: Event) => {
	const target = event.target as HTMLInputElement;
	const currentFile = target.files?.[0];
	if (currentFile) {
		file.value = currentFile;
		uploadFile(currentFile);
	}
};

const formatSize = (size?: number) => {
	if (!size) {
		return '';
	}

	const nf = new Intl.NumberFormat('ru-RU', {
		maximumFractionDigits: 2,
	});
	return `${nf.format(size / 1024 / 1024)} МБ`;
};

const icon = computed(() => {
	if (loading.value && !uploaded.value) return 'progress_activity';
	else if (!loading.value && !uploaded.value) return 'refresh';
	return 'done';
});
</script>

<template>
	<div class="drop-zone" @drop.prevent="dropHandler" @dragover.prevent="dragoverHandler">
		<div
			class="status"
			:class="{ 'status-visible': Boolean(file), success: !loading && uploaded, error: !loading && !uploaded }"
		>
			<div>
				<div class="info-main">{{ file?.name }}</div>
				<div class="info-sub">{{ formatSize(file?.size) }}</div>
			</div>
			<div class="d-flex">
				<div class="text-container">
					<div class="info-main">
						<span v-if="loading && !uploaded">Загрузка...</span>
						<span v-else-if="!loading && uploaded">Успешно загружено</span>
						<span v-else-if="!loading && !uploaded">Ошибка загрузки</span>
					</div>
					<div class="info-sub">
						<span v-if="loading && !uploaded">Нажмите для отмены</span>
						<span v-else-if="!loading && !uploaded">Нажмите для повтора</span>
					</div>
				</div>
				<div class="icon-container">
					<div class="icon">
						<MaterialIcon :icon="icon" :class="{ spin: loading }" />
					</div>
				</div>
			</div>
		</div>
		<span class="text">Перетаскивайте ваши файлы сюда</span>
		<label for="input" class="label">
			Выбрать файл
			<input id="input" class="visually-hidden" type="file" accept="application/pdf" @change="changeHandler" />
		</label>
	</div>
</template>

<style scoped>
.drop-zone {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 400px;
	border: 2px dashed color-mix(in oklab, transparent 70%, var(--color-primary));
	border-radius: 16px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: all 300ms ease;
}

.drop-zone:focus-within {
	border-color: var(--color-primary);
}

.label {
	height: 52px;
	padding: 0 20px;
	background: #e1e1e1;
	width: fit-content;
	display: flex;
	align-items: center;
	cursor: pointer;
	border-radius: 2px;
	font-size: 18px;
}

.label::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.text {
	font-weight: 700;
	font-size: 21px;
	margin-bottom: 4px;
}

.status {
	display: flex;
	padding: 12px 16px;
	position: absolute;
	z-index: 10;
	left: 12px;
	top: 12px;
	right: 12px;
	background: #5a5754;
	color: white;
	border-radius: 4px;
	justify-content: space-between;
	opacity: 0;
	transform: translateY(-100px);
	transition: all 300ms ease;
}

.info-sub {
	font-size: 14px;
}

.status-visible {
	opacity: 1;
	transform: none;
}

.status.success {
	background: var(--color-success);
}

.status.error {
	background: var(--color-error);
}

@keyframes spin {
	0% {
		transform: rotate(0);
	}

	100% {
		transform: rotate(360deg);
	}
}

.spin {
	animation: spin infinite 1s linear;
}

.icon {
	border-radius: 999px;
	background: rgb(0 0 0 / 50%);
	height: 28px;
	width: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto 0;
}

.icon-container {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 16px;
}

.text-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>
