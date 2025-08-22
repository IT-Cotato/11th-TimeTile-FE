// src/components/Scrap/ScrapModal.tsx
'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { scrapApi, ScrapFolder } from '@/apis/scrapApi';

type Props = {
  postId: number | string;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function ScrapModal({
  postId,
  open,
  onClose,
  onSuccess,
}: Props) {
  const [folders, setFolders] = useState<ScrapFolder[]>([]);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (!open) return;
    (async () => {
      try {
        // 폴더 목록
        const res = await scrapApi.getFolders();
        const list: ScrapFolder[] =
          res?.data?.data?.scrapFolders ?? res?.data?.data ?? [];
        setFolders(list);

        // 현재 게시글 스크랩 상태 → 체크 프리셋
        try {
          const st = await scrapApi.getScrapStatus(postId);
          // 서버 응답 방어적으로 파싱
          const body = st?.data?.data ?? st?.data ?? {};
          const preset: number[] =
            body?.scrapFolderIds ??
            body?.folderIds ??
            (Array.isArray(body?.scrapFolders)
              ? body.scrapFolders.map((f: any) => Number(f?.id))
              : []) ??
            [];
          const dict: Record<string, boolean> = {};
          preset.forEach((id: number) => {
            if (Number.isFinite(id)) dict[String(id)] = true;
          });
          setChecked(dict);
        } catch {
          setChecked({});
        }
      } catch {
        setFolders([]);
        setChecked({});
      }
    })();
  }, [open, postId]);

  const toggle = (id: string) =>
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  const onSave = async () => {
    const selected = folders
      .filter(f => checked[f.id])
      .map(f => Number(f.id))
      .filter(n => Number.isFinite(n));
    try {
      await scrapApi.scrapPost(postId, selected);
      alert('스크랩 되었습니다.');
      onSuccess?.();
      onClose();
    } catch (e) {
      console.warn('[scrap save failed]', e);
      onClose();
    }
  };

  const createFolder = async () => {
    const name = newName.trim();
    if (!name) return;
    try {
      const res = await scrapApi.createFolder(name);
      const created: ScrapFolder = res?.data?.data ?? {
        id: String(Date.now()),
        name,
      };
      setFolders(prev => [...prev, created]);
    } catch {
      setFolders(prev => [...prev, { id: String(Date.now()), name }]);
    } finally {
      setShowNew(false);
      setNewName('');
    }
  };

  if (!open) return null;

  return (
    <Dim onClick={onClose}>
      <Panel onClick={e => e.stopPropagation()}>
        <Header>
          <Title>스크랩 추가</Title>
          <Close onClick={onClose}>×</Close>
        </Header>

        <List>
          {folders.length === 0 && (
            <Empty>폴더가 없습니다. 먼저 폴더를 추가해 주세요.</Empty>
          )}
          {folders.map(f => {
            const isChecked = !!checked[f.id];
            return (
              <Row key={f.id} $checked={isChecked}>
                <Checkbox
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(f.id)}
                />
                <span>{f.name}</span>
              </Row>
            );
          })}
        </List>

        <Footer>
          <SubButton onClick={() => setShowNew(true)}>
            새 폴더 추가하기
          </SubButton>
          <MainButton onClick={onSave}>추가</MainButton>
        </Footer>

        {showNew && (
          <NewDim onClick={() => setShowNew(false)}>
            <NewPanel onClick={e => e.stopPropagation()}>
              <Header>
                <Title>새 폴더</Title>
                <Close onClick={() => setShowNew(false)}>×</Close>
              </Header>
              <Input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="폴더 이름을 입력해주세요."
                maxLength={20}
              />
              <Count>{newName.length} / 20</Count>
              <MainButton onClick={createFolder}>추가하기</MainButton>
            </NewPanel>
          </NewDim>
        )}
      </Panel>
    </Dim>
  );
}

/* styles */
const Dim = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
const Panel = styled.div`
  width: 400px;
  overflow: hidden;
  border-radius: 16px;
  background: #f7faff;
  box-shadow: 1px solid var(--Primary-400, #a6c6fa);
  padding: 32px;
  position: relative;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h3`
  margin: 0;
  font-weight: 700;
`;
const Close = styled.button`
  border: none;
  background: none;
  font-size: 22px;
  cursor: pointer;
`;
const List = styled.div`
  margin: 12px 0;
  padding: 8px;
  overflow: auto;
  max-height: 48vh;
  display: grid;
  gap: 10px;
`;
const Empty = styled.div`
  padding: 32px 8px;
  text-align: center;
  color: #9ca3af;
  font-size: 14px;
`;
// 기존 Row 교체
const Row = styled.label.withConfig({
  shouldForwardProp: p => p !== '$checked',
})<{ $checked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 10px;
  color: ${({ $checked }) => ($checked ? '#1f3e9a' : '#111827')};
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: ${({ $checked }) => ($checked ? '#e3edff' : '#f9fafb')};
  }

  span {
    line-height: 1.2;
  }
`;

// 새로 추가
const Checkbox = styled.input``;

const Footer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;
const MainButton = styled.button`
  background: #80a9f2;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
`;
const SubButton = styled.button`
  background: #eaf2ff;
  color: #3a5caa;
  border: none;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
`;
const NewDim = styled(Dim)``;
const NewPanel = styled(Panel)`
  width: 320px;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px 8px;
  border: 1px solid #d2d4d6;
  border-radius: 8px;
`;
const Count = styled.div`
  text-align: right;
  color: #999;
  font-size: 12px;
  margin: 6px 0 12px;
`;
