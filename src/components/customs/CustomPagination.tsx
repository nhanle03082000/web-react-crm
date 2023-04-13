import React from 'react';
import { Pagination } from 'antd';
import * as S from './Custom.styles';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<Props> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  return (
    <S.CustomPagination>
      <Pagination
        total={totalItems}
        pageSize={itemsPerPage}
        current={currentPage}
        onChange={onPageChange}
        showSizeChanger={false}
        style={{ marginTop: '16px', textAlign: 'center' }}
      />
    </S.CustomPagination>
  );
};

export default CustomPagination;
