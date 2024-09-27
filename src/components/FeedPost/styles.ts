import { GAP } from '@/app/constants';
import { css } from 'styled-components';

export const avatarSize = 30;

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
  `
};
