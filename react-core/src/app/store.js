import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import assignmentReducer from "../components/assignment/assignmentSlice";
import examTimeReducer from "../components/examTime/ExamTimeSlice";
import bookCreateReducer from "../components/desk/BookCreate/BookCreateSlice";
import bookDisplayReducer from "../components/desk/BookCreate/BookDisplaySlice";

export const store = configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: {
    assignments: assignmentReducer,
    examTime: examTimeReducer,
    books: bookCreateReducer,
    booksDisplay: bookDisplayReducer,
  },
});
