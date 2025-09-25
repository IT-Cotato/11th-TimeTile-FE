import { theme } from "@/styles/theme";
import styled from "styled-components";
import { Text } from "../Text";

interface UserProfileProps {
  name: string;
  imageUrl: string;
  introduction: string | null;
}

export const UserProfileCard = ({
  name,
  imageUrl,
  introduction,
}: UserProfileProps) => {
  return (
    <Container>
      <Wrapper>
        <ImageDiv>
          <UserImage src={imageUrl} alt="profile" />
        </ImageDiv>
        <UserDiv>
          <UserName>
            <NameText>{name}</NameText>
          </UserName>
          <Text typo="Caption_2" color="gray_600" children={introduction} />
        </UserDiv>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 216px;
  height: 176px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1.5px solid ${theme.palette.primary_300};
  background: ${theme.palette.gray_0};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

const UserImage = styled.img`
  width: 56px;
  height: 56px;
  aspect-ratio: 1/1;
  aspect-ratio: 1/1;
  border-radius: 100px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
`;

const UserDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  align-self: stretch;
`;

const UserName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const NameText = styled.div`
  display: -webkit-box;
  width: 184px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: ${theme.palette.gray_1000};
  text-align: center;
  text-overflow: ellipsis;

  /* H4-3 */
  font-family: Pretendard-Medium;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
`;
