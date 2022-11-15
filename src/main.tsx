import { render } from 'preact';
import styled, { createGlobalStyle } from 'styled-components';
// import { App } from './app';
import { App } from './_app';
// FIXME remove this
import './index.css';

render(<App />, document.getElementById('app') as HTMLElement);
