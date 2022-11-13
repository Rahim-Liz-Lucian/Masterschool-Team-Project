import { render } from 'preact';
import styled, { createGlobalStyle } from 'styled-components';
import { App } from './app';
// FIXME remove this
import './index.css';

render(<App />, document.getElementById('app') as HTMLElement);
