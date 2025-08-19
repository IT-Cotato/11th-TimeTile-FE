'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { scrapApi, ScrapFolder } from '@/apis/scrapApi';

type Props = {
  postId: number | string;
  open: boolean;
  onClose: () => void;
};

const mockFolders: ScrapFolder[] = [
  { id: '1', name: '좋아요' },
  { id: '2', name: '레퍼런스' },
  { id: '3', name: '에스파' },
];

export default function ScrapModal({ postId, open, onClose }: Props) {
  const [folders, setFolders] = useState<ScrapFolder[]>([]);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (!open) return;
    (async () => {
      try {
        const res = await scrapApi.getFolders();
        const list: ScrapFolder[] =
          res.data?.data?.scrapFolders ?? res.data?.data ?? [];
        setFolders(list);
        setChecked({});
      } catch {
        // 폴백
        setFolders(mockFolders);
        setChecked({});
      }
    })();
  }, [open]);

  const toggle = (id: string) =>
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  const onSave = async () => {
    const selectedIds = folders
      .filter(f => checked[f.id])
      .map(f => Number(f.id))
      .filter(n => !Number.isNaN(n));
    try {
      await scrapApi.scrapPost(postId, selectedIds);
      onClose();
      alert('스크랩 되었습니다.');
    } catch {
      onClose();
      alert('스크랩(목업) 완료');
    }
  };

  const createFolder = async () => {
    if (!newName.trim()) return;
    try {
      const res = await scrapApi.createFolder(newName.trim());
      const created: ScrapFolder = res.data?.data ?? {
        id: String(Date.now()),
        name: newName.trim(),
      };
      setFolders(prev => [...prev, created]);
    } catch {
      setFolders(prev => [
        ...prev,
        { id: String(Date.now()), name: newName.trim() },
      ]);
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
          {folders.map(f => (
            <Row key={f.id} onClick={() => toggle(f.id)}>
              <input
                type="checkbox"
                checked={!!checked[f.id]}
                onChange={() => toggle(f.id)}
              />
              <span>{f.name}</span>
            </Row>
          ))}
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
  width: 360px;
  max-height: 70vh;
  overflow: hidden;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 16px;
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
const Row = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;
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
