import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { moduleMetadata, Story } from '@storybook/angular';
import { SelectInputComponent } from 'src/app/components/select-input/select-input.component';
import { showToolTipDirective } from 'src/app/directives/showTooltip';
import { HighlightDirective } from 'src/app/directives/string-highlight';


const fieldsToNotIncludeOptions = [ 'formControl', 'prefix', 'suffix', 'properties', 'inputValue', 'customerFormControl', 'onTouched', 'onChange' ]
  .reduce((a, b) => {
    return {
      ...a,
      [b]: {
        table: {
          disable: true,
        }
      }
    }
  }, {});

export default {
  title: 'Form elements/Select input',
  component: SelectInputComponent,
  argTypes: {
    label: {
      control: { type: 'text' }
    },
    bindValue: {
      control: { type: 'text' }
    },
    suffix: {
      control: { type: 'text' }
    },
    prefix: {
      control: { type: 'text' }
    },
    value: {
      control: {
        type: 'number'
      }
    },
    dropdownPosition: {
      options: ['auto', 'top', 'bottom'],
      control: {
        type: 'radio'
      }
    },
    fieldDisabledOverride: {
      control: { type: 'boolean' }
    },
    loading: {
      control: { type: 'boolean' }
    },
    submitAttempt: {
      control: { type: 'boolean' }
    },
    ...fieldsToNotIncludeOptions,
  },
  decorators: [
    moduleMetadata({
      declarations: [
        showToolTipDirective,
        HighlightDirective,
      ],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        MatTooltipModule,
        MatCheckboxModule,
      ]
    })
  ],
};

const Template: Story = ( args ) => ({
   props: args,
});

export const Default = Template.bind({});
Default.args = {
  label: 'Select input',
  debug: true,
  formControl: new FormControl(null),
  bindLabel: 'name',
  bindValue: undefined,
  selectOptions: [{ name: 'Hello' }, { name: 'Test'}, { name: 'Storybook'} ]
}


const errorInput =  new FormControl({ name: 'Hello' }, Validators.compose([Validators.required]));
export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  formControl: errorInput,
}

const largeSelectOptions = [];

for ( let i = 0; i < 10000; i++ ) {
  largeSelectOptions.push({
    name: i
  });
}


export const LargeListSlowLoad = Template.bind({});
LargeListSlowLoad.args = {
  ...Default.args,
  selectOptions: largeSelectOptions
}

export const SetDropdownWidth = Template.bind({});
SetDropdownWidth.args = {
  ...Default.args,
  dropdownWidth: '400px',
}

export const HardCodedDropdownPosition = Template.bind({});
HardCodedDropdownPosition.args = {
  ...Default.args,
  dropdownPosition: 'top',
}

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  ...Default.args,
  multiSelect: 'top',
}

export const MultiSelectDisabled = Template.bind({});
MultiSelectDisabled.args = {
  ...Default.args,
  multiSelect: true,
  disabled: true,
  formControl: new FormControl([{name: 'Test'}, { name: 'Storybook'}])
}

export const NonClearable = Template.bind({});
NonClearable.args = {
  ...Default.args,
  clearable: false,
};


export const MultiSelectPreSelected = Template.bind({});
MultiSelectPreSelected.args = {
  ...Default.args,
  multiSelect: true,
  formControl: new FormControl([{name: 'Test'}, { name: 'Storybook'}])
}

export const RemoveRow = Template.bind({});
RemoveRow.args = {
  ...Default.args,
  multiSelect: true,
  showRemoveIcon: true,
  formControl: new FormControl([{name: 'Test'}, { name: 'Storybook'}])
}

export const WiderDropdownWith = (args) => ({
  props: args,
  template: `<app-select-input
  style="width: 400px"
  label="Select input"
  [disabled]="false"
  [bindValue]="undefined"
  [selectOptions]="[{ description: 'Hello' }]"
  dropdownWidth="800px">
</app-select-input>`
});

const defaultValueFormControl = new FormControl();
export const DefaultValue = Template.bind({});
DefaultValue.args = {
  ...Default.args,
  multiSelect: true,
  showRemoveIcon: true,
  bindValue: undefined,
  defaultValue: [{ name: 'Test' }],
  formControl: defaultValueFormControl
}

export const useFirstValueAsDefault = Template.bind({});
useFirstValueAsDefault.args = {
  ...Default.args,
  multiSelect: true,
  useFirstValueAsDefault: true,
  formControl: defaultValueFormControl
}

export const tooltipDisplay = Template.bind({});
tooltipDisplay.args = {
  ...Default.args,
  dropdownWidth: '200px',
  selectOptions: [{ name: 'tes' }, { name: 'Super long name in here with lots of fun information that will overflow'}, { name: 'Storybook'} ]
}

const invalidSelection = new FormControl([{ name: 'Random'}, { name: 'Hello' }]);
export const ValidateSelection = Template.bind({});
ValidateSelection.args = {
  ...Default.args,
  multiSelect: true,
  useFirstValueAsDefault: true,
  formControl: invalidSelection
}

export const CheckBoxSelect = Template.bind({});
CheckBoxSelect.args = {
  ...Default.args,
  checkBoxSelect: true,
  multiSelect: true,
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true,
};


export const GroupedSelect = Template.bind({});
GroupedSelect.args = {
  ...Default.args,
  groupName: 'name',
  groupedList: true,
  bindLabel: 'id',
  groupValueFn: ( item ) => item,
  selectOptions: [{ id: 1, name: 'Hello' }, { id: 2, name: 'Test'}, { id: 3, name: 'Hello'} ]
};
