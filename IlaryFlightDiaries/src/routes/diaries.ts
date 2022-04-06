import express from 'express';
import diaryService from '../services/diaryServices';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSesitiveEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
