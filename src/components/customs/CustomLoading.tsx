import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CustomLoading: React.FC = () => {
  return (
    <StyledContainer>
      <div className="dashed-loading" />
    </StyledContainer>
  );
};

export default CustomLoading;
