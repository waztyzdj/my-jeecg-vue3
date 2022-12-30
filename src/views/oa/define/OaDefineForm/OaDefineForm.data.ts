import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '名称',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '编辑版本',
    align:"center",
    dataIndex: 'editVersionNo'
   },
   {
    title: '发布版本',
    align:"center",
    dataIndex: 'publishVersionNo'
   },
   {
    title: '备注',
    align:"center",
    dataIndex: 'remark'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'name',
    component: 'Input',
  }
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '单位id',
    field: 'departId',
    component: 'Input',
    show: false,
  },
  {
    label: '单位',
    field: 'departName',
    component: 'Input',
    show: false,
  },
  {
    label: '名称',
    field: 'name',
    component: 'Input',
    required: true,
  },
  {
    label: '编辑版本',
    field: 'editVersionNo',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '编辑版本id',
    field: 'editVersionId',
    component: 'Input',
    show: false,
  },
  {
    label: '发布版本',
    field: 'publishVersionNo',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '发布版本id',
    field: 'publishVersionId',
    component: 'Input',
    show: false,
  },
  {
    label: '状态',
    field: 'status',
    component: 'Input',
    show: false,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];



/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}