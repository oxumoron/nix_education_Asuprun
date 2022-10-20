import express from 'express';
import {
  contactId,
  createContact,
  contactsAll
} from '../controllers/controllers.js';
export const router = express.Router();

router.get('/contacts', contactsAll)
router.post('/contacts', createContact)
router.get('/contacts/:contactId', contactId)