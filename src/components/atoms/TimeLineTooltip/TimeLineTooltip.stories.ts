import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TimeLineTooltip } from './index';

const meta: Meta<typeof TimeLineTooltip> = {
  title: 'Atom/Tooltip/TimeLineTooltip',
  component: TimeLineTooltip,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: false },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof TimeLineTooltip>;

export const EditVariant: Story = {
  args: {
    variant: 'edit',
    role: 'watcher',
    mode: 'view',
  },
  parameters: {
    controls: {
      include: ['role', 'noMargin'],
      exclude: ['mode', 'variant'],
    },
  },
};

export const WatchVariant_Edit: Story = {
  args: {
    variant: 'watch',
    role: 'linker',
    mode: 'edit',
  },
  parameters: {
    controls: {
      include: ['role', 'mode', 'noMargin'],
      exclude: ['variant'],
    },
  },
};

export const WatchVariant_Waiting: Story = {
  args: {
    variant: 'watch',
    role: 'editor',
    mode: 'waiting',
  },
  parameters: {
    controls: {
      include: ['role', 'mode', 'noMargin'],
      exclude: ['variant'],
    },
  },
};

export const ClockVariant: Story = {
  args: {
    variant: 'clock',
    role: 'linker',
    mode: 'edit',
  },
  parameters: {
    controls: {
      include: ['role', 'mode', 'noMargin'],
      exclude: ['variant'],
    },
  },
};