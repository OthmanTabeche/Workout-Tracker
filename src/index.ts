import config from './utils/config.ts';
import app from './app.ts'
import seedExercises from './utils/seeder/exerciseSeeder.ts';

const startApp = async () => {
    try {
        await seedExercises();
        
        app.listen(config.PORT, () => {
            console.log(`Server running on http://localhost:${config.PORT}`);
        });
    } catch (error) {
        console.error('Error starting app:', error);
        process.exit(1);
    }
};
  
startApp();