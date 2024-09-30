import { GAP } from '@/constants';
import { css, keyframes } from 'styled-components';

export const avatarSize = 30;

const newAnimation = keyframes`
  0% { background-color: none; }
  50% { background-color: darkred; }
  100% { background-color: none; }
 `;

export const styles = {
  container: css`
    width: 100%;
    padding: ${GAP.M};
    display: flex;
    gap: ${GAP.M};
  `,
  content: css`
    flex-direction: column;
    display: flex;
    gap: ${GAP.S};
  `,
  username: css`
    height: ${avatarSize}px;
    display: flex;
    align-items: center;
  `,
  newPost: css`
    border-radius: 5px;
    animation-name: ${newAnimation};
    animation-duration: 2s;
    animation-iteration-count: 1;
  `
};
