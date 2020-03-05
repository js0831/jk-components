export const CONSTANT = {
  with: {
    options: ['select', 'select_multiple', 'radio', 'checkboxes'],
    additionalFormAction: ['formly-group'],
    maxValue: ['input-number'],
  },
  without: {
    layout: [],
    defaultValue: ['formly-group', 'blank', 'text_header', 'text_paragraph'],
    validation: ['blank', 'formly-group', 'checkbox', 'input-range', 'text_header', 'text_paragraph'],
    required: ['checkbox', 'input-range'],
    maxLength: ['checkboxes', 'radio', 'input-range', 'input-number', 'select', 'select_multiple'],
    label: ['blank'],
    key: ['blank', 'text_header', 'text_paragraph'],
    requiredKey: ['blank', 'formly-group', 'text_header', 'text_paragraph']
  },

  inputTypes: {
    others: {
      label: 'Others',
      fields: [
        {
          label: 'Blank',
          value: 'blank'
        },
        {
          label: 'Form Group',
          value: 'formly-group'
        },
      ]
    },
    input: {
      label: 'Inputs',
      fields: [
        {
          label: 'Input Text',
          value: 'input-text'
        },
        {
          label: 'Input Password',
          value: 'input-password'
        },
        {
          label: 'Input Date',
          value: 'input-date'
        },
        {
          label: 'Input Time',
          value: 'input-time'
        },
        {
          label: 'Input Range',
          value: 'input-range'
        },
        {
          label: 'Input Number',
          value: 'input-number'
        },
        {
          label: 'Input Email',
          value: 'input-email'
        },
        {
          label: 'Textarea',
          value: 'textarea'
        },
      ]
    },
    selection: {
      label: 'Selections',
      fields: [
        {
          label: 'Select',
          value: 'select'
        },
        {
          label: 'Select (Multiple)',
          value: 'select_multiple'
        },
        {
          label: 'Radio',
          value: 'radio'
        },
        {
          label: 'Checkbox',
          value: 'checkbox'
        },
        {
          label: 'Checkbox (Multiple)',
          value: 'checkboxes'
        }
      ]
    },
    text: {
      label: 'Text',
      fields: [
        {
          label: 'Text (Paragraph)',
          value: 'text_paragraph'
        },
        {
          label: 'Text (Header)',
          value: 'text_header'
        },
      ]
    }
  },

  xinputTypes: [
    // {
    //   label: 'Blank',
    //   value: 'blank'
    // },
    // {
    //   label: 'Form Group',
    //   value: 'formly-group'
    // },
    // {
    //   label: 'Input Text',
    //   value: 'input-text'
    // },
    // {
    //   label: 'Input Password',
    //   value: 'input-password'
    // },
    // {
    //   label: 'Input Date',
    //   value: 'input-date'
    // },
    // {
    //   label: 'Input Time',
    //   value: 'input-time'
    // },
    // {
    //   label: 'Input Range',
    //   value: 'input-range'
    // },
    // {
    //   label: 'Input Number',
    //   value: 'input-number'
    // },
    // {
    //   label: 'Input Email',
    //   value: 'input-email'
    // },
    // {
    //   label: 'Textarea',
    //   value: 'textarea'
    // },
    // {
    //   label: 'Select',
    //   value: 'select'
    // },
    // {
    //   label: 'Select (Multiple)',
    //   value: 'select_multiple'
    // },
    // {
    //   label: 'Radio',
    //   value: 'radio'
    // },
    // {
    //   label: 'Checkbox',
    //   value: 'checkbox'
    // },
    // {
    //   label: 'Checkbox (Multiple)',
    //   value: 'checkboxes'
    // }
  ],

  formActions: [
    {
      label: 'Duplicate Row',
      id: 'duplicate_row'
    },
    {
      label: 'Duplicate Column',
      id: 'duplicate_column'
    },
    {
      label: 'Add Row below',
      id: 'add_row_below'
    },
    {
      label: 'Add Column previous',
      id: 'add_column_prev'
    },
    {
      label: 'Add Row above',
      id: 'add_row_above'
    },
    {
      label: 'Add Column next',
      id: 'add_column_next'
    },
    {
      label: 'Delete Row',
      id: 'delete_row'
    },
    {
      label: 'Delete Column',
      id: 'delete_column'
    }
  ],

  newColumn: {
    type: 'blank',
    className: 'form-group col-md-4',
  },
  newRow: {
    fieldGroupClassName: 'form-row',
    fieldGroup: [
      {
        type: 'blank',
        className: 'form-group col-md-4',
      },
      {
        type: 'blank',
        className: 'form-group col-md-4',
      },
      {
        type: 'blank',
        className: 'form-group col-md-4',
      },
    ]
  }
};
