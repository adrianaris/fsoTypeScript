import React from "react";
import { useStateValue } from "../state";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "@material-ui/core";
import { UnionOmit, Entry, HealthCheckRating, entryTypes } from "../types";
import {
  TextField,
  EntryTypeSelectField,
  HealthCheckRatingSelectField,
  EntryOption,
  DiagnosisSelection,
  HealthCheckRatingOption
} from "./FormField";

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

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating['Healthy'], label: "Healthy" },
  { value: HealthCheckRating["LowRisk"], label: "LowRisk" },
  { value: HealthCheckRating["HighRisk"], label: "HighRisk" },
  { value: HealthCheckRating["CriticalRisk"], label: "CriticalRisk" },
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
//    discharge: {
//      startDate: "",
//      endDate: ""
//    },
//    employerName: "",
//    sickLeave: {
//      startDate: "",
//      endDate: ""
//    }
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
//        if (values.type === entryTypes.Occupational && !values.employerName) {
//          errors.employerName = requiredError;
//        }
//        if (values.type === entryTypes.Hospital && !values.discharge) {
//          errors.discharge = requiredError;
//        }
        return errors;
      }}
    >
      {({ isValid, setFieldValue, setFieldTouched, values }) => {
        console.log(values);
        return (
          <Form className="form ui">
            <EntryTypeSelectField label="EntryType" name="type" options={typeOptions} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === entryTypes.Health &&
              <HealthCheckRatingSelectField
                label="HealthCheck"
                name="healthCheckRating"
                options={healthCheckRatingOptions}
              />
            }
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
