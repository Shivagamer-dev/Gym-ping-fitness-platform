import React, { useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import HeroBanner from './HeroBanner';
import SearchExercises from './SearchExercises';
import Exercises from './Exercises';

function Spotter() {
  const [exercises, setExercises] = useState<any[]>([]); // exercises should be an array of exercises
  const [bodyPart, setBodyPart] = useState<string>('all');

  const tips = [
    {
      title: 'Warm Up Properly',
      description: 'Spend 5-10 minutes warming up to prepare your body and reduce the risk of injury.',
      icon: '🔥',
    },
    {
      title: 'Maintain Proper Form',
      description: 'Always prioritize good form over lifting heavier weights to avoid injuries.',
      icon: '✅',
    },
    {
      title: 'Stay Hydrated',
      description: 'Drink water before, during, and after your workout to keep your energy levels up.',
      icon: '💧',
    },
    {
      title: 'Mix Up Your Routine',
      description: 'Incorporate different exercises to work out multiple muscle groups and prevent plateaus.',
      icon: '🔄',
    },
    {
      title: 'Cool Down and Stretch',
      description: 'End your workout with a cool-down period and stretches to improve flexibility.',
      icon: '🧘',
    },
  ];

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
      <div className="mt-12 bg-gray-50 p-8 rounded-lg shadow-lg">
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          sx={{ color: '#FF5722', mb: 4 }} // Vibrant orange for the heading
        >
          🏋️ Tips for Effective Workouts 🏋️
        </Typography>
        <Grid container spacing={4}>
          {tips.map((tip, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  borderRadius: 3,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  mb={2}
                  sx={{ color: '#000000' }} // Warm yellow for the title
                >
                  {tip.icon} {tip.title}
                </Typography>
                <Typography variant="body1" sx={{ color: '#000000' }}> {/* Soft orange for the description */}
                  {tip.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
}

export default Spotter;
