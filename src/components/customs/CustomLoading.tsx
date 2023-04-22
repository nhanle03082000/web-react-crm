import { appSelector } from '@app/store/slices/appSlice';
import { connect } from 'react-redux';

const CustomLoading: React.FC = (): any => {
  return (
    <div className="loading-overlay">
      <div className="dashed-loading" />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: appSelector.loading(state),
});

export default connect(mapStateToProps, null)(CustomLoading);
