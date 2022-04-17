import React from 'react';
import { useStateValue } from '../state';
import { EntryWithoutId } from '../types';
import { Formik, Form, Field } from 'formik';
import { Grid, Button } from '@material-ui/core';

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}
const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
   
};

export default AddEntryForm;
