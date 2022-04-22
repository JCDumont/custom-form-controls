import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { moduleMetadata, Story } from '@storybook/angular';
import { NumberInputComponent } from 'src/app/components/number-input/number-input.component';


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
  title: 'Form elements/Number input',
  component: NumberInputComponent,
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
        FormsModule,
        ReactiveFormsModule,
      ]
    })
  ],
};

const Template: Story = ( args ) => ({
   props: args,
});

export const Default = Template.bind({});
Default.args = {
  label: 'Number input',
  debug: true,
  formControl: new FormControl(4),
}

const errorInput =  new FormControl(123, Validators.compose([Validators.min(5)]));

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  formControl: errorInput,
}

export const OnBlur = Template.bind({});
OnBlur.args = {
  ...Default.args,
  formControl: new FormControl(54, { updateOn: 'blur' }),
}

export const OnBlurWithFormat = Template.bind({});
OnBlurWithFormat.args = {
  ...Default.args,
  formControl: new FormControl(54, { updateOn: 'blur' }),
  format: 'P4'
}

export const Prefix = Template.bind({});
Prefix.args = {
  ...Default.args,
  prefix: 'Prefix!: '
}

export const Suffix = Template.bind({});
Suffix.args = {
  ...Default.args,
  suffix: '% amount of stuff'
}

export const SuffixWithLongInput = Template.bind({});
SuffixWithLongInput.args = {
  ...Default.args,
  formControl: new FormControl(54),
  suffix: '% amount of stuff'
}


export const Formatted = Template.bind({});
Formatted.args = {
  ...Default.args,
  formControl: new FormControl(54),
  suffix: '% amount of stuff',
  format: 'C2',
}

export const FormattedLong = Template.bind({});
FormattedLong.args = {
  ...Default.args,
  formControl: new FormControl(54),
  suffix: '% amount of stuff',
  format: 'C7',
}
