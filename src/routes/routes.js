import express from 'express';
import {
  contactId,
  createContact,
  updateContact,
  delContact,
  contactsAll
} from '../controllers/controllers.js';
export const router = express.Router();

router.get('/contacts', contactsAll)
router.post('/contacts', createContact)
router.get('/contacts/:contactId', contactId)
router.put('/contacts/:contactId', updateContact)
router.delete('/contacts/:contactId', delContact)