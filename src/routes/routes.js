import express from 'express';
import {
  contactId,
  contactsAll
} from '../controllers/controllers.js';
export const router = express.Router();

router.get('/contacts', contactsAll)
router.get('/contacts/:contactId', contactId)