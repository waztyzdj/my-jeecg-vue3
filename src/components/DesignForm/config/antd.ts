export interface Rules {
  trigger: string
  enum: string
  len?: number
  max?: number
  message: string
  min?: number
  pattern: string
  required: boolean
  type: string
}

export interface WidgetForm {
  list: any[]
  config: {
    size: string
    hideRequiredMark: boolean
    layout: string
    labelAlign: string
    labelCol: {
      span: number
      offset: number
    }
  }
}

const rules: Rules = {
  trigger: 'blur',
  enum: '',
  len: undefined,
  max: undefined,
  message: '',
  min: undefined,
  pattern: '',
  required: false,
  type: 'any'
}

export const widgetForm: WidgetForm = {
  list: [],
  config: {
    size: 'default',
    hideRequiredMark: false,
    layout: 'horizontal',
    labelAlign: 'right',
    labelCol: {
      span: 3,
      offset: 0
    }
  }
}

export const basicComponents = [
  {
    label: '单行文本',
    type: 'input',
    icon: 'iconoir:input-field',
    options: {
      width: '100%',
      defaultValue: '',
      placeholder: '',
      maxlength: null,
      prefix: '',
      suffix: '',
      addonBefore: '',
      addonAfter: '',
      disabled: false,
      allowClear: false,
      readonly: false,
      rules
    }
  },
  {
    label: '密码框',
    type: 'password',
    icon: 'material-symbols:password',
    options: {
      width: '100%',
      defaultValue: '',
      placeholder: '',
      maxlength: null,
      prefix: '',
      suffix: '',
      addonBefore: '',
      addonAfter: '',
      visibilityToggle: true,
      disabled: false,
      allowClear: false,
      readonly: false,
      rules
    }
  },
  {
    label: '多行文本',
    type: 'textarea',
    icon: 'bi:textarea-t',
    options: {
      width: '100%',
      defaultValue: '',
      placeholder: '',
      maxlength: null,
      rows: 4,
      autoSize: false,
      showCount: false,
      disabled: false,
      allowClear: false,
      readonly: false,
      rules
    }
  },
  {
    label: '数字',
    type: 'number',
    icon: 'tabler:number',
    options: {
      width: '',
      defaultValue: 0,
      min: 0,
      max: 100,
      step: 1,
      readonly: false,
      disabled: false,
      rules
    }
  },
  {
    label: '单选框组',
    type: 'radio',
    icon: 'material-symbols:radio-button-checked-outline',
    options: {
      defaultValue: '',
      width: '',
      inline: true,
      remote: false,
      showLabel: false,
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      options: [
        {
          value: 'Option 1',
          label: 'Option 1'
        },
        {
          value: 'Option 2',
          label: 'Option 2'
        },
        {
          value: 'Option 3',
          label: 'Option 3'
        }
      ],
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      disabled: false,
      rules
    }
  },
  {
    label: '多选框组',
    type: 'checkbox',
    icon: 'mdi:checkbox-multiple-marked-outline',
    options: {
      defaultValue: [],
      width: '',
      inline: true,
      remote: false,
      showLabel: false,
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      options: [
        {
          label: 'Option 1',
          value: 'Option 1'
        },
        {
          label: 'Option 2',
          value: 'Option 2'
        },
        {
          label: 'Option 3',
          value: 'Option 3'
        }
      ],
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      disabled: false,
      rules
    }
  },
  {
    label: '时间选择器',
    type: 'time',
    icon: 'mdi:archive-time',
    options: {
      defaultValue: '',
      width: '',
      placeholder: '请选择时间',
      format: 'HH:mm:ss',
      valueFormat: 'HH:mm:ss',
      readonly: false,
      allowClear: true,
      disabled: false,
      rules
    }
  },
  {
    label: '日期选择器',
    type: 'date',
    icon: 'material-symbols:date-range-outline',
    options: {
      defaultValue: '',
      width: '',
      placeholder: '请选择时间',
      format: 'YYYY-MM-DD',
      readonly: false,
      allowClear: true,
      disabled: false,
      rules
    }
  },
  {
    label: '评分',
    type: 'rate',
    icon: 'material-symbols:star-outline-rounded',
    options: {
      defaultValue: null,
      max: 5,
      allowClear: true,
      allowHalf: false,
      disabled: false,
      rules
    }
  },
  {
    label: '下拉选择框',
    type: 'select',
    icon: 'material-symbols:arrow-drop-down-circle-outline',
    options: {
      defaultValue: [],
      width: '200px',
      mode: null,
      placeholder: '',
      remote: false,
      showLabel: false,
      showSearch: false,
      clearable: false,
      disabled: false,
      props: {
        label: 'label',
        value: 'value'
      },
      options: [
        {
          label: 'Option 1',
          value: 'Option 1'
        },
        {
          label: 'Option 2',
          value: 'Option 2'
        },
        {
          label: 'Option 3',
          value: 'Option 3'
        }
      ],
      remoteOptions: [],
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      rules
    }
  },
  {
    label: '开关',
    type: 'switch',
    icon: 'mdi:toggle-switch-off-outline',
    options: {
      defaultValue: false,
      disabled: false,
      checkedChildren: '',
      unCheckedChildren: '',
      rules
    }
  },
  {
    label: '滑块',
    type: 'slider',
    icon: 'radix-icons:slider',
    options: {
      defaultValue: 0,
      width: '',
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
      range: false,
      reverse: false,
      rules
    }
  },
  {
    label: '文字',
    type: 'text',
    icon: 'material-symbols:format-color-text-rounded',
    options: {
      defaultValue: 'This is a text'
    }
  }
]

export const advanceComponents = [
  {
    label: '图片',
    type: 'img-upload',
    icon: 'material-symbols:upload-rounded',
    options: {
      defaultValue: [],
      name: 'file',
      action: 'http://example.com/upload',
      method: 'post',
      listType: 'text',
      accept: 'image/*',
      maxCount: 3,
      multiple: false,
      disabled: false,
      rules
    }
  },
  {
    label: '富文本编辑器',
    type: 'richtext-editor',
    icon: 'bi:file-earmark-richtext',
    options: {
      defaultValue: '',
      width: '',
      disabled: false
    }
  },
  {
    label: '级联选择器',
    type: 'cascader',
    icon: 'octicon:multi-select-24',
    options: {
      defaultValue: [],
      width: '200px',
      placeholder: '',
      disabled: false,
      allowClear: false,
      remote: true,
      remoteOptions: [],
      props: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      remoteFunc:
        'https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json',
      rules
    }
  }
]

export const layoutComponents = [
  {
    label: '栅格布局',
    type: 'grid',
    icon: 'material-symbols:grid-on',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  }
]
