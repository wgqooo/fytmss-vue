<template>
	<el-form ref="formRef" :model="form" :rules="rules" :label-width="options.labelWidth">
		<el-row>
			<el-col :span="options.span" v-for="item in options.list">
				<el-form-item :label="item.label" :prop="item.prop">
					<!-- 文本框、数字框、下拉框、日期框、开关、上传 -->
					<el-input v-if="item.type === 'input'" v-model="form[item.prop]" :disabled="item.disabled"
						:placeholder="item.placeholder" clearable></el-input>
					<el-input-number v-else-if="item.type === 'number'" v-model="form[item.prop]"
						:disabled="item.disabled" controls-position="right"></el-input-number>
					<el-select v-else-if="item.type === 'select'" v-model="form[item.prop]" :disabled="item.disabled"
						:placeholder="item.placeholder" clearable>
						<el-option v-for="opt in item.opts" :label="opt.label" :value="opt.value"></el-option>
					</el-select>
					<el-cascader-panel v-else-if="item.type === 'cascader'" style="width: fit-content" 
					    :options="region" @change="handleRegionChange" v-model="form[item.prop]">
					</el-cascader-panel>
					<el-date-picker v-else-if="item.type === 'date'" type="date" v-model="form[item.prop]"
						:value-format="item.format"></el-date-picker>
					<el-switch v-else-if="item.type === 'switch'" v-model="form[item.prop]"
						:active-value="item.activeValue" :inactive-value="item.inactiveValue"
						:active-text="item.activeText" :inactive-text="item.inactiveText"></el-switch>
					<el-upload v-else-if="item.type === 'upload'" class="avatar-uploader" action="#"
						:show-file-list="false" :on-success="handleAvatarSuccess">
						<img v-if="form[item.prop]" :src="form[item.prop]" class="avatar" />
						<el-icon v-else class="avatar-uploader-icon">
							<Plus />
						</el-icon>
					</el-upload>
					<slot :name="item.prop" v-else>
					</slot>
				</el-form-item>
			</el-col>
		</el-row>

		<el-form-item>
			<el-button type="primary" @click="saveEdit(formRef)">保 存</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { FormOption } from '@/types/form-option';
import { FormInstance, FormRules, UploadProps } from 'element-plus';
import { PropType, ref } from 'vue';
import region from '@/assets/ts/ChinaCityJSON';

const { options, formData, edit, update } = defineProps({
	options: {
		type: Object as PropType<FormOption>,
		required: true
	},
	formData: {
		type: Object,
		required: true
	},
	edit: {
		type: Boolean,
		required: false
	},
	update: {
		type: Function,
		required: true
	}
});


const form = ref({ ...(edit ? formData : {}) });

//options.list.map(item => { ... })：对 options.list 数组中的每个元素执行一个映射操作。
//map 方法遍历数组中的每个项，并根据每个项生成一个新的对象或值
const rules: FormRules = options.list.map(item => {
	if(item.prop == `empNo`){
		return { [item.prop]: [{required: true, message:'员工编号应该位于4~30字符', min:4, max:30, trigger:'blur'}] };
	}
	if(item.prop == `empMobile`){
		return { [item.prop]: [{required: true, pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }] };
	}
	if(item.prop == `empAddress`){
		return { [item.prop]: [{required: true, message: '请选择完整的省市辖区', trigger: 'blur' }] };
	}
	if (item.required) {
		return { [item.prop]: [{ required: true, message: `${item.label}不能为空`, trigger: 'blur' }] };
	}
	return {};
}).reduce((acc, cur) => ({ ...acc, ...cur }), {});
//.reduce((acc, cur) => ({ ...acc, ...cur }), {})：对上述映射得到的对象数组执行 reduce 操作，将所有的对象合并为一个对象。
//reduce 方法将数组中的每个元素（对象）应用于指定的函数（此处为对象合并函数），以将其归约为单个值


const formRef = ref<FormInstance>();
const saveEdit = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(valid => {
		if (!valid) return false;
		update(form.value);
	});
};

//地区选择相关
//const selectedRegion = ref('');
const handleRegionChange = (val:[]) => {
	//数组合成字符串
	form.value[`empAddress`] = val.join('')
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
	form.value.thumb = URL.createObjectURL(uploadFile.raw!);
};

</script>

<style>
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
</style>
