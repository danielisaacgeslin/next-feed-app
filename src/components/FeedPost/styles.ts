import { GAP } from '@/constants';
import { css } from 'styled-components';

export const avatarSize = 30;

export const styles = {
  container: css`
    width: 100%;
    padding: ${GAP.M};
    display: flex;
    align-items: flex-start;
    gap: ${GAP.M};
    transition: background-color 0.5s;
  `,
  content: css`
    flex: 1;
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
    background-color: darkred;
  `
};
