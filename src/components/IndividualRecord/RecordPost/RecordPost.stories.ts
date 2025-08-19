import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RecordPost from './index';

const meta: Meta<typeof RecordPost> = {
  title: 'Components/RecordPost',
  component: RecordPost,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RecordPost>;

export const Default: Story = {
  args: {
    profileImage: '/record-image.png',
    username: '레드벨벳짱',
    visibility: '전체공개',
    title:
      '트리플에스트리플에스트리플에스트리플에스트리플에스트리플에스트리플에스트리플에스트리플에스트리플에스',
    content:
      '다만 MY WORLD에서는 SM엔터테인먼트 경영권 분쟁의 영향으로 그룹의 전체적인 \n콘셉트를 기획했던 이수만과 유영진이 프로듀싱에서 손을 뗀 뒤 SM을 떠난 것의 여파인지, \n그동안 선보였던 강렬하고 난해한 SMP가 아닌 멤버들의 나이대에 걸맞은 풋풋한 하이틴 콘셉트로 전환하며\n\n이미지 변신을 시도했다. SMP에 열광하는 코어 팬덤은 확보했지만 대중성은 이전의 SM 걸그룹들보다 못하다는 평가도 적지 않게 있었음을 고려하면, 일반 대중들의 진입 장벽을 낮추기 위해 이전보다 대중성을 더욱 많이 가미한 콘셉트를 시도한 것으로 보이나, \n\n이것이 일시적인 실험일지 아니면 완전한 변화일지는 더 지켜볼 일이다. 다만 광야 콘셉트를 완전히 버린 것은 아니고 \n잠깐 REAL WORLD로 돌아와 휴식을 취하는 콘셉트라고 한다. 실제로 Girls의 가사 중\n nævis on the REAL MY WORLD라는 파트가 있는 것을 봐선 하이틴 콘셉트까지는 아닐지라도 어느 정도 예정된 수순이었던 것으로 보인다.',
    images: [
      '/record-image.png',
      '/record-image.png',
      '/record-image.png',
      '/record-image.png',
      '/record-image.png',
      '/record-image.png',
    ],
    likes: 99,
    comments: 12,
  },
};
