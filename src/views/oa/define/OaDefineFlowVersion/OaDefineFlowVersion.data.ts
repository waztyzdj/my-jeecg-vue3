import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '版本号',
    align:"center",
    dataIndex: 'versionNo'
   },
   {
    title: '状态',
    align:"center",
    dataIndex: 'status',
    format: (text) => {
      if(text === '0') {
        return '配置中';
      } else {
        return '已发布';
      }
    }
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '流程id',
    field: 'flowId',
    component: 'Input',
  },
  {
    label: '版本号',
    field: 'versionNo',
    component: 'Input',
  },
  {
    label: '配置json',
    field: 'configJson',
    component: 'InputTextArea',
  },
  {
    label: '状态',
    field: 'status',
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