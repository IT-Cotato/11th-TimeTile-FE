import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TimeLineTooltip } from './index';

const meta: Meta<typeof TimeLineTooltip> = {
  title: 'Atom/Tooltip/TimeLineTooltip',
  component: TimeLineTooltip,
  tags: ['autodocs'],
  argTypes: {
  icon: { control: false },
  children: { control: 'text' },
  variant: {
    control: 'radio',
    options: ['edit', 'watch', 'clock'],
  },
  role: {
    control: 'radio',
    options: ['watcher', 'linker', 'editor'],
  },
  mode: {
    control: 'radio',
    options: ['view', 'edit', 'waiting'],
  },
  noMargin: {
    control: 'boolean',
  },
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
};

export const WatchVariant_Edit: Story = {
  args: {
    variant: 'watch',
    role: 'linker',
    mode: 'edit',
  },
};

export const WatchVariant_Waiting: Story = {
  args: {
    variant: 'watch',
    role: 'editor',
    mode: 'waiting',
  },
};

export const ClockVariant: Story = {
  args: {
    variant: 'clock',
    role: 'linker',
    mode: 'edit',
  },
};