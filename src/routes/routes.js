import express from 'express';
import {
  contacts
} from '../controllers/controllers.js';
export const router = express.Router();

router.get('/contacts', contacts)
router.get('/contacts/:contactId', contacts)