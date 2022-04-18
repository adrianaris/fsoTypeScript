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
    discharge: {
      date: "",
      criteria: ""
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
        if (values.type === entryTypes.Health && values.healthCheckRating === undefined) {
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
      {({ dirty, isValid, setFieldValue, setFieldTouched, values }) => {
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
            {values.type === entryTypes.Occupational &&
              <>
                <Field
                  label="Employer Name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave Start Date"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave Ent Date"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            }
            {values.type === entryTypes.Hospital &&
              <>
                <Field
                  label="Discharge Date"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
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
                  disabled={!isValid || !dirty}
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
