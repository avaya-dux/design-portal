import { useOsName } from './hooks'


(<any>navigator)['__defineGetter__']('userAgent', function(){
  return 'foo';
});

navigator.userAgent; // 'foo'

describe("")
