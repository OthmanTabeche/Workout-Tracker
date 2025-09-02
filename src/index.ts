import config from './utils/config.ts';
import app from './app.ts'

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})