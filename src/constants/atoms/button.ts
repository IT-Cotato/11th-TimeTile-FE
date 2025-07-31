import { ButtonsShapeType } from '@/model/components/Button';
import { theme } from '@/styles/theme';

export const BUTTONS_COLOR_TYPE = {
  default: {
    addTile: `${theme.palette.primary_500}`,
    editTile: `${theme.palette.gray_50}`,
    edit: `${theme.palette.sub_100}`,
    report: `${theme.palette.warning_2}`,
    addRecord: `${theme.palette.primary_500}`,
  },
};

export const BUTTONS_TEXT_COLOR_TYPE = {
  default: {
    addTile: `${theme.palette.gray_0}`,
    editTile: `${theme.palette.gray_1000}`,
    edit: '#556822',
    report: `${theme.palette.warning}`,
    addRecord: `${theme.palette.gray_0}`,
  },
};

export const BUTTONS_SHAPE_TYPE: ButtonsShapeType = {
  addTile: {
    typo: 'Body_1',
    height: 40,
    padding: [10, 13],
    boxShadow: '0px 4px 8px 0px rgba(128, 169, 242, 0.25)',
  },
  editTile: {
    typo: 'Caption_1',
    height: 38,
    padding: [10, 13],
    boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.10)',
  },
  edit: {
    typo: 'Body_2',
    height: 40,
    padding: [8, 13],
    boxShadow: 'none',
  },
  report: {
    typo: 'Caption_1',
    height: 44,
    padding: [10, 13],
    boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.10)',
  },
  addRecord: {
    typo: 'Body_1',
    height: 40,
    padding: [10, 13],
    boxShadow: '0px 4px 8px 0px rgba(128, 169, 242, 0.25)',
  },
};
