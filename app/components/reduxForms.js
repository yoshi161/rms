import React, {Component} from 'react';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

const textComponent = field => (
    <div>
      <TextField
          {...field.input}
          floatingLabelText= {field.label}
          errorText={field.label ==""?this.props.errorTextRequired:""}
          disabled={field.disabled}
      />
    </div>
);

const selectComponent = field => (
    <div>
      <SelectField
          {...field}
          {...field.input}
          floatingLabelText={field.label}
          errorText={field.label ==""?this.props.errorTextRequired:""}
          disabled={field.disabled} 
          onChange={(event, index, value) => field.input.onChange(value)}>
      </SelectField>
    </div>
);

const datePickerComponent = field => (
          <DatePicker
               {...field}
               {...field.input}
              floatingLabelText={field.label}
              errorText={field.label==""?this.props.errorTextRequired:""}
              onChange={(event, value) => field.input.onChange(value)}
              onBlur={(event, value) => {}}
              autoOk={true}
              disabled={field.disabled}
          />
);

export {textComponent, selectComponent, datePickerComponent};