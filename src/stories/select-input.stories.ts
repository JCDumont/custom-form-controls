import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { moduleMetadata, Story } from '@storybook/angular';
import { SelectInputComponent } from 'src/app/components/select-input/select-input.component';


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
    submitAttempt: {
      control: { type: 'boolean' }
    },
    ...fieldsToNotIncludeOptions,
  },
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
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

export const WiderDropdownWith = (args) => ({
  props: args,
  template: `<app-select-input
  style="width: 400px"
  label="Select input"
  [disabled]="false"
  [selectOptions]="[{ name: 'Hello' }]"
  dropdownWidth="800px">
</app-select-input>`
})


// export const OnBlur = Template.bind({});
// OnBlur.args = {
//   ...Default.args,
//   formControl: new FormControl('Updates on blur', { updateOn: 'blur' }),
// }

// export const Prefix = Template.bind({});
// Prefix.args = {
//   ...Default.args,
//   prefix: 'Prefix!: '
// }

// export const Suffix = Template.bind({});
// Suffix.args = {
//   ...Default.args,
//   suffix: '% amount of stuff'
// }

// export const SuffixWithLongInput = Template.bind({});
// SuffixWithLongInput.args = {
//   ...Default.args,
//   formControl: new FormControl('This is a a super long bit of text that will usually overflow the container showing the impact that overflowing text will have'),
//   suffix: '% amount of stuff'
// }

// export const Disabled = Template.bind({});
// Disabled.args = {
//   ...Default.args,
//   disabled: true,
// }
