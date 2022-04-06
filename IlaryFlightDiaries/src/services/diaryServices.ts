import diaryData from '../../data/diaries.json';

import { DiaryEntry } from '../types';

const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

const getEntries = (): Array<DiaryEntry> => {
  return diaryData;
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary
};
