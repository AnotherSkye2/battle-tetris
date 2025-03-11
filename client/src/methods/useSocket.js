import { useContext } from 'react';
import {SocketContext} from './createSocketContext';

export const useSocket = () => useContext(SocketContext);