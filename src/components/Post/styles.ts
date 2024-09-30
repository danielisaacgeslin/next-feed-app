import { GAP } from '@/constants';
import { css } from 'styled-components';

export const avatarSize = 100;

export const styles = {
  container: css`
    padding: ${GAP.M};
    display: flex;
    flex-direction: column;
    gap: ${GAP.L};
    width: 100%;
    max-width: 900px;
    margin: auto;
  `,
  button: css`
    font-size: 20px;
    background: none;
    border: 0;
    text-align: left;
    cursor: pointer;
  `,
  header: css`
    display: flex;
    flex-direction: column;
    gap: ${GAP.M};
    align-items: center;
  `
};
