import React, { useState } from 'react';
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik';
import {
  TextField as TextFieldMUI,
  Typography
} from '@material-ui/core';
import { EntryWithoutId } from '../types';

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}
export const TextField = ({ field, label, placeholder }: TextProps) => (
  <div>
    <TextFieldMUI
      fullWidth
      label={label}
      placeholder={placeholder}
      {...field}
    />
    <Typography variant="subtitle2">
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
);
