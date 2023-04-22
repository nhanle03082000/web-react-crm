import { ReactComponent as Delete } from '@app/assets/icons/delete.svg';

const DeleteIcon = (props: any) => {
  return <Delete {...props} title="xoá" color="red" style={{ marginTop: '3px', cursor: 'pointer' }} />;
};

export default DeleteIcon;
