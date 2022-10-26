const chai = require('chai');
const sinon = require('sinon');

const expectChai = chai.expect;
global.chai = chai;
global.expecTo = expect;
global.expect = expectChai;
global.sinon = sinon;