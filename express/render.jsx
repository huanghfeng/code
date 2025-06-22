import { renderToString } from 'react-dom/server';
import { Hello } from './hello';
import React from 'react';
export const render = () => {
    return renderToString(<Hello />);
}