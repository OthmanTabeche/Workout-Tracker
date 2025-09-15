# Workout Tracker API - Required Endpoints

## Workout Management
- **GET** `/workouts`
- **POST** `/workouts` - Create workouts composed of multiple exercises  
- **PUT** `/workouts/:id` - Update workouts and add comments  
- **DELETE** `/workouts/:id` - Delete workouts  

## Exercise Data (Read-only catalog)
- **GET** `/exercises` - List available exercises for creating workouts  

## Workout Scheduling
- **POST** `/workouts/:id/schedule` - Schedule workouts for specific dates and times  

## Reports
- **GET** `/reports` - Generate reports on past workouts and progress  

### Test and final middleware (if I forget)
