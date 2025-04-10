import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { createNote } from "../controller/notes/createNote.js";
import { getOneNote } from "../controller/notes/getOneNote.js";
import { deleteNote } from "../controller/notes/deleteNote.js";
import { updateNote } from "../controller/notes/updateNote.js";
import { getAllNote } from "../controller/notes/getAllNote.js";
import { searchNote } from "../controller/notes/searchNote.js";
import { paginateNote } from "../controller/notes/paginateNote.js";
import { sortNote } from "../controller/notes/sortNote.js";
import { searchSortPagination } from "../controller/notes/searchSortPagination.js";

const noteRoute = express.Router();

noteRoute.post('/createNote', authMiddleware, createNote);
noteRoute.get('/getOneNote/:id', authMiddleware, getOneNote);
noteRoute.get('/getAllNote', authMiddleware, getAllNote);
noteRoute.delete('/deleteNote/:id', authMiddleware, deleteNote);
noteRoute.post('/updateNote', authMiddleware, updateNote)
noteRoute.post('/searchNote', authMiddleware, searchNote);
noteRoute.post('/paginateNote', authMiddleware, paginateNote);
noteRoute.post('/sortNote', authMiddleware, sortNote)
noteRoute.post('/searchSortPagination', authMiddleware, searchSortPagination)
export default noteRoute;