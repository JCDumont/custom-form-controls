import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { moduleMetadata, Story } from '@storybook/angular';
import { TextAreaComponent } from 'src/app/components/text-area/text-area.component';


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
  title: 'Form elements/Text area input',
  component: TextAreaComponent,
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
    disabled: {
      control: { type: 'boolean' }
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
  label: 'Text input',
  debug: true,
  formControl: new FormControl('Hi there!'),
}

const errorInput =  new FormControl('hlo', Validators.compose([Validators.minLength(5)]));

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  formControl: errorInput,
}

export const OnBlur = Template.bind({});
OnBlur.args = {
  ...Default.args,
  formControl: new FormControl('Updates on blur', { updateOn: 'blur' }),
}

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
}
