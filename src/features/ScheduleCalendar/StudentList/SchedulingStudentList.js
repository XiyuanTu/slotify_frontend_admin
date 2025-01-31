import {
  Avatar,
  Box,
  Card,
  CardHeader,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import update from 'immutability-helper';
import StudentCard from './StudentCard.js';
import * as DnDTypes from '../../../common/constants/dnd';
import { useDrop } from 'react-dnd';
import {
  dragToArranging,
  selectArrangingStudents,
  selectSchedulingStudents,
} from './studentSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const SchedulingStudentList = ({
  droppedStudent,
  setDroppedStudent,
  draggedStudent,
  setDraggedStudent,
  selectedStudent,
  setSelectedStudent,
}) => {
  const dispatch = useDispatch();
  const schedulingStudents = useSelector(selectSchedulingStudents);
  const arrangingStudents = useSelector(selectArrangingStudents);

  const [, drop] = useDrop({
    accept: DnDTypes.ARRANGING_STUDENT,
    drop: ({ id }) => {
      const student = arrangingStudents.find((student) => student.id === id);
      if (student) {
        const index = arrangingStudents.findIndex(
          (student) => student.id === id
        );
        dispatch(dragToArranging({ index, student }));
      }
    },
  });
  return (
    <List sx={{ height: '100%' }} ref={drop}>
      {schedulingStudents.map((student, index) => (
        <ListItem
          key={student.id}
          sx={{
            px: 1,
            py: 0.5,
          }}
        >
          <StudentCard
            key={student.id}
            student={student}
            draggedStudent={draggedStudent}
            setDraggedStudent={setDraggedStudent}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            index={index}
            droppedStudent={droppedStudent}
            setDroppedStudent={setDroppedStudent}
            dragType={DnDTypes.SCHEDULING_STUDENT}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SchedulingStudentList;
