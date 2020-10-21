import express, { json } from 'express'
import morgan from 'morgan'
import cors from 'cors';

const app = express();

// Import routes
import projectRoutes from './routes/projects';
import taskRoutes from './routes/tasks';
import weekRoutes from './routes/weeks';
import cityRoutes from './routes/cities';
import premierRoutes from './routes/premiers';
import forecastRoutes from './routes/forecasts';
import parametrosRoutes from './routes/parameters';
import getCinemasbyCity from './routes/cinemas';
import parameterMoviesRoutes from './routes/parameterMovies';

// Middlewares
app.use(morgan('dev'));
app.use(json());
app.use(cors());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/semanas', weekRoutes);
app.use('/api/ciudades', cityRoutes);
app.use('/api/peliculas_semanas', premierRoutes);
app.use('/api/peliculas_forecast', forecastRoutes);
app.use('/api/parametros', parametrosRoutes);
app.use('/api/cines', getCinemasbyCity);
app.use('/api/peliculas_parametrizar', parameterMoviesRoutes);



export default app;