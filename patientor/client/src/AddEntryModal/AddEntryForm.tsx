import React from "react";
import { useStateValue } from "../state";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "@material-ui/core";
import { UnionOmit, Entry, HealthCheckRating, entryTypes } from "../types";
import { TextField, SelectField, EntryOption } from "./FormField";

export type EntryFormValues = UnionOmit<Entry, "id" | "type">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: EntryOption[] = [
  { value: entryTypes.Health, label: "HealthCheck" },
  { value: entryTypes.Occupational, label: "OccupationalHealthcare" },
  { value: entryTypes.Hospital, label: "Hospital" },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const initialValues = {
    type: entryTypes.Health,
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [""],
    healthCheckRating: HealthCheckRating["Healthy"],
    discharge: {
      startDate: "",
      endDate: ""
    },
    employerName: "",
    sickLeave: {
      startDate: "",
      endDate: ""
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === entryTypes.Health && !values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        if (values.type === entryTypes.Occupational && !values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.type === entryTypes.Hospital && !values.discharge) {
          errors.discharge = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        const basePartOfForm = <>
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
          </>
        return (
          <Form className="form ui"></Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
