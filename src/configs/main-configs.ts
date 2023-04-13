import platform from 'platform';
import { version } from '../../package.json';
import moment from 'moment';

function getDeviceLat() {
  return platform.name;
}

function getDeviceLng() {
  return platform.product;
}

function getDeviceModel() {
  return platform.description;
}

function getDeviceImei() {
  return '';
}

export function getJsonLog(): unknown {
  return {
    channel: 'WEB_REACT_CRM',
    imei: getDeviceImei(),
    key: '',
    lang: 'vi',
    lat: getDeviceLat(),
    lng: getDeviceLng(),
    model: getDeviceModel(),
    os: platform.os,
    time: moment().format('YYYYMMDDHHmmss'),
    version,
  };
}
