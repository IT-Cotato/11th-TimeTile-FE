import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TimeLineTooltip } from './index';

const meta: Meta<typeof TimeLineTooltip> = {
  title: 'Atom/Tooltip/TimeLineTooltip',
  component: TimeLineTooltip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['edit', 'watch', 'clock'],
    },
    role: {
      control: 'select',
      options: ['watcher', 'linker', 'editor'],
    },
    mode: {
      control: 'select',
      options: ['view', 'edit', 'waiting'],
    },
    noMargin: {
        control: false,
    }
  },
};

export default meta;
type Story = StoryObj<typeof TimeLineTooltip>;

export const EditVariant_Watcher: Story = {
  args: {
    variant: 'edit',
    role: 'watcher',
    mode: 'view',
    noMargin: false,
  },
};

export const EditVariant_View: Story = {
  args: {
    variant: 'edit',
    role: 'linker',
    mode: 'view',
    noMargin: false,
  },
};

export const EditVariant_Waiting: Story = {
  args: {
    variant: 'edit',
    role: 'linker',
    mode: 'view',
    noMargin: false,
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