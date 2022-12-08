import {defHttp} from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/oa/define/oaDefineFlow/list',
  save='/oa/define/oaDefineFlow/add',
  edit='/oa/define/oaDefineFlow/edit',
  deleteOne = '/oa/define/oaDefineFlow/delete',
  deleteBatch = '/oa/define/oaDefineFlow/deleteBatch',
  importExcel = '/oa/define/oaDefineFlow/importExcel',
  exportXls = '/oa/define/oaDefineFlow/exportXls',
  audit = '/oa/define/oaDefineFlow/audit',
  addConfig = '/oa/define/oaDefineFlow/addConfig',
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;
/**
 * 列表接口
 * @param params
 */
export const list = (params) =>
  defHttp.get({url: Api.list, params});

/**
 * 删除单个
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}

/**
 * 发布
 * @param params
 */
export const audit = (params, handleSuccess) => {
  return defHttp.post({url: Api.audit, params}).then(() => {
    handleSuccess();
  });
}

/**
 * 配置新版本
 * @param params
 */
export const addConfig = (params) => {
  return defHttp.post({url: Api.addConfig, params});
}