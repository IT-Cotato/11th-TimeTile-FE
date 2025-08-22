'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RecordPost from '@/components/IndividualRecord/RecordPost';
import { useParams, useRouter } from 'next/navigation';
import { postApi, type PostDetailDTO } from '@/apis/postApi';

export default function IndividualRecordDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const router = useRouter();
  const [post, setPost] = useState<PostDetailDTO | null>(null);

  useEffect(() => {
    if (!postId) return;
    (async () => {
      try {
        const d = await postApi.getPostDetail(postId);
        setPost({
          authorId: Number(d.authorId),
          authorNickname: d.authorNickname ?? '닉네임 불러오는 중',
          authorProfileImageUrl:
            d.authorProfileImageUrl ?? '/profile-default.png',
          title: d.title ?? '',
          content: d.content ?? '',
          mediaUrls: Array.isArray(d.mediaUrls) ? d.mediaUrls : [],
          createdAt: d.createdAt ?? '',
          visibility: (d.visibility ?? 'PUBLIC') as 'PUBLIC' | 'PRIVATE',
          likeCount: Number(d.likeCount ?? 0),
          commentCount: Number(d.commentCount ?? 0),
          scrapCount: Number(d.scrapCount ?? 0),
        });
      } catch (e) {
        console.error('[getPostDetail error]', e);
        alert('게시글을 불러오지 못했습니다.');
      }
    })();
  }, [postId]);

  if (!post) return null;

  // 로그인 시 보관한 내 닉네임(키는 프로젝트에 맞게 교체 가능)
  const myNickname =
    typeof window !== 'undefined' ? localStorage.getItem('nickname') || '' : '';

  return (
    <PageWrapper>
      <RecordPost
        postId={Number(postId)}
        profileImage={post.authorProfileImageUrl}
        username={post.authorNickname} // 작성자 닉네임
        currentNickname={myNickname} // 내 닉네임
        visibility={post.visibility === 'PUBLIC' ? '전체공개' : '나만보기'}
        date={(post.createdAt || '').split('T')[0]}
        title={post.title}
        content={post.content}
        images={post.mediaUrls || []}
        likes={post.likeCount}
        comments={post.commentCount}
        scrapCount={post.scrapCount}
        commentsData={[]}
        onDeleteSuccess={() => router.back()}
      />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  margin: 0 auto;
  width: 952px;
  padding: 24px;
`;
