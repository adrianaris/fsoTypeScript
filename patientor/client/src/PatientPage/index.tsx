import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from '../state';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }] = useStateValue();
  console.log(id);
  if (id && typeof id === 'string') console.log(patients[id]);
  return (
    <div>text</div>
  );
};

export default PatientPage;
