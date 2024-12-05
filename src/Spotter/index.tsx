import React, { useState } from 'react';
import { Box } from '@mui/material';
import HeroBanner from './HeroBanner';
import SearchExercises from './SearchExercises';
import Exercises from './Exercises';

function Spotter() {
  const [exercises, setExercises] = useState<any[]>([]); // exercises should be an array of exercises
  const [bodyPart, setBodyPart] = useState<string>('all'); 

  return (
    <Box>
      <div className="mt-2 pt-14">
        <HeroBanner />
        <SearchExercises
          setExercises={setExercises}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
        <Exercises
          exercises={exercises}
          setExercises={setExercises}
          bodyPart={bodyPart}
        />
      </div>
    </Box>
  );
}

export default Spotter;
