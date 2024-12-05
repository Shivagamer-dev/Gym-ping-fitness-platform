import React from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Typography, Stack } from '@mui/material';

// Define the Exercise interface
interface Exercise {
  id: string;
  name: string;
  target: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
}

interface ExercisesProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>; // Proper type for setExercises
  bodyPart: string;
}

const Exercises: React.FC<ExercisesProps> = ({ exercises, setExercises, bodyPart }) => {
  console.log(exercises);
  return (
    <Box id="exercises" sx={{ mt: { lg: '110px', xs: '50px' }, p: '20px' }}>
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
        Showing Results for <span style={{ color: '#FF2625' }}>{bodyPart}</span> Exercises
      </Typography>

      {/* Exercise Cards */}
      <Stack direction="row" flexWrap="wrap" justifyContent="center" spacing={2}>
        {exercises.map((exercise) => (
          <Box key={exercise.id} sx={{ width: '300px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px' }}>
            {/* Render exercise details */}
            <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" style={{ width: '100%' }} />
            <Typography variant="h6" textAlign="center" mt="10px">
              {exercise.name}
            </Typography>
            <Typography textAlign="center" color="gray">
              Target: {exercise.target}
            </Typography>
          </Box>
        ))}
      </Stack>

      {/* Pagination Component */}
      <Pagination
        count={Math.ceil(exercises.length / 9)} // Adjust based on the number of exercises per page
        page={1} // Adjust to control the current page
        onChange={(e, value) => console.log(value)} // Adjust to handle page change logic
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />
    </Box>
  );
};

export default Exercises;
