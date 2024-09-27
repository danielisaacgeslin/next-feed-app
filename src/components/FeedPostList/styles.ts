import { GAP } from '@/app/constants';
import { css } from 'styled-components';

export const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    gap: ${GAP.M};
  `
};
