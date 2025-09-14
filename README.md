# Workout Tracker API - Required Endpoints

## Workout Management
- **POST** `/workouts` - Create workouts composed of multiple exercises  
- **PUT** `/workouts/:id` - Update workouts and add comments  
- **DELETE** `/workouts/:id` - Delete workouts  
- **GET** `/workouts` - List active or pending workouts sorted by date and time  

## Exercise Data (Read-only catalog)
- **GET** `/exercises` - List available exercises for creating workouts  

## Workout Scheduling
- **POST** `/workouts/:id/schedule` - Schedule workouts for specific dates and times  

## Reports
- **GET** `/reports` - Generate reports on past workouts and progress  
