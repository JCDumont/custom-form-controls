import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { moduleMetadata, Story } from '@storybook/angular';
import { ToggleSlideComponent } from 'src/app/components/toggle-slide/toggle-slide.component';


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
  title: 'Form elements/Toggle slide input',
  component: ToggleSlideComponent,
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
        MatSlideToggleModule
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
