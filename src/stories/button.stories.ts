import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { moduleMetadata, Story } from '@storybook/angular';
import { AcuButtonComponent } from 'src/app/components/acu-button/acu-button.component';


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
  title: 'Form elements/Buttons',
  component: AcuButtonComponent,
  argTypes: {
    label: {
      control: { type: 'text' }
    },
    diasabled: {
      control: { type: 'boolean' }
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
        CommonModule
      ]
    })
  ],
};

const Template: Story = ( args ) => ({
   props: args,
});

export const Default = Template.bind({});
Default.args = {
  label: 'Toggle input',
  debug: true,
  formControl: new FormControl(true),
}


export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
}

export const Outline = Template.bind({});
Outline.args = {
  ...Default.args,
  appearance: 'outline',
}

export const Text = Template.bind({});
Text.args = {
  ...Default.args,
  appearance: 'text',
}

export const Accent = Template.bind({});
Accent.args = {
  ...Default.args,
  color: 'accent',
  appearance: 'text',
}

export const Link = Template.bind({});
Link.args = {
  ...Default.args,
  color: 'link',
  appearance: 'text',
}


