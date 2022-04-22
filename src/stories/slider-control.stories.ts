import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { moduleMetadata, Story } from '@storybook/angular';
import { SliderInputComponent } from 'src/app/components/slider-input/slider-input.component';


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
  title: 'Form elements/Slider control',
  component: SliderInputComponent,
  argTypes: {
    label: {
      control: { type: 'text' }
    },
    value: {
      control: {
        type: 'number'
      }
    },
    debug: {
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
        MatSliderModule,
      ]
    })
  ],
};

const Template: Story = ( args ) => ({
   props: args,
});

export const Default = Template.bind({});
Default.args = {
  label: 'Default slider',
  debug: true,
  formControl: new FormControl(90),
};

const errorInput =  new FormControl(0, Validators.compose([Validators.min(50)]));

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  formControl: errorInput,
}


export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
}

export const SliderWithNgContent = (args) => ({
  props: args,
  template: `<app-slider-input
    label="Form slider">
    <div style="display: flex; justify-content: space-between; width: 100%">
      <p>Label at start</p>
      <p>Label at end</p>
    </div>
    </app-slider-input>`
})

