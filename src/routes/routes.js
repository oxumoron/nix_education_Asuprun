import express from 'express';
import {
  contactId,
  createContact,
  updateContact,
  contactsAll
} from '../controllers/controllers.js';
export const router = express.Router();

router.get('/contacts', contactsAll)
router.post('/contacts', createContact)
router.get('/contacts/:contactId', contactId)
router.put('/contacts/:contactId', updateContact)