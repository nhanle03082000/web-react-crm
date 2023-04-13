import React from 'react';
import { Avatar } from 'antd';
import * as S from './ProfileInfo.styles';
import man from '@app/assets/images/man.png';

interface ProfileInfoProps {
  profileData: any;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileData }) => {
  console.log(profileData);
  return profileData ? (
    <S.Wrapper>
      <S.ImgWrapper>
        <Avatar shape="circle" src={man} alt="Profile" />
      </S.ImgWrapper>
      <S.Title>{profileData?.name}</S.Title>
      {/* <S.Subtitle>{profileData?.account}</S.Subtitle> */}
    </S.Wrapper>
  ) : null;
};
