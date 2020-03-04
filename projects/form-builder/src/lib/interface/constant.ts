export const CONSTANT = {
  with: {
    options: ['select', 'radio', 'checkboxes']
  },
  without: {
    layout: []
  },

  inputTypes: [
    {
      label: 'Blank',
      value: 'blank'
    },
    {
      label: 'Form Section',
      value: 'formly-group'
    },
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
    {
      label: 'Select',
      value: 'select'
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
      label: 'Add Column next',
      id: 'add_column_next'
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
      label: 'Add Row below',
      id: 'add_row_below'
    },
    {
      label: 'Delete Column',
      id: 'delete_column'
    },
    {
      label: 'Delete Row',
      id: 'delete_row'
    },
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
