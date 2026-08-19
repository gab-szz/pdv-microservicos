import { createContainer } from 'awilix';
import { registrarDepartamento } from './departamento.container.js';

export const container = createContainer();

registrarDepartamento(container);
